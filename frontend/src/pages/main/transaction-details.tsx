import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MainLayout } from '@/layouts';
import { 
  ArrowLeft,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  TrendingUp,
  CreditCard,
  Banknote,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Calendar,
  User,
  Hash,
  FileText,
  Copy,
  Check,
} from 'lucide-react';
import { formatNumber } from "@/helpers/formatNumber";
import { toast } from "sonner";
import { useTransaction } from "@/hooks";
import { dateFormatter } from "@/helpers/dateFormatter";

export default function TransactionDetails() {
  const { id } = useParams<{ id: string }>();
  const { transactions } = useTransaction();
  const [copied, setCopied] = useState(false);

  const transaction = transactions?.find((transaction) => transaction.id === id);
 

 

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return <ArrowDownRight size={20} className="text-green-600" />;
      case "withdrawal":
        return <ArrowUpRight size={20} className="text-red-600" />;
      case "trade":
        return <TrendingUp size={20} className="text-blue-600" />;
      case "profit_claim":
        return <DollarSign size={20} className="text-green-600" />;
      case "fee":
        return <CreditCard size={20} className="text-orange-600" />;
      default:
        return <Banknote size={20} className="text-gray-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "deposit":
        return "text-green-800 dark:text-green-400";
      case "withdrawal":
        return "text-red-600 dark:text-red-400";
      case "trade":
        return "text-blue-800 dark:text-blue-400";
      case "profit_claim":
        return "text-green-600 dark:text-green-400";
      case "fee":
        return "text-orange-600 dark:text-orange-400";
      default:
        return "text-gray-800 dark:text-gray-400";
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case "deposit":
        return "Deposit";
      case "withdrawal":
        return "Withdrawal";
      case "trade":
        return "Trade";
      case "profit_claim":
        return "Profit Claim";
      case "fee":
        return "Fee";
      default:
        return "Transaction";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case "processing":
        return <AlertCircle className="w-5 h-5 text-blue-600 animate-pulse" />;
      case "failed":
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "processing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "pending":
        return "Pending";
      case "processing":
        return "Processing";
      case "failed":
        return "Failed";
      default:
        return "Unknown";
    }
  };

  const getAmountColor = (type: string) => {
    if (type === "withdrawal") return "text-red-600 dark:text-red-400";
    if (type === "deposit") return "text-green-600 dark:text-green-400";
    if (type === "trade") return "text-blue-600 dark:text-blue-400";
    if (type === "profit_claim") return "text-green-600 dark:text-green-400";
    if (type === "fee") return "text-orange-600 dark:text-orange-400";
    return "text-gray-600 dark:text-gray-400";
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast.error("Failed to copy to clipboard");
    }
  };

 



  if (!transaction) {
    return (
      <MainLayout title="Transaction Details" subtitle="Transaction not found">
        <div className="mt-10 flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Transaction not found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              The transaction you're looking for doesn't exist or has been removed.
            </p>
            <Link
              to="/transactions"
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Transactions
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Transaction Details" subtitle={`View details for ${transaction.reference}`}>
      <div className="mt-10 space-y-6">
        {/* Back Button */}
        <div className="flex items-center justify-between">
          <Link
            to="/transactions"
            className="inline-flex items-center text-sm text-muted hover:text-main transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Transactions
          </Link>
        </div>

        {/* Transaction Header */}
        <div className="bg-background dark:bg-secondary rounded-lg border border-line p-6">
          <div className="flex md:flex-row flex-col md:items-center md:justify-between gap-4 mb-6">
            <div className="flex items-center space-x-4">
              <div
                className={`h-12 w-12 center rounded-full ${
                  transaction.type === "deposit"
                    ? "bg-green-500/10"
                    : transaction.type === "withdrawal"
                    ? "bg-red-500/10"
                    : "bg-gray-500/10"
                }`}
              >
                {getTypeIcon(transaction.type)}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-main">
                  {getTypeText(transaction.type)}
                </h1>
                <p className="text-muted text-sm">{transaction.description}</p>
              </div>
            </div>
            <div className="md:text-right text-left">
              <div className={`text-2xl font-bold ${getAmountColor(transaction.type)}`}>
                {transaction.type === "withdrawal" ? "-" : "+"}$
                {formatNumber(Math.abs(Number(transaction.amount)))}
              </div>
              <div className="flex items-center space-x-2 mt-2">
                {getStatusIcon(transaction.status)}
                <span
                  className={`text-sm px-3 py-1 rounded-full font-medium ${getStatusColor(
                    transaction.status
                  )}`}
                >
                  {getStatusText(transaction.status)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="bg-background dark:bg-secondary rounded-lg border border-line md:p-6 p-4 md:text-sm text-xs">
              <h2 className="text-lg font-semibold text-main mb-4 flex items-center">
                <Hash className="w-5 h-5 mr-2" />
                Transaction Information
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-line">
                  <span className="text-muted">Transaction ID</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-sm">{transaction.id}</span>
                    <button
                      onClick={() => copyToClipboard(transaction.id)}
                      className="text-muted hover:text-main transition-colors"
                    >
                     {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-line">
                  <span className="text-muted">Reference</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-sm">{transaction.reference}</span>
                    <button
                      onClick={() => copyToClipboard(transaction.reference)}
                      className="text-muted hover:text-main transition-colors"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-line">
                  <span className="text-muted">Type</span>
                  <span className={`font-medium ${getTypeColor(transaction.type)}`}>
                    {getTypeText(transaction.type)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-line">
                  <span className="text-muted">Method</span>
                  <span className="font-medium">{transaction.method}</span>
                </div>
                {transaction.recipient && (
                  <div className="flex justify-between items-center py-2 border-b border-line">
                    <span className="text-muted">Recipient</span>
                    <span className="font-mono text-sm break-all">{transaction.recipient}</span>
                  </div>
                )}
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted">Fee</span>
                  <span className="font-medium">${formatNumber(transaction.fee)}</span>
                </div>
              </div>
            </div>

            {/* User Information */}
            <div className="bg-background dark:bg-secondary rounded-lg border border-line md:p-6 p-4 md:text-sm text-xs">
              <h2 className="text-lg font-semibold text-main mb-4 flex items-center">
                <User className="w-5 h-5 mr-2" />
                User Information
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-line">
                  <span className="text-muted">Name</span>
                  <span className="font-medium">
                    {transaction.user.firstName} {transaction.user.lastName}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-line">
                  <span className="text-muted">Email</span>
                  <span className="font-medium">{transaction.user.email}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted">Phone</span>
                  <span className="font-medium">{transaction.user.phone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6 md:text-sm text-xs">
            {/* Timestamps */}
            <div className="bg-background dark:bg-secondary rounded-lg border border-line p-6">
              <h2 className="text-lg font-semibold text-main mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Timestamps
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-line">
                  <span className="text-muted">Created</span>
                  <span className="font-medium">{dateFormatter(transaction.createdAt.toString())}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted">Last Updated</span>
                  <span className="font-medium">{dateFormatter(transaction.updatedAt.toString())}</span>
                </div>
              </div>
            </div>

            {/* Receipt Section */}
            {transaction.receipt.url && (
              <div className="bg-background dark:bg-secondary rounded-lg border border-line p-6">
                <h2 className="text-lg font-semibold text-main mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Receipt
                </h2>
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-muted">Receipt Available</span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => window.open(transaction.receipt.url, '_blank')}
                          className="inline-flex items-center px-3 py-1 text-sm border border-line rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </button>
                       
                      </div>
                    </div>
                    <p className="text-xs text-muted">
                      Receipt ID: {transaction.receipt.id}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Description */}
            <div className="bg-background dark:bg-secondary rounded-lg border border-line p-6">
              <h2 className="text-lg font-semibold text-main mb-4">Description</h2>
              <p className="text-muted leading-relaxed">
                {transaction.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
