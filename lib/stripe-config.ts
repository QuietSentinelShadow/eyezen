// Stripe Configuration for EyeZen

export const STRIPE_CONFIG = {
  // Monthly subscription ($4.99/month)
  monthly: {
    priceId: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID || 'price_monthly_placeholder',
    mode: 'subscription' as const,
    name: 'Premium Monthly',
    price: '$4.99/month',
  },

  // Lifetime payment ($29.99 one-time)
  lifetime: {
    priceId: process.env.NEXT_PUBLIC_STRIPE_LIFETIME_PRICE_ID || 'price_lifetime_placeholder',
    mode: 'payment' as const,
    name: 'Premium Lifetime',
    price: '$29.99 one-time',
  },
};

// How to set up:
// 1. Create Stripe account at stripe.com
// 2. Create products in Stripe Dashboard:
//    - Premium Monthly: $4.99/month subscription
//    - Premium Lifetime: $29.99 one-time payment
// 3. Copy price IDs from Stripe Dashboard
// 4. Add to .env.local:
//    STRIPE_SECRET_KEY=sk_test_...
//    NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID=price_...
//    NEXT_PUBLIC_STRIPE_LIFETIME_PRICE_ID=price_...
//    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

export type PlanType = keyof typeof STRIPE_CONFIG;
