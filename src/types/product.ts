export interface Product {
  title: string;
  price: number;
  imageUrl: string;
  amazonUrl: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ScraperAPIResponse {
  title?: string;
  pricing?: {
    current_price?: number;
  };
  images?: string[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface ShippingInfo {
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface PaymentInfo {
  amount: number;
  solanaAddress: string;
  transactionId?: string;
  status: 'pending' | 'completed' | 'failed';
} 