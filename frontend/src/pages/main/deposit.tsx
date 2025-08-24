import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/layouts";
import { PaymentMethodCard, AmountInput, ButtonWithLoader } from "@/components/ui";
import { paymentMethods } from "@/constants/dummy";
import { 
  CreditCard
} from "lucide-react";


export default function Deposit() {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [amount, setAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const selectedPaymentMethod = paymentMethods.find(method => method.id === selectedMethod);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMethod || !amount || parseFloat(amount) <= 0) return;

    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      // Redirect to payment page with data
      navigate(`/payment?amount=${encodeURIComponent(amount)}&methodId=${encodeURIComponent(selectedMethod)}`);
    }, 1000);
  };

  const getMinDeposit = (currency: string) => {
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

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-6 mt-10">
        {/* Deposit Form */}
        <div className="bg-background dark:bg-secondary rounded-lg border border-line p-6">
          <div className="flex space-x-3 mb-6">
            <div className="p-2 h-fit bg-green-500/10 rounded-lg">
              <CreditCard className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Deposit Funds
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Choose your preferred cryptocurrency and enter the amount
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Amount Input */}
            <AmountInput
              value={amount}
              onChange={setAmount}
              label="Deposit Amount"
              placeholder="0.00"
              error={amount && parseFloat(amount) <= 0 ? "Amount must be greater than 0" : ""}
            />

            {/* Payment Methods */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Select Payment Method
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
                  Please select a payment method to continue
                </p>
              )}
            </div>

            {/* Transaction Summary */}
            {selectedMethod && amount && parseFloat(amount) > 0 && (
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
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
                    <span className="text-gray-500 dark:text-gray-400">Payment Method:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {selectedPaymentMethod?.currency} ({selectedPaymentMethod?.network})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Processing Time:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {selectedPaymentMethod ? getProcessingTime(selectedPaymentMethod.currency) : ""}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Minimum Deposit:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {selectedPaymentMethod ? getMinDeposit(selectedPaymentMethod.currency) : ""}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <ButtonWithLoader
              type="submit"
              loading={isProcessing}
              disabled={!selectedMethod || !amount || parseFloat(amount) <= 0}
              className="w-full btn-primary text-white h-12 rounded-lg text-sm"
              initialText="Continue to Payment"
              loadingText="Processing..."
            />
          </form>
        </div>
      </div>
    </MainLayout>
  );
}
