import { Product, Order, BulkRequest, Inquiry, SiteSettings } from '../types/index.ts';

const API_BASE = '/api';

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${API_BASE}/products`);
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Failed to fetch products');
  return data.products;
}

export async function fetchProductById(id: string): Promise<Product> {
  const res = await fetch(`${API_BASE}/products/${id}`);
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Failed to fetch product');
  return data.product;
}

export async function createOrder(orderData: {
  customerName: string;
  phone: string;
  email?: string;
  fulfilmentMethod: 'delivery' | 'pickup';
  deliveryLocation: string;
  deliveryAddress: string;
  orderNotes?: string;
  items: Array<{ productId: string; quantity: number }>;
}): Promise<Order> {
  const res = await fetch(`${API_BASE}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Failed to submit order');
  return data.order;
}

export async function fetchOrders(): Promise<Order[]> {
  const res = await fetch(`${API_BASE}/orders`);
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Failed to fetch orders');
  return data.orders;
}

export async function updateOrderStatus(id: string, status: Order['status']): Promise<Order> {
  const res = await fetch(`${API_BASE}/orders/${id}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Failed to update order status');
  return data.order;
}

export async function createBulkRequest(bulkData: {
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
}): Promise<BulkRequest> {
  const res = await fetch(`${API_BASE}/bulk-requests`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bulkData),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Failed to submit bulk request');
  return data.request;
}

export async function fetchBulkRequests(): Promise<BulkRequest[]> {
  const res = await fetch(`${API_BASE}/bulk-requests`);
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Failed to fetch bulk requests');
  return data.requests;
}

export async function updateBulkRequest(
  id: string,
  updates: Partial<Pick<BulkRequest, 'status' | 'quotedPrice' | 'adminNotes'>>
): Promise<BulkRequest> {
  const res = await fetch(`${API_BASE}/bulk-requests/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Failed to update bulk request');
  return data.request;
}

export async function createInquiry(inquiryData: {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}): Promise<Inquiry> {
  const res = await fetch(`${API_BASE}/inquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inquiryData),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Failed to submit inquiry');
  return data.inquiry;
}

export async function fetchInquiries(): Promise<Inquiry[]> {
  const res = await fetch(`${API_BASE}/inquiries`);
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Failed to fetch inquiries');
  return data.inquiries;
}

export async function updateInquiryStatus(id: string, status: Inquiry['status']): Promise<Inquiry> {
  const res = await fetch(`${API_BASE}/inquiries/${id}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Failed to update inquiry status');
  return data.inquiry;
}

export async function fetchSettings(): Promise<SiteSettings> {
  const res = await fetch(`${API_BASE}/settings`);
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Failed to fetch settings');
  return data.settings;
}

export async function updateSettings(updates: Partial<SiteSettings>): Promise<SiteSettings> {
  const res = await fetch(`${API_BASE}/settings`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Failed to update settings');
  return data.settings;
}

export async function adminLogin(pin: string): Promise<{ success: boolean; token?: string; user?: any; error?: string }> {
  const res = await fetch(`${API_BASE}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pin }),
  });
  return await res.json();
}

export async function addProduct(product: Omit<Product, 'id'>): Promise<Product> {
  const res = await fetch(`${API_BASE}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Failed to add product');
  return data.product;
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
  const res = await fetch(`${API_BASE}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Failed to update product');
  return data.product;
}

export async function deleteProduct(id: string): Promise<boolean> {
  const res = await fetch(`${API_BASE}/products/${id}`, {
    method: 'DELETE',
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Failed to delete product');
  return true;
}

export async function sendChatMessage(
  message: string,
  history: Array<{ sender: 'user' | 'assistant'; text: string }>
): Promise<{ text: string; poweredBy?: string }> {
  const res = await fetch(`${API_BASE}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history }),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Chat request failed');
  return { text: data.text, poweredBy: data.poweredBy };
}
