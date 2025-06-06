'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import ShippingForm from '@/components/ShippingForm';

// The merchant's wallet address (replace with your actual wallet address)
const MERCHANT_WALLET = new PublicKey('YOUR_WALLET_ADDRESS');

interface ShippingInfo {
  fullName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo | null>(null);
  const { publicKey, sendTransaction, connected } = useWallet();
  const { connection } = useConnection();

  if (items.length === 0) {
    router.push('/');
    return null;
  }

  const handleShippingSubmit = (info: ShippingInfo) => {
    setShippingInfo(info);
  };

  const handlePayment = async () => {
    if (!publicKey || !shippingInfo) return;

    setLoading(true);
    setError('');

    try {
      // Convert total from USD to SOL (this is a simplified conversion)
      // In a real app, you'd want to use an oracle or price feed
      const amountInSOL = parseFloat(total.replace('$', '')) * 0.1; // Example: $1 = 0.1 SOL
      const lamports = amountInSOL * LAMPORTS_PER_SOL;

      // Create transaction
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: MERCHANT_WALLET,
          lamports,
        })
      );

      // Get the latest blockhash
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      // Send transaction
      const signature = await sendTransaction(transaction, connection);
      console.log('Transaction sent:', signature);

      // Wait for confirmation
      await connection.confirmTransaction(signature);

      // Clear cart and redirect to success page
      clearCart();
      router.push('/payment/success');
    } catch (err) {
      console.error('Payment error:', err);
      setError('Failed to process payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>

      {!shippingInfo ? (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
          <ShippingForm onSubmit={handleShippingSubmit} />
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <span className="text-gray-600">Total Amount</span>
            <span className="text-2xl font-bold text-primary-600">{total}</span>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Shipping To:</h2>
            <div className="text-gray-600">
              <p>{shippingInfo.fullName}</p>
              <p>{shippingInfo.address}</p>
              <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
              <p>{shippingInfo.country}</p>
              <p>{shippingInfo.email}</p>
            </div>
          </div>

          {!connected ? (
            <div className="text-center">
              <p className="text-gray-600 mb-4">Connect your wallet to proceed with payment</p>
              <WalletMultiButton className="!bg-primary-600 hover:!bg-primary-700" />
            </div>
          ) : (
            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full py-3 px-4 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </div>
              ) : (
                'Pay with Solana'
              )}
            </button>
          )}

          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
              {error}
            </div>
          )}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        {items.map((item, index) => (
          <div key={index} className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <div className="relative w-16 h-16 mr-4">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
              </div>
            </div>
            <span className="font-medium">{item.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
} 