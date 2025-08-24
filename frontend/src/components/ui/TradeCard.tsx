import { useState } from "react";
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Play, 
  Pause, 
  CheckCircle, 
  DollarSign,
  TrendingUp,
  TrendingDown,
  Clock,
  Loader,

} from "lucide-react";
import { formatNumber } from "@/helpers/formatNumber";
import { toast } from "sonner";
import ButtonWithLoader from "./ButtonWithLoader";

interface TradeCardProps {
  trade: ITrade;
  onClaimProfit?: (tradeId: string) => void;
}

export default function TradeCard({ trade, onClaimProfit }: TradeCardProps) {
  const [isClaiming, setIsClaiming] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <Loader size={16} className=" text-yellow-600 animate-spin" />;
      case 'completed':
        return <CheckCircle size={16} className=" text-blue-600" />;
      case 'paused':
        return <Pause size={16} className=" text-yellow-600" />;
      default:
        return <Clock size={16} className=" text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'running':
        return 'Running';
      case 'completed':
        return 'Completed';
      case 'paused':
        return 'Paused';
      default:
        return 'Unknown';
    }
  };

  const getProfitColor = (profit: number) => {
    return profit >= 0 
      ? 'text-green-600 dark:text-green-400' 
      : 'text-red-600 dark:text-red-400';
  };

  const getProfitIcon = (profit: number) => {
    return profit >= 0 
      ? <TrendingUp className="w-4 h-4 text-green-600" />
      : <TrendingDown className="w-4 h-4 text-red-600" />;
  };

  const handleClaimProfit = async () => {
    if (!trade.canClaim) {
      toast.error("This trade is not eligible for profit claiming");
      return;
    }

    setIsClaiming(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsClaiming(false);
      toast.success(`Successfully claimed $${formatNumber(trade.profit)} profit from ${trade.symbol}!`);
      onClaimProfit?.(trade.id);
    }, 2000);
  };

  return (
    <div className="bg-background dark:bg-secondary rounded-lg border border-line md:p-6 p-4 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div
            className={`h-12 w-12 rounded-full hidden md:flex items-center justify-center ${
              trade.profit >= 0
                ? "bg-green-500/10"
                : "bg-red-500/10"
            }`}
          >
            {trade.profit >= 0 ? (
              <ArrowUpRight className="w-5 h-5 text-green-600" />
            ) : (
              <ArrowDownRight className="w-5 h-5 text-red-600" />
            )}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                {trade.symbol}
              </span>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(trade.status)}`}>
                {getStatusText(trade.status)}
              </span>
            </div>
            <div className="text-sm text-muted">
              {trade.name}
            </div>
          </div>
        </div>
        
        {/* Status Indicator */}
        <div className="flex items-center space-x-2">
          {getStatusIcon(trade.status)}
          <span className="text-sm text-muted">
            {trade.status === 'running' && 'Live'}
            {trade.status === 'completed' && 'Done'}
            {trade.status === 'paused' && 'Stopped'}
          </span>
        </div>
      </div>

      {/* Trade Details */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <div className="text-xs text-muted">Investment Amount</div>
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            ${formatNumber(trade.investmentAmount)}
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-xs text-muted">Current Value</div>
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            ${formatNumber(trade.currentValue)}
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-xs text-muted">Date Placed</div>
          <div className="text-sm font-medium text-gray-900 dark:text-white">
          {formatDate(trade.createdAt)}
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-xs text-muted">Profit/Loss</div>
          <div className="flex items-center space-x-1">
            {getProfitIcon(trade.profit)}
            <span className={`text-sm font-medium ${getProfitColor(trade.profit)}`}>
              ${formatNumber(Math.abs(trade.profit))}
            </span>
          </div>
        </div>
      </div>

      {/* Profit Percentage Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs text-muted mb-2">
          <span>Performance</span>
          <span className={`font-medium ${getProfitColor(trade.profitPercentage)}`}>
            {trade.profitPercentage >= 0 ? '+' : ''}{trade.profitPercentage.toFixed(2)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              trade.profitPercentage >= 0 ? 'bg-green-500' : 'bg-red-500'
            }`}
            style={{ 
              width: `${Math.min(Math.abs(trade.profitPercentage), 100)}%` 
            }}
          ></div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end pt-4 border-t border-line">
      
        
        <div className="flex items-center space-x-2">
          {trade.status === 'running' && (
            <button className="text-xs px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Pause className="w-3 h-3 inline mr-1" />
              Pause
            </button>
          )}
          
          {trade.status === 'paused' && (
            <button className="text-xs px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Play className="w-3 h-3 inline mr-1" />
              Resume
            </button>
          )}
          
          {trade.canClaim && trade.profit > 0 && (
            <ButtonWithLoader
              onClick={handleClaimProfit}
              loading={isClaiming}
              disabled={isClaiming}
              className="text-xs btn-primary px-3 py-1.5 rounded-md"
              initialText={
              `Claim ${formatNumber(trade.profit)}`
              }
              loadingText="Claiming..."
            />
          )}
          
          {!trade.canClaim && trade.profit > 0 && (
            <button 
              disabled
              className="text-xs px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-md cursor-not-allowed"
            >
              <DollarSign className="w-3 h-3 inline mr-1" />
              Locked
            </button>
          )}
          
          {trade.profit < 0 && (
            <button className="text-xs px-3 py-1.5 border border-red-300 dark:border-red-700 rounded-md text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
              Close Trade
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
