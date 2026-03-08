import { Card, CardContent } from "@/components/ui/card";

export interface SummaryType {
  sourceType: string;
  totalAmount: number;
  count: number;
}

interface Props {
  summary: SummaryType[];
  grandTotal: number;
  total: number;
}

export function PaymentSummary({ summary, grandTotal, total }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="bg-[#0a0a0a] border border-gray-800 shadow-sm">
        <CardContent className="pt-6">
          <p className="text-sm text-gray-400">Grand Total</p>

          <p className="text-2xl font-bold text-green-500 mt-1">
            ₹{grandTotal}
          </p>
          <p className="text-xs text-gray-500">{total} payments</p>
        </CardContent>
      </Card>
      {summary.map((item, index) => (
        <Card
          key={index}
          className="bg-[#0a0a0a] border border-gray-800 shadow-sm"
        >
          <CardContent className="pt-6">
            <p className="text-sm text-gray-400">{item.sourceType}</p>

            <p className="text-2xl font-bold text-orange-600 mt-1">
              ₹{item.totalAmount}
            </p>

            <p className="text-xs text-gray-500">{item.count} payments</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
