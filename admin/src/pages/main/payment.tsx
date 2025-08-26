import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/layouts";
import { FileUpload, ButtonWithLoader } from "@/components/ui";
import { paymentMethods } from "@/constants/dummy";
import { AlertCircle, CheckCircle, Info, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { useTransaction } from "@/hooks";

interface PaymentData {
  amount: string;
  currency: string;
  network: string;
  address: string;
  methodId: string;
}

export default function Payment() {
  const { deposit, isLoading } = useTransaction();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [copied, setCopied] = useState(false);
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);

  useEffect(() => {
    // Get payment data from URL params
    const amount = searchParams.get("amount");
    const methodId = searchParams.get("methodId");

    if (!amount || !methodId) {
      toast.error("Invalid payment data");
      navigate("/deposit");
      return;
    }

    const selectedMethod = paymentMethods.find(
      (method) => method.id === methodId
    );
    if (!selectedMethod) {
      toast.error("Invalid payment method");
      navigate("/deposit");
      return;
    }

    setPaymentMethod(selectedMethod.currency);

    setPaymentData({
      amount,
      currency: selectedMethod.currency,
      network: selectedMethod.network,
      address: selectedMethod.address,
      methodId,
    });
  }, [searchParams, navigate]);

  const copyToClipboard = async () => {
    if (!paymentData) return;
    try {
      await navigator.clipboard.writeText(paymentData.address);
      setCopied(true);
      toast.success("Address copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handlePaymentConfirmation = async () => {
    if (!paymentData) return;
    if (!paymentProof) return toast.error("Please upload a payment proof");
    // Simulate API call to confirm paymdent

    await deposit(
      parseFloat(paymentData.amount),
      paymentMethod ?? "",
      paymentProof
    );

    toast.success("Payment confirmed!", {
      description: "Your deposit will be processed shortly.",
      action: {
        label: "View Dashboard",
        onClick: () => navigate("/dashboard"),
      },
    });
   
  };

  const getMinDeposit = (currency: string) => {
    switch (currency.toLowerCase()) {
      case "bitcoin":
        return "0.001 BTC";
      case "ethereum":
        return "0.01 ETH";
      case "tether":
        return "10 USDT";
      case "litecoin":
        return "0.1 LTC";
      default:
        return "$10";
    }
  };

  const getProcessingTime = (currency: string) => {
    switch (currency.toLowerCase()) {
      case "bitcoin":
        return "10-30 minutes";
      case "ethereum":
        return "2-5 minutes";
      case "tether":
        return "1-3 minutes";
      case "litecoin":
        return "5-15 minutes";
      default:
        return "5-30 minutes";
    }
  };

  if (!paymentData) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto space-y-6 mt-10">
          <div className="bg-background dark:bg-secondary rounded-lg border border-line p-4 md:p-6 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">
              Loading payment details...
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-6 mt-10">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">Complete Payment</h1>
            <p className="text-sm text-muted">
              Send ${paymentData.amount} worth of {paymentData.currency} to
              complete your deposit
            </p>
          </div>
        </div>

        {/* Payment Instructions */}
        <div className="bg-background dark:bg-secondary rounded-lg border border-line p-4 md:p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Info size={20} className="text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Payment Instructions</h2>
              <p className="text-sm text-muted">
                Follow these steps to complete your deposit
              </p>
            </div>
          </div>

          {/* Wallet Address */}
          <div className="bg-background dark:bg-foreground rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted">
                Wallet Address ({paymentData.network})
              </span>
              <button
                onClick={copyToClipboard}
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
            <div className="bg-background dark:bg-foreground p-3 rounded border font-mono text-sm text-gray-700 dark:text-gray-300 break-all">
              {paymentData.address}
            </div>
            {copied && (
              <p className="text-xs text-green-600 mt-2">
                Address copied to clipboard!
              </p>
            )}
          </div>

          {/* Payment Proof Upload */}
          <div className="bg-background dark:bg-foreground rounded-lg p-4 mb-6">
            <FileUpload
              onFileSelect={setPaymentProof}
              onFileRemove={() => setPaymentProof(null)}
              selectedFile={paymentProof}
              label="Upload Payment Proof"
              accept="image/*,.pdf"
              maxSize={5}
            />

            <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
              <p>• Accepted formats: PNG, JPG, PDF</p>
              <p>• Maximum file size: 5MB</p>
              <p>• This helps us process your deposit faster</p>
            </div>
          </div>

          {/* Transaction Summary */}
          <div className="bg-foreground rounded-lg p-4 mb-6">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              Transaction Summary
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">
                  Amount:
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  ${parseFloat(paymentData.amount).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">
                  Currency:
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {paymentData.currency} ({paymentData.network})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">
                  Processing Time:
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {getProcessingTime(paymentData.currency)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">
                  Minimum Deposit:
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {getMinDeposit(paymentData.currency)}
                </span>
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  Important Notes
                </h3>
                <ul className="text-xs text-muted mt-1 space-y-1">
                  <li>• Only send {paymentData.currency} to this address</li>
                  <li>
                    • Minimum deposit: {getMinDeposit(paymentData.currency)}
                  </li>
                  <li>
                    • Processing time: {getProcessingTime(paymentData.currency)}
                  </li>
                  <li>• Double-check the address before sending</li>
                  <li>• Deposits are automatically credited once confirmed</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  What happens next?
                </h3>
                <ul className="text-xs text-muted mt-1 space-y-1">
                  <li>• Send the exact amount to the address above</li>
                  <li>• Wait for blockchain confirmation</li>
                  <li>• Funds will be automatically added to your account</li>
                  <li>• You'll receive an email confirmation</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4 mt-10">
            <ButtonWithLoader
              onClick={handlePaymentConfirmation}
              loading={isLoading}
              disabled={false}
              className="w-full btn-primary text-white h-12 rounded-lg text-sm"
              initialText="I have made the payment"
              loadingText="Confirming payment..."
            />
            <button
              onClick={() => navigate("/deposit")}
              className="w-full h-12 text-sm border border-line rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Back to Deposit
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
