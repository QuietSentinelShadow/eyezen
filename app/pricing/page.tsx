'use client';

import Link from 'next/link';
import { Check, X } from 'lucide-react';
import { useStripeCheckout } from '@/hooks/useStripeCheckout';

export default function PricingPage() {
  const { handleCheckout } = useStripeCheckout();

  const features = [
    { name: '3 Basic exercises', free: true, premium: true },
    { name: '10 Premium exercises', free: false, premium: true },
    { name: 'Break reminders (20 min only)', free: true, premium: true },
    { name: 'Custom break intervals', free: false, premium: true },
    { name: 'Custom routines', free: false, premium: true },
    { name: 'Progress tracking', free: false, premium: true },
    { name: 'Soundscapes', free: false, premium: true },
    { name: 'Priority support', free: false, premium: true },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="container mx-auto px-6 py-10">
        <Link href="/" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          ← Back to home
        </Link>
      </div>

      {/* Pricing Section */}
      <div className="container mx-auto px-6 py-10">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600">
            Start free, upgrade when you're ready
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Tier */}
          <div className="bg-white rounded-3xl p-8 border-2 border-gray-200">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Free</h2>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-bold">$0</span>
                <span className="text-gray-500">/forever</span>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              {features.map((feature) => (
                <li key={feature.name} className="flex items-start gap-3">
                  {feature.free ? (
                    <Check className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
                  ) : (
                    <X className="text-gray-300 flex-shrink-0 mt-0.5" size={20} />
                  )}
                  <span className={feature.free ? 'text-gray-900' : 'text-gray-400'}>
                    {feature.name}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href="/app"
              className="block w-full py-3 text-center bg-gray-100 text-gray-900 font-semibold rounded-xl hover:bg-gray-200 transition-all"
            >
              Get Started Free
            </Link>
          </div>

          {/* Premium Tier */}
          <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-bl-lg">
              BEST VALUE
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Premium</h2>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-bold">$4.99</span>
                <span className="opacity-90">/month</span>
              </div>
              <p className="text-sm opacity-80 mt-1">or $29.99 lifetime (save 50%)</p>
            </div>

            <ul className="space-y-3 mb-8">
              {features.map((feature) => (
                <li key={feature.name} className="flex items-start gap-3">
                  <Check className="flex-shrink-0 mt-0.5" size={20} />
                  <span>{feature.name}</span>
                </li>
              ))}
            </ul>

            <button
              className="w-full py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-all"
              onClick={() => handleCheckout('monthly')}
            >
              Upgrade to Premium
            </button>

            <p className="text-xs text-center mt-4 opacity-75">
              30-day money-back guarantee • Cancel anytime
            </p>
          </div>
        </div>

        {/* Lifetime Deal */}
        <div className="mt-8 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border-2 border-yellow-200 text-center">
            <h3 className="font-bold text-lg mb-2">💡 Want to save 50%?</h3>
            <p className="text-sm text-gray-700 mb-4">
              Get lifetime access for just <span className="font-bold">$29.99</span> (one-time payment)
            </p>
            <button
              onClick={() => handleCheckout('lifetime')}
              className="px-6 py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition-all"
            >
              Get Lifetime Deal
            </button>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-10">Frequently Asked Questions</h3>

          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-2">Can I use EyeZen for free?</h4>
              <p className="text-gray-600">
                Yes! The free tier includes 3 basic exercises with 20-minute break reminders. No credit card required.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">What's included in Premium?</h4>
              <p className="text-gray-600">
                Premium unlocks all 10 exercises, custom break intervals, progress tracking, custom routines, and ambient soundscapes.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Can I cancel anytime?</h4>
              <p className="text-gray-600">
                Absolutely. Cancel your subscription anytime, no questions asked. You'll keep access until the end of your billing period.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Is there a lifetime option?</h4>
              <p className="text-gray-600">
                Yes! Pay $29.99 once and get Premium access forever. That's a 50% savings compared to monthly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
