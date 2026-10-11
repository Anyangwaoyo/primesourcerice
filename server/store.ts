import fs from 'fs';
import path from 'path';
import { Product, Order, BulkRequest, Inquiry, SiteSettings } from '../src/types/index.ts';

const DATA_DIR = path.resolve(process.cwd(), 'server', 'data');
const DATA_FILE = path.join(DATA_DIR, 'store.json');

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'psr-5kg',
    name: 'PrimeSource Premium Parboiled Rice – 5kg',
    size: '5kg',
    price: 7500,
    inStock: true,
    stockCount: 140,
    shortDescription: 'Convenient student and small household pack with hermetic inner seal.',
    description: 'Freshly harvested paddy from Nasarawa outgrowers, parboiled to preserve essential thiamine and minerals, de-stoned using modern destoning technology, and polished to perfection. Ideal for quick household cooking, jollof rice, and fried rice.',
    grainType: 'Long Grain Parboiled (Faro 44 / Jasmine hybrid)',
    brokenRatio: '< 4%',
    moistureContent: '12.8% (optimal for prolonged storage)',
    purityPercentage: '99.8% stone-free sortex cleaned',
    origin: 'Nasarawa State, Nigeria (Doma & Awe harvest zones)',
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=80',
    featured: true,
  },
  {
    id: 'psr-10kg',
    name: 'PrimeSource Premium Parboiled Rice – 10kg',
    size: '10kg',
    price: 14800,
    inStock: true,
    stockCount: 95,
    shortDescription: 'Everyday family size bag with reinforced woven carry handle.',
    description: 'Our most economical mid-tier pack. Thoroughly destoned, clean, uniform grains that cook without sticking. High swelling yield gives you more cooked portions per cup compared to standard market varieties.',
    grainType: 'Long Grain Parboiled',
    brokenRatio: '< 4%',
    moistureContent: '13.0%',
    purityPercentage: '99.8% stone-free sortex cleaned',
    origin: 'Nasarawa State, Nigeria',
    imageUrl: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=900&q=80',
    featured: true,
  },
  {
    id: 'psr-25kg',
    name: 'PrimeSource Premium Parboiled Rice – 25kg',
    size: '25kg',
    price: 36500,
    inStock: true,
    stockCount: 65,
    shortDescription: 'The household favorite and catering standard. Long lasting fresh aroma.',
    description: 'Crafted for larger households, event caterers, and food service businesses. Sourced from high-yielding paddy harvested in Assakio and Lafia riverine plains. Guaranteed free of sand, chaff, and dark grains through optical sorting.',
    grainType: 'Premium Long Grain Parboiled',
    brokenRatio: '< 3.5%',
    moistureContent: '12.5%',
    purityPercentage: '99.9% stone-free sortex cleaned',
    origin: 'Nasarawa State, Nigeria',
    imageUrl: 'https://images.unsplash.com/photo-1568283096533-eed7e3f1a261?auto=format&fit=crop&w=900&q=80',
    featured: true,
  },
  {
    id: 'psr-50kg',
    name: 'PrimeSource Commercial Wholesale Rice – 50kg',
    size: '50kg',
    price: 72000,
    inStock: true,
    stockCount: 80,
    shortDescription: 'Full commercial sack for wholesalers, restaurants, hotels, and bulk food programs.',
    description: 'Heavy-duty 50kg commercial food-grade woven polypropylene sack with UV coating. Standard grade for bulk distribution, institutional cafeterias, supermarkets, and grain re-distributors. Bulk purchase discounts apply for orders of 20 bags and above.',
    grainType: 'Premium Long Grain Parboiled',
    brokenRatio: '< 5%',
    moistureContent: '13.2%',
    purityPercentage: '99.8% stone-free sortex cleaned',
    origin: 'Nasarawa State, Nigeria',
    imageUrl: 'https://images.unsplash.com/photo-1594489428504-5c0c480a15fd?auto=format&fit=crop&w=900&q=80',
    featured: true,
  },
];

