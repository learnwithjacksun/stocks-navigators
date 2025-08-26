import { useState } from "react";
import {
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Clock,
  Loader,
  Edit,
  Save,
  X,
  Trash2,
} from "lucide-react";
import { formatNumber } from "@/helpers/formatNumber";
import { useTrades } from "@/hooks";

interface AdminTradeCardProps {
  trade: ITrade;
}

export default function AdminTradeCard({ trade }: AdminTradeCardProps) {
  const { updateTradeCurrentValue, deleteTrade, isDeleting, isLoading } = useTrades();
  const [editingValue, setEditingValue] = useState(false);
  const [newCurrentValue, setNewCurrentValue] = useState(trade.currentValue);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const profitPercentage =
    ((trade.currentValue - trade.investmentAmount) / trade.investmentAmount) *
    100;
  const profit = trade.currentValue - trade.investmentAmount;
  const isProfit = trade.currentValue >= trade.investmentAmount;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "running":
        return <Loader size={16} className="text-yellow-600 animate-spin" />;
      case "completed":
        return <CheckCircle size={16} className="text-blue-600" />;
      case "paused":
        return <Clock size={16} className="text-yellow-600" />;
      default:
        return <Clock size={16} className="text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "paused":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "running":
        return "Running";
      case "completed":
        return "Completed";
      case "paused":
        return "Paused";
      default:
        return "Unknown";
    }
  };

  const getProfitColor = (profit: number) => {
    return profit >= 0
      ? "text-green-600 dark:text-green-400"
      : "text-red-600 dark:text-red-400";
  };

  const getProfitIcon = (profit: number) => {
    return profit >= 0 ? (
      <TrendingUp className="w-4 h-4 text-green-600" />
    ) : (
      <TrendingDown className="w-4 h-4 text-red-600" />
    );
  };

  const handleUpdateValue = async () => {
    await updateTradeCurrentValue(trade.id, newCurrentValue);
    setEditingValue(false);
  };

 

  const handleDeleteTrade = async () => {
    if (confirm("Are you sure you want to delete this trade? This action cannot be undone.")) {
      await deleteTrade(trade.id);
    }
  };

  const cancelEdit = () => {
    setNewCurrentValue(trade.currentValue);
    setEditingValue(false);
  };

  return (
    <div className="bg-background dark:bg-secondary rounded-lg border border-line md:p-6 p-4 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div
            className={`h-12 w-12 rounded-full hidden md:flex items-center justify-center ${
              isProfit ? "bg-green-500/10" : "bg-red-500/10"
            }`}
          >
            {isProfit ? (
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
              <span
                className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(
                  trade.status
                )}`}
              >
                {getStatusText(trade.status)}
              </span>
            </div>
            <div className="text-sm text-muted">{trade.name}</div>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center space-x-2">
          {getStatusIcon(trade.status)}
          <span className="text-sm text-muted">
            {trade.status === "running" && "Live"}
            {trade.status === "completed" && "Done"}
            {trade.status === "paused" && "Stopped"}
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
          <div className="flex items-center space-x-2">
            {editingValue ? (
              <>
                <input
                  type="number"
                  value={newCurrentValue}
                  onChange={(e) => setNewCurrentValue(Number(e.target.value))}
                  className="w-20 px-2 py-1 text-sm border border-line rounded"
                />
                <button
                  onClick={handleUpdateValue}
                  disabled={isLoading}
                  className="p-1 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded"
                >
                  <Save className="w-3 h-3" />
                </button>
                <button
                  onClick={cancelEdit}
                  className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                >
                  <X className="w-3 h-3" />
                </button>
              </>
            ) : (
              <>
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  ${formatNumber(trade.currentValue)}
                </div>
                <button
                  onClick={() => setEditingValue(true)}
                  className="p-1 text-muted hover:text-main"
                >
                  <Edit className="w-3 h-3" />
                </button>
              </>
            )}
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
            {getProfitIcon(profitPercentage)}
            <span
              className={`text-sm font-medium ${getProfitColor(
                profitPercentage
              )}`}
            >
              ${formatNumber(Math.abs(profit))}
            </span>
          </div>
        </div>
      </div>

      {/* Profit Percentage Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs text-muted mb-2">
          <span>Performance</span>
          <span className={`font-medium ${getProfitColor(profitPercentage)}`}>
            {profitPercentage >= 0 ? "+" : ""}
            {profitPercentage.toFixed(2)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              profitPercentage >= 0 ? "bg-green-500" : "bg-red-500"
            }`}
            style={{
              width: `${Math.min(Math.abs(profitPercentage), 100)}%`,
            }}
          ></div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end pt-4 border-t border-line">
        <div className="flex items-center space-x-2">
         

          <button
            onClick={handleDeleteTrade}
            disabled={isDeleting}
            className="text-xs px-3 py-1.5 border border-red-300 dark:border-red-700 rounded-md text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-50"
          >
            {isDeleting ? (
              <Loader className="w-3 h-3 inline mr-1 animate-spin" />
            ) : (
              <Trash2 className="w-3 h-3 inline mr-1" />
            )}
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
