const axios = require('axios');

class HelioService {
  constructor() {
    this.apiKey = process.env.HELIO_API_KEY;
    this.baseUrl = 'https://api.helio.xyz'; // Replace with actual Helio API endpoint
  }

  async convertToSOL(fiatAmount) {
    console.log('\n=== HELIO SERVICE DEBUG ===');
    console.log('Converting fiat amount:', fiatAmount);
    try {
      // Mock SOL price for testing
      const solPrice = 100; // Assume 1 SOL = $100 USD
      console.log('Using mock SOL price:', solPrice);
      
      // Convert fiat amount to SOL
      const solAmount = fiatAmount / solPrice;
      console.log('Converted amount:', solAmount, 'SOL');
      return solAmount;
    } catch (error) {
      console.error('SOL conversion error:', {
        message: error.message,
        response: error.response ? {
          status: error.response.status,
          data: error.response.data
        } : 'No response'
      });
      throw new Error('Failed to convert price to SOL');
    }
    console.log('===================\n');
  }

  async createPaymentLink({ amount, currency, metadata }) {
    try {
      // For testing purposes, return a mock payment link
      console.log('Creating mock payment link with:', { amount, currency, metadata });
      return `https://helio.xyz/pay/test-${Date.now()}`;
      
      // Uncomment this when you have a real Helio API key
      /*
      const response = await axios.post(
        `${this.baseUrl}/payment-links`,
        {
          amount,
          currency,
          metadata
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data.paymentLink;
      */
    } catch (error) {
      console.error('Payment link creation error:', error);
      throw new Error('Failed to create payment link');
    }
  }

  async verifyWebhookSignature(req) {
    // For testing, always return true
    return true;
  }
}

module.exports = new HelioService(); 