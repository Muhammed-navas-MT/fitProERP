import { Check } from "lucide-react";

interface PricingCardProps {
  planName: string;
  price: number;
  duration: string;
  features: string[];
  highlighted?: boolean;
}

export function PricingCard({
  planName,
  price,
  duration,
  features,
  highlighted = false,
}: PricingCardProps) {
  return (
    <div
      className={`relative rounded-2xl p-8 transition-all duration-300 flex flex-col h-full ${
        highlighted
          ? "bg-gradient-to-b from-amber-900/40 to-amber-950/20 border-2 border-orange-500 shadow-2xl shadow-orange-500/20"
          : "bg-gray-900 border border-neutral-800 hover:border-neutral-700"
      }`}
    >
      <div className="mb-6">
        <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
          <span className="text-white font-bold text-lg">★</span>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-white mb-2">{planName}</h3>

      <p className="text-neutral-400 text-sm mb-6">{duration}</p>

      <div className="mb-8">
        <span className="text-5xl font-bold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
          ₹{price}
        </span>
      </div>

      <ul className="space-y-4 mb-8 flex-1">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <span className="text-neutral-300 text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 mt-auto ${
          highlighted
            ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-lg hover:shadow-orange-500/50"
            : "bg-neutral-800 text-neutral-100 hover:bg-neutral-700 border border-neutral-700"
        }`}
      >
        Get Started
      </button>
    </div>
  );
}
