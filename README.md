# AnonZon - Anonymous Amazon Shopping with Solana

Shop on Amazon anonymously using Solana for payments.

## 🚀 Features

- 🔍 Search Amazon products by URL
- 🛒 Add products to cart with quantity management
- 💰 Pay with Solana cryptocurrency
- 🔒 Anonymous shipping with no account required
- 📱 Responsive design for all devices

## 🛠 Tech Stack

- **Frontend**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Blockchain**: Solana Web3.js
- **Icons**: Heroicons
- **Notifications**: React Hot Toast
- **Data Fetching**: ScraperAPI (Amazon Data)

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/anonzon.git
cd anonzon-next
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file with the following variables:
```env
SCRAPER_API_KEY=your_scraper_api_key_here
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `SCRAPER_API_KEY` | Your ScraperAPI key for fetching Amazon product data | ✅ |
| `NEXT_PUBLIC_SOLANA_NETWORK` | Solana network to use (devnet/mainnet) | ✅ |
| `NEXT_PUBLIC_SOLANA_RPC_URL` | Solana RPC URL for the selected network | ✅ |

## 🎯 How It Works

1. **Product Search**: Paste any Amazon product URL
2. **Validation**: Our API validates and extracts product information
3. **Cart Management**: Add products to your cart with quantity controls
4. **Solana Payment**: Pay using Solana cryptocurrency
5. **Anonymous Delivery**: Products shipped without requiring personal accounts

## 🏗 Project Structure

```
anonzon-next/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/            # API routes
│   │   └── page.tsx        # Main page
│   ├── components/         # Reusable components
│   │   ├── ProductSearch.tsx
│   │   └── Cart.tsx
│   ├── store/              # Zustand stores
│   │   └── cart.ts
│   └── types/              # TypeScript types
│       └── product.ts
├── public/                 # Static assets
└── README.md
```

## 🔒 Privacy Features

- No user accounts required
- Anonymous product browsing
- Cryptocurrency payments for privacy
- No personal data storage
- Encrypted shipping information

## 🚀 Deployment

Deploy on Vercel:

```bash
npm install -g vercel
vercel
```

Don't forget to add your environment variables in the Vercel dashboard!

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This project is for educational purposes. Make sure to comply with Amazon's Terms of Service and applicable laws in your jurisdiction. 