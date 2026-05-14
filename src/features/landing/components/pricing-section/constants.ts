import { Plan } from "./types";

export const plans: Plan[] = [
  {
    name: "Essential",
    price: 28,
    features: [
      "Unlimited 1:1 virtual check-ins",
      "25% off wellness products",
      "2 guest passes/month",
      "Gift a membership at 50% off",
    ],
    featured: false,
  },
  {
    name: "Professional",
    price: 19,
    features: [
      "2 live sessions weekly",
      "Exclusive member community",
      "Free downloadable guides",
      "SSO & enhanced security",
    ],
    featured: true,
  },
  {
    name: "Premium",
    price: 29,
    features: [
      "Unlimited 1:1 virtual check-ins",
      "25% off wellness products",
      "2 guest passes/month",
      "Gift a membership at 50% off",
    ],
    featured: false,
  },
];
