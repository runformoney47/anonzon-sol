const express = require('express');
const router = express.Router();
const scrapeService = require('../services/scrapeService');
const helioService = require('../services/helioService');
const emailService = require('../services/emailService');
const geoip = require('geoip-lite');

// Check product endpoint
router.post('/check-product', async (req, res) => {
  console.log('\n=== CHECK PRODUCT DEBUG ===');
  console.log('Request received at /check-product');
  console.log('Request body:', req.body);
  try {
    const { productUrl } = req.body;
    console.log('Product URL:', productUrl);
    
    if (!productUrl) {
      console.log('Error: No product URL provided');
      return res.status(400).json({
        success: false,
        message: 'Product URL is required'
      });
    }

    // Scrape product information
    console.log('Attempting to scrape product...');
    const productInfo = await scrapeService.scrapeProduct(productUrl);
    console.log('Scrape result:', productInfo);
    
    res.json({
      success: true,
      data: productInfo
    });
  } catch (error) {
    console.error('Product check error:', error);
    console.error('Stack trace:', error.stack);
    res.status(500).json({
      success: false,
      message: 'Failed to check product',
      error: error.message
    });
  }
  console.log('===================\n');
});

// Create order endpoint
router.post('/order', async (req, res) => {
  console.log('\n=== ORDER ENDPOINT DEBUG ===');
  console.log('Request received at /order');
  console.log('Request body:', req.body);
  try {
    const { productData, shippingData, pricing } = req.body;
    console.log('Extracted data:', { productData, shippingData, pricing });
    
    if (!productData || !shippingData || !pricing) {
      console.log('Error: Missing required data');
      return res.status(400).json({
        success: false,
        message: 'Missing required data'
      });
    }

    // Get client's IP and determine shipping origin
    const clientIp = req.ip || req.connection.remoteAddress;
    console.log('Client IP:', clientIp);
    const geo = geoip.lookup(clientIp);
    console.log('GeoIP result:', geo);
    const shippingOrigin = geo ? geo.country : 'US';
    console.log('Shipping origin:', shippingOrigin);

    // Convert to SOL using Binance
    console.log('Converting price to SOL:', pricing.totalPrice);
    const solAmount = await helioService.convertToSOL(pricing.totalPrice);
    console.log('Converted SOL amount:', solAmount);

    // Create Helio payment link
    console.log('Creating payment link...');
    const paymentLink = await helioService.createPaymentLink({
      amount: solAmount,
      currency: 'SOL',
      metadata: {
        productData,
        shippingData,
        pricing,
        shippingOrigin
      }
    });
    console.log('Payment link created:', paymentLink);

    // Save order to database/file
    const order = {
      id: Date.now().toString(),
      status: 'pending',
      productData,
      shippingData,
      pricing: {
        ...pricing,
        solAmount
      },
      paymentLink,
      shippingOrigin,
      createdAt: new Date()
    };

    console.log('Order created:', order);

    res.json({
      success: true,
      data: {
        paymentLink,
        solAmount
      }
    });
  } catch (error) {
    console.error('Order creation error:', error);
    console.error('Stack trace:', error.stack);
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error.message
    });
  }
  console.log('===================\n');
});

module.exports = router; 