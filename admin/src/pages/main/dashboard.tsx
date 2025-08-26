import { MainLayout } from "@/layouts";
import { StatCard, UserCard } from "@/components/ui";
import { StockMarket } from "react-ts-tradingview-widgets";
import { TrendingUp, Wallet, BarChart3, Loader2, UsersRound, Search } from "lucide-react";

import { useAuth, useTheme, useTrades, useTransaction, useUsers } from "@/hooks";
import { Link } from "react-router-dom";
import CountUp from "react-countup";

export default function Dashboard() {
  const { theme } = useTheme();
  const { user, isCheckAuth } = useAuth(); 
  const { totalTransactions, totalInflow } = useTransaction();
  const {users, isLoadingUsers} = useUsers();
  const {trades} = useTrades();
  const newUsers = users?.slice(0, 4);
  if (isCheckAuth && !user) {
    return (
      <>
        <div className="center h-[100dvh]">
          <div className="flex items-center gap-2">
            <Loader2 className="w-10 h-10 animate-spin" />
            <p className="text-sm text-gray-500">Loading...</p>
          </div>
        </div>
      </>
    );
  }
  return (
    <MainLayout title="Overview" subtitle="Track platform activities">
      <div className="space-y-6">
        {/* Portfolio Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
          <div className="p-6 flex justify-between items-center text-white bg-gradient-to-br from-green-900 via-primary to-primary rounded-lg border border-line">
            <div>
              <p className=" font-medium text-white/80">Total Revenue</p>
              <p className="text-2xl font-bold text-white mt-1">
                <CountUp
                  end={totalInflow ?? 0}
                  decimals={2}
                  prefix="$"
                />
              </p>
            </div>
            <div>
              <Wallet/>
            </div>
          </div>
         

          <StatCard
            title="Total Users"
            value={`${users?.length ?? 0}`}
            changePercent={10}
            icon={TrendingUp}
            trend={"up"}
          />
          <StatCard
            title="Total Trades"
            value={`${trades?.length ?? 0}`}
            icon={BarChart3}
            trend="neutral"
          />
          <StatCard
            title="Total Transactions"
            value={`${totalTransactions ?? 0}`}
            icon={BarChart3}
            trend="neutral"
          />
        </div>

        {/* Quick Actions */}
        <div className="dark:bg-secondary bg-background rounded-lg border border-line p-6">
          <h3 className=" font-semibold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/users"
              className="flex items-center justify-center space-x-2 p-4 border border-line rounded-lg bg-foreground transition-colors"
            >
              <UsersRound size={20} className=" text-red-600" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Manage Users
              </span>
            </Link>
            <Link
              to="/trades"
              className="flex items-center justify-center space-x-2 p-4 border border-line rounded-lg bg-foreground transition-colors"
            >
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Manage Trades
              </span>
            </Link>
            <Link
              to="/transactions"
              className="flex items-center justify-center space-x-2 p-4 border border-line rounded-lg bg-foreground transition-colors"
            >
              <Wallet className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Transactions
              </span>
            </Link>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              New Users
            </h2>
            <Link to="/users" className="btn flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
              <UsersRound size={16} />
              <span>View All</span>
            </Link>
          </div>

          {!isLoadingUsers && (
          <>
            {newUsers && newUsers.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {newUsers.map((user) => (
                  <UserCard
                    key={user.id}
                    user={user}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No users found
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Try adjusting your search or filters
                </p>
               
              </div>
            )}
          </>
        )}
        </div>

        <div className="bg-background dark:bg-secondary p-4 rounded-xl border border-line">
          <StockMarket
            colorTheme={theme}
            height={500}
            width="100%"
            isTransparent
          ></StockMarket>
        </div>
      </div>
    </MainLayout>
  );
}
