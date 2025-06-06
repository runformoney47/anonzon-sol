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