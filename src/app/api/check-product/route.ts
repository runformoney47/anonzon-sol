import { NextResponse } from 'next/server';
import { ApiResponse, Product, ScraperAPIResponse } from '@/types/product';

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json<ApiResponse<never>>(
        { success: false, error: 'Amazon product URL is required' },
        { status: 400 }
      );
    }

    if (!url.includes('amazon.com')) {
      return NextResponse.json<ApiResponse<never>>(
        { success: false, error: 'Invalid Amazon URL' },
        { status: 400 }
      );
    }

    const apiKey = process.env.SCRAPER_API_KEY;
    if (!apiKey) {
      return NextResponse.json<ApiResponse<never>>(
        { success: false, error: 'Scraper API configuration error' },
        { status: 500 }
      );
    }

    const scraperUrl = `http://api.scraperapi.com/structured/${encodeURIComponent(url)}?api_key=${apiKey}`;
    const response = await fetch(scraperUrl);

    if (!response.ok) {
      return NextResponse.json<ApiResponse<never>>(
        { success: false, error: 'Failed to fetch product data' },
        { status: response.status }
      );
    }

    const data: ScraperAPIResponse = await response.json();
    
    if (!data.title || !data.pricing?.current_price) {
      return NextResponse.json<ApiResponse<never>>(
        { success: false, error: 'Invalid product data received' },
        { status: 500 }
      );
    }

    const product: Product = {
      title: data.title,
      price: data.pricing.current_price,
      imageUrl: data.images?.[0] || '',
      amazonUrl: url
    };

    return NextResponse.json<ApiResponse<Product>>({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Product check error:', error);
    return NextResponse.json<ApiResponse<never>>(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Internal server error'
      },
      { status: 500 }
    );
  }
} 