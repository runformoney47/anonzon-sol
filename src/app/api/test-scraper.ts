import fetch from 'node-fetch';

async function testScraper() {
  try {
    const response = await fetch('http://localhost:3000/api/check-product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: 'https://www.amazon.com/dp/B07ZPKBL9V', // Test product URL
      }),
    });

    const data = await response.json();
    console.log('Response:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

testScraper(); 