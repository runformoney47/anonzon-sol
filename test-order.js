const axios = require('axios');

async function testOrder() {
  try {
    console.log('Testing /api/order endpoint...');
    const response = await axios.post('http://localhost:3001/api/order', {
      productData: {
        title: "Test Product",
        price: 99.99,
        currency: "USD"
      },
      shippingData: {
        name: "Test User",
        address: "123 Test St",
        city: "Test City",
        state: "TS",
        zip: "12345",
        country: "US"
      },
      pricing: {
        totalPrice: 99.99,
        currency: "USD"
      }
    });
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error:', {
      message: error.message,
      response: error.response ? {
        status: error.response.status,
        data: error.response.data
      } : 'No response'
    });
  }
}

testOrder(); 