const INITIAL_SETTINGS: SiteSettings = {
  businessName: 'PrimeSource Rice',
  tagline: 'Locally Grown. Quality Assured. Proudly Nigerian.',
  phone: '07030881613',
  whatsapp: '07030881613',
  email: 'oyomattany@gmail.com',
  processingHubAddress: 'Assakio-Lafia, Nasarawa State',
  domaSourcingHubAddress: 'Doma Agrarian Depot & Farmers Sourcing Station, Doma LGA, Nasarawa State',
  abujaDeskAddress: 'Distribution Liason Office, Central Business District, Abuja FCT',
  demoMode: true,
  deliveryLocations: [
    { id: 'loc-1', name: 'Lafia Central (Township, GRA, Lowcost)', state: 'Nasarawa', fee: 1000, estimatedDeliveryTime: 'Same day (2-4 hours)', active: true },
    { id: 'loc-2', name: 'Doma Community & Environs', state: 'Nasarawa', fee: 1500, estimatedDeliveryTime: 'Next day delivery', active: true },
    { id: 'loc-3', name: 'Awe & Keana Environs', state: 'Nasarawa', fee: 2000, estimatedDeliveryTime: '1-2 business days', active: true },
    { id: 'loc-4', name: 'Ashagwa & Assakio Communities', state: 'Nasarawa', fee: 1500, estimatedDeliveryTime: 'Next day delivery', active: true },
    { id: 'loc-5', name: 'Abuja Metropolitan (Garki, Wuse, Maitama, Jabi)', state: 'Abuja FCT', fee: 4500, estimatedDeliveryTime: '24-48 hours transit', active: true },
    { id: 'loc-pickup', name: 'Warehouse Self-Pickup (Assakio-Lafia Mill Center)', state: 'Nasarawa', fee: 0, estimatedDeliveryTime: 'Immediate during working hours', active: true },
  ],
};

const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-demo-1',
    reference: 'PSR-2026-1042',
    customerName: 'Amina Al-Hassan',
    phone: '08023456781',
    email: 'amina.hassan@example.com',
    fulfilmentMethod: 'delivery',
    deliveryLocation: 'Lafia Central (Township, GRA, Lowcost)',
    deliveryAddress: 'House 18, Shendam Road, Near Government College, Lafia',
    orderNotes: 'Please call before dispatch, dispatch rider should bring receipt.',
    items: [
      {
        productId: 'psr-25kg',
        name: 'PrimeSource Premium Parboiled Rice – 25kg',
        size: '25kg',
        price: 36500,
        quantity: 1,
        subtotal: 36500,
      },
      {
        productId: 'psr-5kg',
        name: 'PrimeSource Premium Parboiled Rice – 5kg',
        size: '5kg',
        price: 7500,
        quantity: 2,
        subtotal: 15000,
      },
    ],
    subtotal: 51500,
    deliveryFee: 1000,
    total: 52500,
    status: 'confirmed',
    createdAt: new Date(Date.now() - 3600 * 1000 * 6).toISOString(),
    updatedAt: new Date(Date.now() - 3600 * 1000 * 4).toISOString(),
  },
  {
    id: 'ord-demo-2',
    reference: 'PSR-2026-1043',
    customerName: 'Pastor Emmanuel Ochoche',
    phone: '08139876543',
    email: 'emmanuel.o@example.com',
    fulfilmentMethod: 'delivery',
    deliveryLocation: 'Abuja Metropolitan (Garki, Wuse, Maitama, Jabi)',
    deliveryAddress: 'Block C, Flat 4, Area 11, Garki, Abuja',
    orderNotes: 'For family weekend celebration. Please ensure stone-free quality as advertised.',
    items: [
      {
        productId: 'psr-50kg',
        name: 'PrimeSource Commercial Wholesale Rice – 50kg',
        size: '50kg',
        price: 72000,
        quantity: 1,
        subtotal: 72000,
      },
    ],
    subtotal: 72000,
    deliveryFee: 4500,
    total: 76500,
    status: 'pending_review',
    createdAt: new Date(Date.now() - 3600 * 1000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 3600 * 1000 * 2).toISOString(),
  },
];

const INITIAL_BULK_REQUESTS: BulkRequest[] = [
  {
    id: 'bulk-demo-1',
    reference: 'PSR-BULK-301',
    businessName: 'Savannah Fresh Foods Ltd (Supermarket Chain)',
    contactPerson: 'Mr. Jude Chukwuma',
    phone: '08035551234',
    email: 'purchasing@savannahfresh.ng',
    businessType: 'Supermarket Chain',
    preferredSize: '25kg and 10kg assorted',
    requiredQuantity: '150 bags monthly contract',
    deliveryLocation: 'Wuse 2, Abuja',
    preferredDeliveryDate: '2026-10-25',
    notes: 'Looking for a consistent supply partner for our 3 supermarket branches in Abuja and Keffi. Need sample bags first.',
    status: 'quote_sent',
    quotedPrice: 35000,
    adminNotes: 'Sample 5kg delivered to procurement team. Awaiting contract approval.',
    createdAt: new Date(Date.now() - 3600 * 1000 * 24).toISOString(),
    updatedAt: new Date(Date.now() - 3600 * 1000 * 12).toISOString(),
  },
  {
    id: 'bulk-demo-2',
    reference: 'PSR-BULK-302',
    businessName: 'Keffi Road Royale Caterers',
    contactPerson: 'Mrs. Fatima Bako',
    phone: '08064448899',
    email: 'info@royalcaterers.ng',
    businessType: 'Restaurant / Catering Service',
    preferredSize: '50kg sacks',
    requiredQuantity: '30 bags',
    deliveryLocation: 'Lafia, Nasarawa State',
    preferredDeliveryDate: '2026-10-20',
    notes: 'Wedding ceremony catering contract on October 24. Require clean long grain that does not clump.',
    status: 'reviewing',
    createdAt: new Date(Date.now() - 3600 * 1000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 3600 * 1000 * 5).toISOString(),
  },
];

