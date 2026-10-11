import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { store } from './server/store.ts';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Google GenAI if key is present
const apiKey = process.env.GEMINI_API_KEY;
const isGeminiConfigured = Boolean(apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey.length > 5);
const ai = isGeminiConfigured ? new GoogleGenAI({ apiKey: apiKey! }) : null;

// ==================== REST API ROUTES ====================

// GET /api/products
app.get('/api/products', (_req: Request, res: Response) => {
  const products = store.getProducts();
  res.json({ success: true, products });
});

// GET /api/products/:id
app.get('/api/products/:id', (req: Request, res: Response) => {
  const product = store.getProductById(req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, error: 'Product not found' });
  }
  res.json({ success: true, product });
});

// POST /api/products (Admin)
app.post('/api/products', (req: Request, res: Response) => {
  try {
    const newProduct = store.addProduct(req.body);
    res.status(201).json({ success: true, product: newProduct });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// PUT /api/products/:id (Admin)
app.put('/api/products/:id', (req: Request, res: Response) => {
  const updated = store.updateProduct(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ success: false, error: 'Product not found' });
  }
  res.json({ success: true, product: updated });
});

// DELETE /api/products/:id (Admin)
app.delete('/api/products/:id', (req: Request, res: Response) => {
  const deleted = store.deleteProduct(req.params.id);
  if (!deleted) {
    return res.status(404).json({ success: false, error: 'Product not found' });
  }
  res.json({ success: true, message: 'Product deleted' });
});

// GET /api/orders
app.get('/api/orders', (_req: Request, res: Response) => {
  const orders = store.getOrders();
  res.json({ success: true, orders });
});

// POST /api/orders (Customer checkout)
app.post('/api/orders', (req: Request, res: Response) => {
  try {
    const { customerName, phone, email, fulfilmentMethod, deliveryLocation, deliveryAddress, orderNotes, items } = req.body;

    if (!customerName || !phone || !items || !items.length) {
      return res.status(400).json({ success: false, error: 'Customer name, phone, and items are required.' });
    }

    if (fulfilmentMethod === 'delivery' && (!deliveryAddress || !deliveryLocation)) {
      return res.status(400).json({ success: false, error: 'Delivery address and location are required for delivery.' });
    }

    const order = store.createOrder({
      customerName,
      phone,
      email,
      fulfilmentMethod: fulfilmentMethod || 'delivery',
      deliveryLocation: deliveryLocation || 'Lafia Central (Township, GRA, Lowcost)',
      deliveryAddress: deliveryAddress || 'Factory Pickup',
      orderNotes,
      items,
    });

    res.status(201).json({ success: true, order });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /api/orders/:id/status (Admin)
app.put('/api/orders/:id/status', (req: Request, res: Response) => {
  const { status } = req.body;
  if (!status) {
    return res.status(400).json({ success: false, error: 'Status is required' });
  }
  const updated = store.updateOrderStatus(req.params.id, status);
  if (!updated) {
    return res.status(404).json({ success: false, error: 'Order not found' });
  }
  res.json({ success: true, order: updated });
});

// GET /api/bulk-requests
app.get('/api/bulk-requests', (_req: Request, res: Response) => {
  const requests = store.getBulkRequests();
  res.json({ success: true, requests });
});

// POST /api/bulk-requests (Customer bulk request)
app.post('/api/bulk-requests', (req: Request, res: Response) => {
  try {
    const { businessName, contactPerson, phone, email, businessType, preferredSize, requiredQuantity, deliveryLocation, preferredDeliveryDate, notes } = req.body;

    if (!businessName || !phone || !requiredQuantity) {
      return res.status(400).json({ success: false, error: 'Business name, phone, and required quantity are required.' });
    }

    const bulkReq = store.createBulkRequest({
      businessName,
      contactPerson: contactPerson || businessName,
      phone,
      email: email || '',
      businessType: businessType || 'Wholesaler / Retailer',
      preferredSize: preferredSize || '50kg sacks',
      requiredQuantity,
      deliveryLocation: deliveryLocation || 'To be determined',
      preferredDeliveryDate: preferredDeliveryDate || 'Flexible',
      notes,
    });

    res.status(201).json({ success: true, request: bulkReq });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /api/bulk-requests/:id (Admin quote / update)
app.put('/api/bulk-requests/:id', (req: Request, res: Response) => {
  const updated = store.updateBulkRequest(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ success: false, error: 'Bulk request not found' });
  }
  res.json({ success: true, request: updated });
});

// GET /api/inquiries
app.get('/api/inquiries', (_req: Request, res: Response) => {
  const inquiries = store.getInquiries();
  res.json({ success: true, inquiries });
});

// POST /api/inquiries (Contact form)
app.post('/api/inquiries', (req: Request, res: Response) => {
  try {
    const { name, phone, email, subject, message } = req.body;
    if (!name || !phone || !message) {
      return res.status(400).json({ success: false, error: 'Name, phone number, and message are required.' });
    }
    const inquiry = store.createInquiry({
      name,
      phone,
      email: email || '',
      subject: subject || 'General Inquiry',
      message,
    });
    res.status(201).json({ success: true, inquiry });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /api/inquiries/:id/status
app.put('/api/inquiries/:id/status', (req: Request, res: Response) => {
  const updated = store.updateInquiryStatus(req.params.id, req.body.status);
  if (!updated) {
    return res.status(404).json({ success: false, error: 'Inquiry not found' });
  }
  res.json({ success: true, inquiry: updated });
});

// GET /api/settings
app.get('/api/settings', (_req: Request, res: Response) => {
  const settings = store.getSettings();
  res.json({ success: true, settings });
});

// PUT /api/settings (Admin)
app.put('/api/settings', (req: Request, res: Response) => {
  const settings = store.updateSettings(req.body);
  res.json({ success: true, settings });
});

// POST /api/admin/login
app.post('/api/admin/login', (req: Request, res: Response) => {
  const { pin } = req.body;
  // Demo password / PIN: 'admin123' or 'primesource2026'
  if (pin === 'admin123' || pin === 'primesource2026' || pin === 'admin') {
    return res.json({
      success: true,
      token: 'admin-auth-token-demo-authorized',
      user: { name: 'PrimeSource Admin', role: 'Operations Manager' },
    });
  }
  return res.status(401).json({ success: false, error: 'Invalid admin passcode. (Hint for demo: admin123)' });
});

// POST /api/chat (PrimeSource Assistant AI Chatbot)
app.post('/api/chat', async (req: Request, res: Response) => {
  const { message, history } = req.body;
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ success: false, error: 'Message is required' });
  }

  const products = store.getProducts();
  const settings = store.getSettings();

  const productContext = products
    .map(
      (p) =>
        `- ${p.name}: Packaging Size: ${p.size}, Grain Type: ${p.grainType}, Quality: ${p.purityPercentage}, Moisture: ${p.moistureContent}, Broken Ratio: ${p.brokenRatio}. Stock Status: ${p.inStock ? 'Available' : 'Pre-order'}. Description: ${p.shortDescription}`
    )
    .join('\n');

  const deliveryContext = settings.deliveryLocations
    .filter((l) => l.active)
    .map((l) => `- ${l.name} (${l.state}): ${l.estimatedDeliveryTime}`)
    .join('\n');

  const systemInstruction = `You are "PrimeSource Assistant", the friendly, knowledgeable customer support representative for PrimeSource Rice, an agribusiness startup based in Nasarawa State, Nigeria.

ABOUT PRIMESOURCE RICE:
- Tagline: "Locally Grown. Quality Assured. Proudly Nigerian."
- What we do: We source paddy rice directly from local smallholder farmers in Nasarawa State (Assakio-Lafia, Doma, Awe, Keana), parboil it hygienically, precision de-stone it, optical color sort it, and package it into clean, premium parboiled rice.
- Quality guarantee: 100% stone-free, no chaff, no sand, high swelling volume, non-sticky cooking, perfect for Jollof, Fried Rice, and White Rice with stew.
- Primary Location: Assakio-Lafia, Nasarawa State.
- Contact: WhatsApp/Phone: ${settings.whatsapp}, Email: ${settings.email}

AVAILABLE PACKAGING SIZES & PRODUCTS:
${productContext}

DELIVERY COVERAGE:
${deliveryContext}

CRITICAL MANDATORY INSTRUCTION - STARTUP MVP PRICING POLICY:
- We are currently in the startup MVP stage of PrimeSource Rice.
- Under NO circumstance should you quote, state, estimate, or list any specific prices, Naira amounts (₦), or costs in your responses.
- The chatbot's role is EXCLUSIVELY to give explanations about the product specifications, quality, milling standards, packaging, and deliveries.
- If a customer asks about prices, costs, rates, or "how much":
  Explain politely that because PrimeSource Rice is currently in its startup MVP stage, official prices are not quoted directly in the chat assistant. Direct them to check the sample catalogue on the "Shop Rice" page, place an order request on the website, or contact our sales team directly on WhatsApp at ${settings.whatsapp} for official commercial quotes.
- Always provide helpful product explanations: explain bag sizes (5kg, 10kg, 25kg, 50kg), stone-free Sortex cleaning, grain length, swelling capacity, storage, and dispatch logistics.

RULES FOR YOUR RESPONSES:
1. Product Explanations Only: Detail the grain purity, processing, texture, cooking yield, and suitability for families, caterers, or commercial institutions.
2. Absolutely Zero Price Quotes: Do not provide numbers, fees, or Naira prices for any bag. Direct pricing queries to WhatsApp (${settings.whatsapp}) or the Shop page.
3. Tone: Warm, professional, courteous Nigerian agribusiness etiquette ("Good day", "Warm greetings").
4. Clear & Concise: 2 to 3 friendly, structured paragraphs.`;

  // Fallback answer generator if Gemini is not reachable or not configured
  const generateFallbackResponse = (query: string): string => {
    const q = query.toLowerCase();
    if (q.includes('price') || q.includes('cost') || q.includes('how much') || q.includes('amount') || q.includes('naira') || q.includes('rate') || q.includes('quote')) {
      return `Because PrimeSource Rice is currently in our startup MVP stage, prices are not quoted directly in the chat assistant. You can review the sample demonstration catalogue in our "Shop Rice" section or chat directly with our commercial desk on WhatsApp at ${settings.whatsapp} for official current pricing.\n\nOur rice is premium Nigerian long-grain parboiled rice, 100% stone-free, available in 5kg, 10kg, 25kg, and 50kg bags. Would you like details on grain specifications or packaging?`;
    }
    if (q.includes('50kg') || (q.includes('50') && q.includes('bag'))) {
      return `Our 50kg bag is the Commercial Wholesale Sack, packaged in a heavy-duty food-grade woven polypropylene sack. It contains long-grain parboiled rice that is 100% sortex-cleaned and stone-free, ideal for restaurants, caterers, schools, and bulk food re-sellers. Note that in our startup MVP stage, prices are not quoted in chat—you can place an order request or message our WhatsApp desk at ${settings.whatsapp}.`;
    }
    if (q.includes('25kg') || (q.includes('25') && q.includes('bag'))) {
      return `Our 25kg bag is our most popular size for families and catering. It is premium Nasarawa parboiled long grain, thoroughly de-stoned with a low broken ratio (<4%) and high swelling volume that cooks without clumping. Because we are in the startup MVP stage, prices are not quoted in chat; you can review our Shop page or chat with us on WhatsApp at ${settings.whatsapp}.`;
    }
    if (q.includes('10kg') || (q.includes('10') && q.includes('bag'))) {
      return `Our 10kg bag is the everyday family size, packaged in a reinforced woven bag with an easy-carry handle. It offers clean, uniform grains that cook with natural aroma and excellent texture. In our MVP stage, prices are not quoted in chat; feel free to view the Shop catalogue or reach out via WhatsApp.`;
    }
    if (q.includes('5kg') || (q.includes('5') && q.includes('bag'))) {
      return `Our 5kg pack is designed for students, small households, or sampling. It features a protective inner moisture barrier to keep the grains fresh and dry. In this MVP stage, prices are not quoted here; you can explore the Shop catalogue or contact our team on WhatsApp.`;
    }
    if (q.includes('deliver') || q.includes('abuja') || q.includes('lafia') || q.includes('location') || q.includes('where')) {
      return `We are based in Assakio-Lafia, Nasarawa State! We deliver across Lafia and neighboring Nasarawa communities (Doma, Keana, Awe, Assakio), and offer scheduled transit delivery to Abuja Metropolitan. Free self-pickup is also available at our Assakio-Lafia facility.`;
    }
    if (q.includes('bulk') || q.includes('wholesale') || q.includes('distributor') || q.includes('restaurant')) {
      return `We supply wholesale orders to supermarkets, food vendors, caterers, and institutions. Visit our "Bulk Orders" page to submit your quantity requirements and delivery date, or contact our commercial sales desk on WhatsApp at ${settings.whatsapp}.`;
    }
    if (q.includes('stone') || q.includes('clean') || q.includes('quality') || q.includes('sand')) {
      return `PrimeSource Rice is guaranteed 100% stone-free! We pass all harvested paddy through precision destoning separators and modern Sortex color sorting machines to eliminate all sand, debris, and discolored grains before packaging.`;
    }
    return `Welcome to PrimeSource Rice! We supply clean, stone-free Nigerian parboiled rice sourced from local farmers in Nasarawa State, available in 5kg, 10kg, 25kg, and 50kg bags. As we are currently in our startup MVP stage, I provide product specifications and details rather than price quotes. How can I assist you with product details or ordering today? You can also message our sales team on WhatsApp at ${settings.whatsapp}.`;
  };

  if (!ai) {
    const fallbackText = generateFallbackResponse(message);
    return res.json({
      success: true,
      text: fallbackText,
      poweredBy: 'PrimeSource Assistant (Local Knowledge Base)',
    });
  }

  try {
    const formattedHistory = Array.isArray(history)
      ? history.slice(-6).map((item: any) => ({
          role: item.sender === 'assistant' ? 'model' : 'user',
          parts: [{ text: String(item.text) }],
        }))
      : [];

    const generatePromise = ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: [
        ...formattedHistory,
        {
          role: 'user',
          parts: [{ text: message }],
        },
      ],
      config: {
        systemInstruction,
        temperature: 0.3,
      },
    });

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Gemini API call timed out')), 6000)
    );

    const response = await Promise.race([generatePromise, timeoutPromise]);

    const responseText = response.text || generateFallbackResponse(message);
    return res.json({
      success: true,
      text: responseText,
      poweredBy: 'PrimeSource Assistant (Gemini 3.8 Flash)',
    });
  } catch (err: any) {
    console.error('Gemini API call failed, switching to local fallback:', err.message);
    const fallbackText = generateFallbackResponse(message);
    return res.json({
      success: true,
      text: fallbackText,
      poweredBy: 'PrimeSource Assistant (Local Fallback)',
    });
  }
});

// ==================== VITE MIDDLEWARE / STATIC ASSETS ====================

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('dist'));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve('dist/index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`PrimeSource Rice server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
