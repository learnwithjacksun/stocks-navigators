import { AdminTradeCard } from "@/components/ui";
import { useTrades, useUsers } from "@/hooks";
import { MainLayout } from "@/layouts";
import { Filter, Loader, Plus } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export default function UserTrades() {
  const { id } = useParams();
  const { users } = useUsers();
  const user = users?.find((user) => user?.id === id);
  const { trades, isLoadingTrades } = useTrades();
  const userTrades = trades?.filter((trade) => trade.user?.id === id);
  return (
    <MainLayout
      title={`${user?.firstName}'s Trades`}
      subtitle="View and manage user trades"
    >
      <div className="mt-10 space-y-6">
        {isLoadingTrades && !userTrades && (
          <div className="h-40 center gap-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Loading trades...
            </h3>
            <Loader className="animate-spin" />
          </div>
        )}

        {/* Trades Grid */}
        {userTrades && userTrades.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userTrades?.map((trade) => (
              <AdminTradeCard key={trade.id} trade={trade} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No trades found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Try adjusting your filters or start a new trade
            </p>
            <Link to="/trades/new">
              <button className="btn-primary px-4 py-2 rounded-md">
                <Plus size={16} className="mr-2" />
                Start New Trade
              </button>
            </Link>
          </div>
        )}

        {/* Summary Stats */}
        {userTrades && userTrades.length > 0 && (
          <div className="bg-background dark:bg-secondary rounded-lg border border-line p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {userTrades?.length}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Total Trades
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">
                  $
                  {userTrades
                    ?.filter((t) => t.currentValue > t.investmentAmount)
                    .reduce((sum, t) => sum + t.currentValue, 0)
                    .toLocaleString()}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Total Profit
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-red-600">
                  $
                  {Math.abs(
                    userTrades
                      ?.filter((t) => t.currentValue < t.investmentAmount)
                      .reduce((sum, t) => sum + t.currentValue, 0)
                  ).toLocaleString()}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Total Loss
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  $
                  {userTrades
                    ?.reduce((sum, t) => sum + t.currentValue, 0)
                    .toLocaleString()}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Current Value
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
