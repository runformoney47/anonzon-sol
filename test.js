const axios = require('axios');

async function testCheckProduct() {
  try {
    console.log('Testing /api/check-product endpoint...');
    const response = await axios.post('http://localhost:3001/api/check-product', {
      productUrl: 'https://www.amazon.com/dp/B08N5KWB9H'
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

testCheckProduct(); 