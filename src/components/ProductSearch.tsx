'use client';

import React, { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

interface ProductSearchProps {
  onProductFound: (url: string) => void;
}

export function ProductSearch({ onProductFound }: ProductSearchProps) {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.includes('amazon.com')) {
      toast.error('Please enter a valid Amazon product URL');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/check-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch product');
      }

      onProductFound(url);
      setUrl('');
      toast.success('Product validated successfully!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to fetch product');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl">
      <div className="relative flex items-center">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste Amazon product URL here..."
          className="w-full px-4 py-3 pr-12 text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !url}
          className="absolute right-2 p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-500" />
          ) : (
            <MagnifyingGlassIcon className="w-5 h-5" />
          )}
        </button>
      </div>
    </form>
  );
} 