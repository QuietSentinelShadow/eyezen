'use client';

import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_CONFIG, PlanType } from '@/lib/stripe-config';

// Load Stripe outside of component to avoid recreating on every render
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder'
);

export function useStripeCheckout() {
  const handleCheckout = async (planType: PlanType) => {
    try {
      // Get Stripe instance
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe failed to load');
      }

      // Get config for selected plan
      const config = STRIPE_CONFIG[planType];

      // Call API to create checkout session
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: config.priceId,
          mode: config.mode,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { sessionId } = await response.json();

      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({ sessionId });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Payment error. Please try again.');
    }
  };

  return { handleCheckout };
}
