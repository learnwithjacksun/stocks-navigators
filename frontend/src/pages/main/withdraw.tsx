import { useState } from "react";
import { MainLayout } from "@/layouts";
import { PaymentMethodCard, AmountInput, ButtonWithLoader } from "@/components/ui";
import { paymentMethods } from "@/constants/dummy";
import { 
  ArrowDownRight, 
  AlertCircle, 
  CheckCircle, 
  Info,
  Wallet,
  Shield
} from "lucide-react";
import { toast } from "sonner";
import { formatNumber } from "@/helpers/formatNumber";
import { useTransaction, useAuth } from "@/hooks";

export default function Withdraw() {
  const { user } = useAuth();
  const { withdraw , isLoading } = useTransaction();
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [amount, setAmount] = useState("");
  const [withdrawAddress, setWithdrawAddress] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const selectedPaymentMethod = paymentMethods.find(method => method.id === selectedMethod);
  const availableBalance = user?.availableBalance ?? 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMethod || !amount || !withdrawAddress || parseFloat(amount) <= 0) {
        toast.error("Please fill in all fields");
        return;
    };

   const result = await withdraw(parseFloat(amount), selectedMethod, withdrawAddress);
   if (result) {
    setShowConfirmation(true);
   } else {
    toast.error("Withdrawal failed");
   }
  };

  const getMinWithdrawal = (currency: string) => {
    switch (currency.toLowerCase()) {
      case 'bitcoin':
        return '0.001 BTC';
      case 'ethereum':
        return '0.01 ETH';
      case 'tether':
        return '10 USDT';
      case 'litecoin':
        return '0.1 LTC';
      default:
        return '$10';
    }
  };

  const getProcessingTime = (currency: string) => {
    switch (currency.toLowerCase()) {
      case 'bitcoin':
        return '10-30 minutes';
      case 'ethereum':
        return '2-5 minutes';
      case 'tether':
        return '1-3 minutes';
      case 'litecoin':
        return '5-15 minutes';
      default:
        return '5-30 minutes';
    }
  };

  const getNetworkFee = (currency: string) => {
    switch (currency.toLowerCase()) {
      case 'bitcoin':
        return '0.0001 BTC';
      case 'ethereum':
        return '0.005 ETH';
      case 'tether':
        return '1 USDT';
      case 'litecoin':
        return '0.001 LTC';
      default:
        return '$1';
    }
  };

  const validateAddress = (address: string, network: string) => {
    // Basic validation patterns
    const patterns = {
      'BTC': /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$|^bc1[a-z0-9]{39,59}$/,
      'ERC-20': /^0x[a-fA-F0-9]{40}$/,
      'TRC-20': /^T[a-zA-Z0-9]{33}$/,
      'LTC': /^[LM3][a-km-zA-HJ-NP-Z1-9]{26,33}$|^ltc1[a-z0-9]{39,59}$/
    };
    
    return patterns[network as keyof typeof patterns]?.test(address) || false;
  };

  const isAddressValid = withdrawAddress && selectedPaymentMethod 
    ? validateAddress(withdrawAddress, selectedPaymentMethod.network)
    : true;

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-6 mt-10">
        {/* Balance Card */}
        <div className="bg-background dark:bg-secondary rounded-lg border border-line p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h3 className="text-sm text-muted">
                Available Balance
              </h3>
              <p className="text-3xl font-bold">
                ${availableBalance.toFixed(2)}
              </p>
            </div>
            <div className="p-3 bg-green-500/10 rounded-lg">
              <Wallet className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </div>

        {/* Withdrawal Form */}
        {!showConfirmation && (
          <div className="bg-background dark:bg-secondary rounded-lg border border-line p-4 md:p-6">
            <div className="flex space-x-3 mb-6">
              <div className="p-2 h-fit bg-red-500/10 rounded-lg">
                <ArrowDownRight className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Withdraw Funds
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Choose your preferred cryptocurrency and withdrawal address
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Amount Input */}
              <AmountInput
                value={amount}
                onChange={setAmount}
                label="Withdrawal Amount"
                placeholder="0.00"
                error={
                  amount && parseFloat(amount) <= 0 
                    ? "Amount must be greater than 0" 
                    : amount && parseFloat(amount) > availableBalance
                    ? "Amount exceeds available balance"
                    : ""
                }
              />

              {/* Payment Methods */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Select Withdrawal Method
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {paymentMethods.map((method) => (
                    <PaymentMethodCard
                      key={method.id}
                      method={method}
                      selected={selectedMethod === method.id}
                      onSelect={setSelectedMethod}
                    />
                  ))}
                </div>
                {!selectedMethod && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Please select a withdrawal method to continue
                  </p>
                )}
              </div>

              {/* Withdrawal Address */}
              {selectedMethod && (
                <div>
                  <label className="block text-sm font-medium text-muted mb-2">
                    Withdrawal Address ({selectedPaymentMethod?.network})
                  </label>
                  <input
                    type="text"
                    value={withdrawAddress}
                    onChange={(e) => setWithdrawAddress(e.target.value)}
                    placeholder={`Enter your ${selectedPaymentMethod?.currency} address`}
                    className={`block w-full px-3 py-3 border text-muted rounded-lg text-sm placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${
                      withdrawAddress && !isAddressValid
                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                        : 'border-line'
                    } bg-background dark:bg-foreground text-gray-900 dark:text-white`}
                  />
                  {withdrawAddress && !isAddressValid && (
                    <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                      Please enter a valid {selectedPaymentMethod?.network} address
                    </p>
                  )}
                  {withdrawAddress && isAddressValid && (
                    <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                      ✓ Valid {selectedPaymentMethod?.network} address
                    </p>
                  )}
                </div>
              )}

              {/* Transaction Summary */}
              {selectedMethod && amount && parseFloat(amount) > 0 && isAddressValid && (
                <div className="bg-background dark:bg-foreground rounded-lg border border-line p-4">
                  <h3 className="text-sm font-medium text-muted mb-3">
                    Transaction Summary
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Amount:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        ${parseFloat(amount).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Network Fee:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {selectedPaymentMethod ? getNetworkFee(selectedPaymentMethod.currency) : ""}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">You'll Receive:</span>
                      <span className="font-medium text-green-600">
                        ${(parseFloat(amount) - parseFloat(getNetworkFee(selectedPaymentMethod?.currency || '').replace(/[^0-9.]/g, ''))).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Processing Time:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {selectedPaymentMethod ? getProcessingTime(selectedPaymentMethod.currency) : ""}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Minimum Withdrawal:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {selectedPaymentMethod ? getMinWithdrawal(selectedPaymentMethod.currency) : ""}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Notice */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-medium text-blue-900 dark:text-blue-100">
                      Security Notice
                    </h3>
                    <p className="text-xs text-blue-700 dark:text-blue-200 mt-1">
                      Please double-check the withdrawal address. Transactions cannot be reversed once submitted.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <ButtonWithLoader
                type="submit"
                loading={isLoading}
                initialText="Submit Withdrawal"
                loadingText="Processing..."
                disabled={
                  !selectedMethod || 
                  !amount || 
                  !withdrawAddress || 
                  parseFloat(amount) <= 0 || 
                  parseFloat(amount) > availableBalance ||
                  !isAddressValid
                }
                className="w-full btn-primary text-white h-12 rounded-lg text-sm"
              >
              </ButtonWithLoader>
            </form>
          </div>
        )}

        {/* Confirmation Screen */}
        {showConfirmation && selectedPaymentMethod && (
          <div className="bg-background dark:bg-secondary rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 md:p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <CheckCircle size={24} className=" text-green-600" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                  Withdrawal Submitted
                </h2>
                <p className="text-sm text-muted">
                  Your withdrawal request has been submitted successfully
                </p>
              </div>
            </div>

            {/* Transaction Details */}
            <div className="bg-foreground rounded-lg p-4 mb-6">
              <h3 className="text-sm font-medium text-muted mb-3">
                Transaction Details
              </h3>
              <div className="space-y-2 text-xs md:text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">Amount:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    ${formatNumber(parseFloat(amount))}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Currency:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {selectedPaymentMethod.currency} ({selectedPaymentMethod.network})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">To Address:</span>
                  <span className="font-medium text-gray-900 dark:text-white font-mono text-xs">
                    {withdrawAddress.slice(0, 10)}...{withdrawAddress.slice(-10)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Processing Time:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {getProcessingTime(selectedPaymentMethod.currency)}
                  </span>
                </div>
              </div>
            </div>

            {/* Important Notes */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    What happens next?
                  </h3>
                  <ul className="md:text-sm text-xs text-muted mt-1 space-y-1">
                    <li>• Your withdrawal request is being processed</li>
                    <li>• You'll receive an email confirmation</li>
                    <li>• Funds will be sent to your address within {getProcessingTime(selectedPaymentMethod.currency)}</li>
                    <li>• You can track the status in your transaction history</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    Important Notes
                  </h3>
                  <ul className="md:text-sm text-xs text-muted mt-1 space-y-1">
                    <li>• Network fees have been deducted from your withdrawal amount</li>
                    <li>• Withdrawals cannot be cancelled once submitted</li>
                    <li>• Ensure your wallet supports {selectedPaymentMethod.network} network</li>
                    <li>• Contact support if you don't receive funds within 24 hours</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 text-sm px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Back to Form
              </button>
              <button
                onClick={() => {
                  setShowConfirmation(false);
                  setSelectedMethod("");
                  setAmount("");
                  setWithdrawAddress("");
                }}
                className="flex-1 text-sm px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                New Withdrawal
              </button>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
