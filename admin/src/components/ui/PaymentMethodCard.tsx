import { useState } from "react";
import { 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Copy, 
  Check,
  Loader,
} from "lucide-react";
import { toast } from "sonner";
import { dateFormatter } from "@/helpers/dateFormatter";

interface PaymentMethodCardProps {
  paymentMethod: {
    id: string;
    currency: string;
    network: string;
    address: string;
    createdAt: string;
    updatedAt: string;
  };
  onUpdate: (id: string, data: { currency: string; network: string; address: string }) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  isLoading: boolean;
}

export default function PaymentMethodCard({ 
  paymentMethod, 
  onUpdate, 
  onDelete, 
  isLoading 
}: PaymentMethodCardProps) {
  const [editing, setEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    currency: paymentMethod.currency,
    network: paymentMethod.network,
    address: paymentMethod.address,
  });

  const handleSave = async () => {
    await onUpdate(paymentMethod.id, formData);
    setEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      currency: paymentMethod.currency,
      network: paymentMethod.network,
      address: paymentMethod.address,
    });
    setEditing(false);
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this payment method? This action cannot be undone.")) {
      await onDelete(paymentMethod.id);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Address copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast.error("Failed to copy to clipboard");
    }
  };

  const getCurrencyIcon = (currency: string) => {
    switch (currency.toLowerCase()) {
      case 'bitcoin':
      case 'btc':
        return '₿';
      case 'ethereum':
      case 'eth':
        return 'Ξ';
      case 'usdt':
        return '$';
      case 'usdc':
        return '$';
      default:
        return '💳';
    }
  };

  const getCurrencyColor = (currency: string) => {
    switch (currency.toLowerCase()) {
      case 'bitcoin':
      case 'btc':
        return 'text-orange-600';
      case 'ethereum':
      case 'eth':
        return 'text-blue-600';
      case 'usdt':
        return 'text-green-600';
      case 'usdc':
        return 'text-blue-500';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="bg-background dark:bg-secondary rounded-lg border border-line p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
            <span className={`text-2xl ${getCurrencyColor(paymentMethod.currency)}`}>
              {getCurrencyIcon(paymentMethod.currency)}
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-main">
              {paymentMethod.currency.toUpperCase()}
            </h3>
            <p className="text-sm text-muted">{paymentMethod.network}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          {editing ? (
            <>
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded transition-colors disabled:opacity-50"
                title="Save"
              >
                {isLoading ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              </button>
              <button
                onClick={handleCancel}
                className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                title="Cancel"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setEditing(true)}
                className="p-2 text-muted hover:text-main transition-colors"
                title="Edit"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={handleDelete}
                disabled={isLoading}
                className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors disabled:opacity-50"
                title="Delete"
              >
                {isLoading ? <Loader className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {editing ? (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-muted mb-1">Currency</label>
              <input
                type="text"
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                className="w-full px-3 py-2 border border-line rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background dark:bg-foreground text-main"
                placeholder="e.g., Bitcoin, Ethereum, USDT"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted mb-1">Network</label>
              <input
                type="text"
                value={formData.network}
                onChange={(e) => setFormData({ ...formData, network: e.target.value })}
                className="w-full px-3 py-2 border border-line rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background dark:bg-foreground text-main"
                placeholder="e.g., Bitcoin, Ethereum, TRC20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted mb-1">Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2 border border-line rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background dark:bg-foreground text-main"
                placeholder="Wallet address"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-line">
              <span className="text-sm text-muted">Currency</span>
              <span className="font-medium">{paymentMethod.currency.toUpperCase()}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-line">
              <span className="text-sm text-muted">Network</span>
              <span className="font-medium">{paymentMethod.network}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-muted">Address</span>
              <div className="flex items-center space-x-2">
                <span className="font-mono text-sm max-w-32 truncate">{paymentMethod.address}</span>
                <button
                  onClick={() => copyToClipboard(paymentMethod.address)}
                  className="p-1 text-muted hover:text-main transition-colors"
                  title="Copy address"
                >
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Timestamps */}
        <div className="pt-3 border-t border-line">
          <div className="grid grid-cols-2 gap-4 text-xs text-muted">
            <div>
              <span className="block">Created</span>
              <span>{dateFormatter(paymentMethod.createdAt)}</span>
            </div>
            <div className="text-right">
              <span className="block">Updated</span>
              <span>{dateFormatter(paymentMethod.updatedAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
