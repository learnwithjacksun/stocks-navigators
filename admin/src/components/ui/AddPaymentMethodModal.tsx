import { useState } from "react";
import { Plus, Loader } from "lucide-react";
import Modal from "./Modal";

interface AddPaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    currency: string;
    network: string;
    address: string;
  }) => Promise<void>;
  isLoading: boolean;
}

export default function AddPaymentMethodModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
}: AddPaymentMethodModalProps) {
  const [formData, setFormData] = useState({
    currency: "",
    network: "",
    address: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.currency || !formData.network || !formData.address) {
      return;
    }
    await onSubmit(formData);
    setFormData({ currency: "", network: "", address: "" });
    onClose();
  };

  const handleClose = () => {
    setFormData({ currency: "", network: "", address: "" });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Payment Method">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-muted mb-2">
            Currency *
          </label>
          <input
            type="text"
            value={formData.currency}
            onChange={(e) =>
              setFormData({ ...formData, currency: e.target.value })
            }
            className="w-full px-3 py-2 text-sm border border-line rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background dark:bg-foreground text-main"
            placeholder="e.g., Bitcoin, Ethereum, USDT"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-muted mb-2">
            Network *
          </label>
          <input
            type="text"
            value={formData.network}
            onChange={(e) =>
              setFormData({ ...formData, network: e.target.value })
            }
            className="w-full px-3 py-2 text-sm border border-line rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background dark:bg-foreground text-main"
            placeholder="e.g., Bitcoin, Ethereum, TRC20"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-muted mb-2">
            Wallet Address *
          </label>
          <textarea
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            className="w-full px-3 py-2 text-sm border border-line rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background dark:bg-foreground text-main resize-none"
            placeholder="Enter wallet address"
            rows={3}
            required
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 border text-sm border-line rounded-lg text-muted hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={
              isLoading ||
              !formData.currency ||
              !formData.network ||
              !formData.address
            }
            className="px-4 py-2 bg-primary text-sm text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
            <span>{isLoading ? "Adding..." : "Add "}</span>
          </button>
        </div>
      </form>
    </Modal>
  );
}
