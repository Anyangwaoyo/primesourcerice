export type PackageSize = '5kg' | '10kg' | '25kg' | '50kg' | 'Bulk Paddy';

export interface Product {
  id: string;
  name: string;
  size: PackageSize;
  price: number; // in NGN
  inStock: boolean;
  stockCount: number;
  description: string;
  shortDescription: string;
  grainType: string;
  brokenRatio: string;
  moistureContent: string;
  purityPercentage: string;
  origin: string;
  imageUrl: string;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus = 'pending_review' | 'confirmed' | 'out_for_delivery' | 'delivered' | 'cancelled';
export type FulfilmentMethod = 'delivery' | 'pickup';

export interface OrderItem {
  productId: string;
  name: string;
  size: PackageSize;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface Order {
  id: string;
  reference: string;
  customerName: string;
  phone: string;
  email?: string;
  fulfilmentMethod: FulfilmentMethod;
  deliveryLocation: string;
  deliveryAddress: string;
  orderNotes?: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export type BulkRequestStatus = 'reviewing' | 'quote_sent' | 'contract_signed' | 'fulfilled';

export interface BulkRequest {
  id: string;
  reference: string;
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
  status: BulkRequestStatus;
  quotedPrice?: number;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'resolved';
  createdAt: string;
}

export interface DeliveryLocation {
  id: string;
  name: string;
  state: string;
  fee: number;
  estimatedDeliveryTime: string;
  active: boolean;
}

export interface SiteSettings {
  businessName: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  processingHubAddress: string;
  domaSourcingHubAddress: string;
  abujaDeskAddress: string;
  demoMode: boolean;
  deliveryLocations: DeliveryLocation[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestions?: string[];
}
