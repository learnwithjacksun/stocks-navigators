import {
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
  ExternalLink,
} from "lucide-react";
import { formatNumber } from "@/helpers/formatNumber";
import { Link } from "react-router-dom";

interface TransactionCardProps {
  transaction: ITransaction;
}

export default function TransactionCard({
  transaction,
}: TransactionCardProps) {

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return <ArrowDownRight size={16} className=" text-green-600" />;
      case "withdrawal":
        return <ArrowUpRight size={16} className=" text-red-600" />;
      case "trade":
        return <TrendingUp size={16} className=" text-blue-600" />;
      case "profit_claim":
        return <DollarSign size={16} className=" text-green-600" />;
      case "fee":
        return <CreditCard size={16} className=" text-orange-600" />;
      default:
        return <Banknote size={16} className=" text-gray-600" />;
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
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "processing":
        return <AlertCircle className="w-4 h-4 text-blue-600 animate-pulse" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
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

//   const copyToClipboard = async (text: string) => {
//     try {
//       await navigator.clipboard.writeText(text);
//       setCopied(true);
//       toast.success("Reference copied to clipboard");
//       setTimeout(() => setCopied(false), 2000);
//     } catch (err) {
//       console.error("Failed to copy: ", err);
//     }
//   };

  return (
    <>
      <div className="bg-background dark:bg-secondary rounded-lg border border-line p-4">
          <div className="grid lg:grid-cols-6 md:grid-cols-2 grid-cols-2 gap-4 ">
            <div className="flex items-center space-x-3 col-span-full md:col-span-2">
              <div
                className={`h-10 min-w-10 w-10 center rounded-full ${
                  transaction.type === "deposit"
                    ? "bg-green-500/10"
                    : transaction.type === "withdrawal"
                    ? "bg-red-500/10"
                    : "bg-gray-500/10"
                }`}
              >
                {getTypeIcon(transaction.type)}
              </div>
              <div className="space-y-1">
              <span
                  className={`text-sm  font-medium ${getTypeColor(
                    transaction.type
                  )}`}
                >
                  {getTypeText(transaction.type)}
                </span>
                <div className="text-ellipsis overflow-hidden whitespace-nowrap line-clamp-1 text-sm md:max-w-[200px]">
                  {transaction.description}
                </div>
              </div>
            </div>
            <div className="space-y-2 border md:border-none p-3 rounded-md md:p-0 border-line">
              <div className="text-sm text-muted">Amount</div>
              <div
                className={` font-semibold ${getAmountColor(transaction.type)}`}
              >
                {transaction.type === "withdrawal" ? "-" : "+"}$
                {formatNumber(Math.abs(Number(transaction.amount)))}
              </div>
            </div>
            <div className="space-y-2 border md:border-none p-3 rounded-md md:p-0 border-line">
              <div className="text-sm text-muted">Date</div>
              <div className="">{formatDate(transaction.createdAt.toString())}</div>
            </div>
            <div className="space-y-2 border md:border-none p-3 rounded-md md:p-0 border-line">
              <div className="text-sm text-muted">Status</div>
              <div className="flex items-center space-x-2">
              {getStatusIcon(transaction.status)}
              <span
                className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(
                  transaction.status
                )}`}
              >
                {getStatusText(transaction.status)}
              </span>
            </div>
            </div>
            {transaction.method && (
              <div className="space-y-2 border md:border-none p-3 rounded-md md:p-0 border-line">
                <div className="text-sm text-muted">Method</div>
                <div className="">{transaction.method}</div>
              </div>
            )}
          </div>

          <div className="flex justify-end md:border-t border-0 border-line pt-4 mt-4">
            <Link to={`/transaction/${transaction.id}`}>
              <button className="border border-line rounded-md bg-foreground px-3 py-1">
                <ExternalLink className="w-4 h-4" /> Details
              </button>
            </Link>
          </div>
      </div>

      
    </>
  );
}
