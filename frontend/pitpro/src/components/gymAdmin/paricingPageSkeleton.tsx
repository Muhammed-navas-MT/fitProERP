import { PricingCardSkeleton } from "./pricingCardSckeleton";

export function PricingPageSkeleton() {
  return (
    <section className="min-h-screen bg-neutral-950 px-4 md:px-6 lg:px-8 py-8 md:py-12 animate-pulse">
      
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-6 md:mb-8 text-center space-y-3">
          <div className="mx-auto h-7 w-48 rounded bg-neutral-800 md:h-8 lg:h-9" />
          <div className="mx-auto h-7 w-64 rounded bg-neutral-800 md:h-8 lg:h-9" />
          <div className="mx-auto h-4 w-80 rounded bg-neutral-800 md:h-5" />
        </div>
      </div>

      <div className="mx-auto mt-8 w-full max-w-7xl grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <PricingCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
}