const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: 'inq-demo-1',
    name: 'Malam Ibrahim Giza',
    phone: '08071112233',
    email: 'ibrahim.giza@farmergroup.org',
    subject: 'Paddy Rice Outgrower Partnership in Keana',
    message: 'We are a cooperative of 40 rice farmers in Keana LGA harvesting Faro 44 paddy this month. We want to supply directly to PrimeSource Rice milling plant. Kindly share your farmgate purchase terms.',
    status: 'read',
    createdAt: new Date(Date.now() - 3600 * 1000 * 18).toISOString(),
  },
];

interface StoreData {
  products: Product[];
  orders: Order[];
  bulkRequests: BulkRequest[];
  inquiries: Inquiry[];
  settings: SiteSettings;
}

class Store {
  private data: StoreData;

  constructor() {
    this.data = this.loadData();
  }

  private loadData(): StoreData {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      if (fs.existsSync(DATA_FILE)) {
        const fileContent = fs.readFileSync(DATA_FILE, 'utf-8');
        const parsed = JSON.parse(fileContent);
        return {
          products: parsed.products?.length ? parsed.products : INITIAL_PRODUCTS,
          orders: parsed.orders || INITIAL_ORDERS,
          bulkRequests: parsed.bulkRequests || INITIAL_BULK_REQUESTS,
          inquiries: parsed.inquiries || INITIAL_INQUIRIES,
          settings: parsed.settings || INITIAL_SETTINGS,
        };
      }
    } catch (err) {
      console.warn('Could not read persistent store from disk, initializing in-memory fallback:', err);
    }

