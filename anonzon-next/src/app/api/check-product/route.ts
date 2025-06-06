import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json(
        { success: false, error: 'Amazon product URL is required' },
        { status: 400 }
      );
    }

    if (!url.includes('amazon.com')) {
      return NextResponse.json(
        { success: false, error: 'Invalid Amazon URL' },
        { status: 400 }
      );
    }

    const apiKey = process.env.SCRAPER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: 'Scraper API key not configured' },
        { status: 500 }
      );
    }

    // Use standard ScraperAPI endpoint
    const scraperUrl = `http://api.scraperapi.com?api_key=${apiKey}&url=${encodeURIComponent(url)}`;
    const response = await fetch(scraperUrl);

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: `Failed to fetch product data: ${response.statusText}` },
        { status: response.status }
      );
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Extract product data using cheerio
    const title = $('#productTitle').text().trim();
    const priceWhole = $('.a-price-whole').first().text().trim();
    const priceFraction = $('.a-price-fraction').first().text().trim() || '00';
    const imageUrl = $('#landingImage').attr('src') || '';

    if (!title || !priceWhole) {
      return NextResponse.json(
        { success: false, error: 'Could not extract product data from page' },
        { status: 500 }
      );
    }

    const price = parseFloat(`${priceWhole.replace(/[,$]/g, '')}.${priceFraction}`);

    const product = {
      title,
      price,
      imageUrl,
      amazonUrl: url
    };

    return NextResponse.json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Product check error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Internal server error'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: 'API route is working!' });
} 