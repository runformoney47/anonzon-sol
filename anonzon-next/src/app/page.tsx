'use client';

import React from 'react';
import { ProductSearch } from '@/components/ProductSearch';
import { Cart } from '@/components/Cart';
import { useCartStore } from '@/store/cart';

export default function Home() {
  const { addItem } = useCartStore();

  const handleProductFound = (product: any) => {
    addItem(product);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">🛒 Shop Amazon</span>
            <span className="block text-blue-600">💰 Pay with Solana</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Shop anonymously on Amazon using Solana for payments. Just paste the product URL below to get started.
          </p>
        </div>

        <div className="mt-10 flex justify-center">
          <ProductSearch onProductFound={handleProductFound} />
        </div>

        <div className="mt-12 max-w-4xl mx-auto">
          <Cart />
        </div>

        <div className="mt-16 text-center text-sm text-gray-500">
          <p>
            Made with ❤️ for anonymous shopping. Your privacy is our priority.
          </p>
        </div>
      </div>
    </main>
  );
}
