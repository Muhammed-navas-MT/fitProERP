import { Button } from "@/components/ui/button";

interface Props {
  onRetry: () => void;
}

export default function RevenueErrorState({ onRetry }: Props) {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
      <div className="text-center space-y-4">
        <h2 className="text-xl font-semibold text-red-400">
          Failed to load revenue data
        </h2>
        <p className="text-zinc-400">
          Something went wrong while fetching revenue details.
        </p>
        <Button
          onClick={onRetry}
          className="bg-orange-500 hover:bg-orange-600 text-white"
        >
          Retry
        </Button>
      </div>
    </div>
  );
}