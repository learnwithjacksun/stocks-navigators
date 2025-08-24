import { MainLayout } from "@/layouts";
import { StatCard, RecentTrades } from "@/components/ui";
import { StockMarket } from "react-ts-tradingview-widgets";
import { DollarSign, TrendingUp, Wallet, BarChart3 } from "lucide-react";
import { formatNumber } from "@/helpers/formatNumber";
import { useTheme } from "@/hooks";
import { Link } from "react-router-dom";
import CountUp from "react-countup";

export default function Dashboard() {
  const { theme } = useTheme();
  return (
    <MainLayout title="Overview" subtitle="Track your portfolio performance">
      <div className="space-y-6">
        {/* Portfolio Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          <div className="p-6 flex justify-between items-center text-white bg-gradient-to-br from-green-900 via-primary to-primary rounded-lg border border-line">
            <div>
              <p className=" font-medium text-white/80">Available Cash</p>
              <p className="text-2xl font-bold text-white mt-1">
                <CountUp
                  end={23000}
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
            title="Total Gain/Loss"
            value={`$${formatNumber(1000)}`}
            changePercent={10}
            icon={TrendingUp}
            trend={"up"}
          />
          <StatCard
            title="Total Invested"
            value={`$${formatNumber(1000)}`}
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
              to="/trade"
              className="flex items-center justify-center space-x-2 p-4 border border-line rounded-lg bg-foreground transition-colors"
            >
              <TrendingUp className="w-5 h-5 text-red-600" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Trade Stock
              </span>
            </Link>
            <Link
              to="/deposit"
              className="flex items-center justify-center space-x-2 p-4 border border-line rounded-lg bg-foreground transition-colors"
            >
              <DollarSign className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Deposit
              </span>
            </Link>
            <Link
              to="/withdraw"
              className="flex items-center justify-center space-x-2 p-4 border border-line rounded-lg bg-foreground transition-colors"
            >
              <Wallet className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Withdraw
              </span>
            </Link>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Recent Trades
            </h2>
            <Link to="/trades" className="btn flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
              <BarChart3 size={16} />
              <span>View All</span>
            </Link>
          </div>

          <RecentTrades />
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
