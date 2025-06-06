'use client';

import React from 'react';
import { useCartStore } from '@/store/cart';
import { TrashIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

export function Cart() {
  const { items, removeItem, updateQuantity, total } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900">Your cart is empty</h2>
        <p className="mt-2 text-gray-500">Add some products to get started</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 space-y-6">
        {items.map((item) => (
          <div key={item.amazonUrl} className="flex items-center space-x-4">
            <div className="relative w-24 h-24 flex-shrink-0">
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-contain"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center rounded">
                  <span className="text-gray-400 text-xs">No Image</span>
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-gray-900 truncate">
                {item.title}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                ${item.price.toFixed(2)}
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => updateQuantity(item.amazonUrl, item.quantity - 1)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <MinusIcon className="h-5 w-5 text-gray-600" />
              </button>
              <span className="text-gray-900 font-medium min-w-[2rem] text-center">
                {item.quantity}
              </span>
              <button
                onClick={() => updateQuantity(item.amazonUrl, item.quantity + 1)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <PlusIcon className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            <button
              onClick={() => removeItem(item.amazonUrl)}
              className="p-1 rounded-full text-red-600 hover:bg-red-50"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 p-6">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Total</p>
          <p>${total().toFixed(2)}</p>
        </div>
        <div className="mt-6">
          <button
            className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
} 