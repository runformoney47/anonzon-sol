'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Clear any sensitive data from localStorage if needed
    localStorage.removeItem('shippingInfo');
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Payment Successful!
        </h1>
        <p className="mt-4 text-base leading-7 text-gray-600">
          Thank you for your purchase. Your payment has been processed successfully.
        </p>
        <p className="mt-2 text-sm text-gray-500">
          This is a demo app - no actual products will be shipped.
        </p>
        <div className="mt-10">
          <Link
            href="/"
            className="inline-flex items-center rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
} 