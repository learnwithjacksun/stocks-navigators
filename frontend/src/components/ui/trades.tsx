import {
    ArrowUpRight,
    ArrowDownRight,
    Loader2,
  } from "lucide-react";
  import { formatNumber } from "@/helpers/formatNumber";
  
  interface TradesProps {
    trades: ITrade[];
  }
  
  export default function Trades({ trades }: TradesProps) {
  
  
    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    };
  
    return (
      <div className="bg-background dark:bg-secondary rounded-lg border border-line">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {trades.map((trade) => (
            <div key={trade.id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className={`h-10 min-w-10 center rounded-full ${
                      trade.type === "gain"
                        ? "bg-green-500/10"
                        : "bg-red-500/10"
                    }`}
                  >
                    {trade.type === "gain" ? (
                      <ArrowUpRight className="w-4 h-4 text-green-600" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {trade.symbol}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          trade.type === "gain"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        }`}
                      >
                        {trade.type.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-xs text-muted">
                      {trade.type === "gain" ? "Bought" : "Sold"} @ $
                      {formatNumber(trade.price)}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    ${formatNumber(trade.profit)}
                  </div>
                  <div className="flex items-center justify-end space-x-1 mt-1">
                    <Loader2 size={16} className="animate-spin text-yellow-500" />{" "}
                    <span className="text-xs text-muted">
                      Running...
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between border-t border-line mt-4 pt-3">
                <div className="text-xs text-muted mt-1">
                  {formatDate(trade.createdAt)}
                </div>
                <button className="text-xs btn-primary px-3 py-2 rounded-md">
                  Claim Profit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  