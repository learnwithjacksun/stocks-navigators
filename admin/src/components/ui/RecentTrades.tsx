import { useTrades } from "@/hooks";
import { TradeCard } from ".";

export default function RecentTrades() {
  const { trades } = useTrades();
  const recentTrades = trades?.slice(0, 4);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {recentTrades?.map((trade) => (
        <TradeCard key={trade.id} trade={trade} />
      ))}
    </div>
  );
}