    const defaultData: StoreData = {
      products: INITIAL_PRODUCTS,
      orders: INITIAL_ORDERS,
      bulkRequests: INITIAL_BULK_REQUESTS,
      inquiries: INITIAL_INQUIRIES,
      settings: INITIAL_SETTINGS,
    };
    this.saveData(defaultData);
    return defaultData;
  }

  private saveData(data: StoreData) {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.warn('Could not write store to disk:', err);
    }
  }

  // PRODUCTS
  getProducts(): Product[] {
    return this.data.products;
  }

  getProductById(id: string): Product | undefined {
    return this.data.products.find((p) => p.id === id);
  }

  addProduct(product: Omit<Product, 'id'>): Product {
    const newProduct: Product = {
      ...product,
      id: `psr-${Date.now()}`,
    };
    this.data.products.push(newProduct);
    this.saveData(this.data);
    return newProduct;
  }

  updateProduct(id: string, updates: Partial<Product>): Product | null {
    const index = this.data.products.findIndex((p) => p.id === id);
    if (index === -1) return null;
    this.data.products[index] = { ...this.data.products[index], ...updates };
    this.saveData(this.data);
    return this.data.products[index];
  }

  deleteProduct(id: string): boolean {
    const prevLen = this.data.products.length;
    this.data.products = this.data.products.filter((p) => p.id !== id);
    if (this.data.products.length !== prevLen) {
      this.saveData(this.data);
      return true;
    }
    return false;
  }

  // ORDERS
  getOrders(): Order[] {
    return [...this.data.orders].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  getOrderById(id: string): Order | undefined {
    return this.data.orders.find((o) => o.id === id || o.reference === id);
  }

  createOrder(orderData: {
    customerName: string;
    phone: string;
    email?: string;
    fulfilmentMethod: 'delivery' | 'pickup';
    deliveryLocation: string;
    deliveryAddress: string;
    orderNotes?: string;
    items: Array<{ productId: string; quantity: number }>;
  }): Order {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const reference = `PSR-${new Date().getFullYear()}-${randomDigits}`;

    // Calculate items and subtotal server-side to prevent tampering
    let subtotal = 0;
    const validatedItems: Order['items'] = [];

    for (const reqItem of orderData.items) {
      const product = this.getProductById(reqItem.productId);
      if (product) {
        const itemSubtotal = product.price * Math.max(1, reqItem.quantity);
        subtotal += itemSubtotal;
        validatedItems.push({
          productId: product.id,
          name: product.name,
          size: product.size,
          price: product.price,
          quantity: reqItem.quantity,
          subtotal: itemSubtotal,
        });

        // Update product stock count if in stock
        if (product.stockCount > 0) {
          product.stockCount = Math.max(0, product.stockCount - reqItem.quantity);
        }
      }
    }

    // Determine delivery fee
    let deliveryFee = 0;
    if (orderData.fulfilmentMethod === 'delivery') {
      const loc = this.data.settings.deliveryLocations.find(
        (l) => l.name.toLowerCase() === orderData.deliveryLocation.toLowerCase()
      );
      deliveryFee = loc ? loc.fee : 1500;
    }

    const total = subtotal + deliveryFee;
    const now = new Date().toISOString();

    const order: Order = {
      id: `ord-${Date.now()}`,
      reference,
      customerName: orderData.customerName,
      phone: orderData.phone,
      email: orderData.email,
      fulfilmentMethod: orderData.fulfilmentMethod,
      deliveryLocation: orderData.deliveryLocation,
      deliveryAddress: orderData.deliveryAddress,
      orderNotes: orderData.orderNotes,
      items: validatedItems,
      subtotal,
      deliveryFee,
      total,
      status: 'pending_review',
      createdAt: now,
      updatedAt: now,
    };

    this.data.orders.push(order);
    this.saveData(this.data);
    return order;
  }

  updateOrderStatus(id: string, status: Order['status']): Order | null {
    const order = this.data.orders.find((o) => o.id === id || o.reference === id);
    if (!order) return null;
    order.status = status;
    order.updatedAt = new Date().toISOString();
    this.saveData(this.data);
    return order;
  }

  // BULK REQUESTS
  getBulkRequests(): BulkRequest[] {
    return [...this.data.bulkRequests].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  createBulkRequest(bulkData: {
    businessName: string;
    contactPerson: string;
    phone: string;
    email: string;
    businessType: string;
    preferredSize: string;
    requiredQuantity: string;
    deliveryLocation: string;
    preferredDeliveryDate: string;
    notes?: string;
  }): BulkRequest {
    const randomDigits = Math.floor(100 + Math.random() * 900);
    const reference = `PSR-BULK-${randomDigits}`;
    const now = new Date().toISOString();

    const request: BulkRequest = {
      id: `bulk-${Date.now()}`,
      reference,
      ...bulkData,
      status: 'reviewing',
      createdAt: now,
      updatedAt: now,
    };

    this.data.bulkRequests.push(request);
    this.saveData(this.data);
    return request;
  }

  updateBulkRequest(
    id: string,
    updates: Partial<Pick<BulkRequest, 'status' | 'quotedPrice' | 'adminNotes'>>
  ): BulkRequest | null {
    const req = this.data.bulkRequests.find((r) => r.id === id || r.reference === id);
    if (!req) return null;
    if (updates.status) req.status = updates.status;
    if (updates.quotedPrice !== undefined) req.quotedPrice = updates.quotedPrice;
    if (updates.adminNotes !== undefined) req.adminNotes = updates.adminNotes;
    req.updatedAt = new Date().toISOString();
    this.saveData(this.data);
    return req;
  }

  // INQUIRIES
  getInquiries(): Inquiry[] {
    return [...this.data.inquiries].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  createInquiry(inquiryData: {
    name: string;
    phone: string;
    email: string;
    subject: string;
    message: string;
  }): Inquiry {
    const inquiry: Inquiry = {
      id: `inq-${Date.now()}`,
      ...inquiryData,
      status: 'unread',
      createdAt: new Date().toISOString(),
    };
    this.data.inquiries.push(inquiry);
    this.saveData(this.data);
    return inquiry;
  }

  updateInquiryStatus(id: string, status: Inquiry['status']): Inquiry | null {
    const inq = this.data.inquiries.find((i) => i.id === id);
    if (!inq) return null;
    inq.status = status;
    this.saveData(this.data);
    return inq;
  }

  // SETTINGS
  getSettings(): SiteSettings {
    return this.data.settings;
  }

  updateSettings(updates: Partial<SiteSettings>): SiteSettings {
    this.data.settings = { ...this.data.settings, ...updates };
    this.saveData(this.data);
    return this.data.settings;
  }
}

export const store = new Store();
