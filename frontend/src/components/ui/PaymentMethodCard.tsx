import { Copy, Check } from "lucide-react";
import { useState } from "react";

interface PaymentMethod {
  id: string;
  currency: string;
  network: string;
  address: string;
}

interface PaymentMethodCardProps {
  method: PaymentMethod;
  selected: boolean;
  onSelect: (id: string) => void;
  showAddress?: boolean;
}

export default function PaymentMethodCard({ 
  method, 
  selected, 
  onSelect, 
  showAddress = false 
}: PaymentMethodCardProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(method.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const getCurrencyIcon = (currency: string) => {
    switch (currency.toLowerCase()) {
      case 'bitcoin':
        return '₿';
      case 'ethereum':
        return 'Ξ';
      case 'tether':
        return '₮';
      case 'litecoin':
        return 'Ł';
      default:
        return '#';
    }
  };

  const getNetworkColor = (network: string) => {
    switch (network) {
      case 'BTC':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'ERC-20':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'TRC-20':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'LTC':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div 
      className={`relative p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
        selected 
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
      }`}
      onClick={() => onSelect(method.id)}
    >
      {/* Radio Button */}
      <div className="absolute top-4 right-4">
        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
          selected 
            ? 'border-blue-500 bg-blue-500' 
            : 'border-gray-300 dark:border-gray-600'
        }`}>
          {selected && (
            <div className="w-2 h-2 rounded-full bg-white"></div>
          )}
        </div>
      </div>

      {/* Currency Info */}
      <div className="flex items-center space-x-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-lg font-bold">
          {getCurrencyIcon(method.currency)}
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {method.currency}
          </h3>
          <span className={`text-xs px-2 py-1 rounded-full ${getNetworkColor(method.network)}`}>
            {method.network}
          </span>
        </div>
      </div>

      {/* Address Section */}
      {showAddress && (
        <div className="mt-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              Wallet Address:
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                copyToClipboard();
              }}
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded text-xs font-mono text-gray-700 dark:text-gray-300 break-all">
            {method.address}
          </div>
          {copied && (
            <p className="text-xs text-green-600 mt-1">Address copied!</p>
          )}
        </div>
      )}
    </div>
  );
}
