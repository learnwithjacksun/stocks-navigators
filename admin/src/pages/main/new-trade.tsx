import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/layouts";
import { AmountInput, ButtonWithLoader, SelectWithoutIcon } from "@/components/ui";
import { tradingAssets, type TradingAsset } from "@/constants/dummy";
import { 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  Info,
} from "lucide-react";
import { toast } from "sonner";
import { useTrades } from "@/hooks";


interface TradeData {
  asset: TradingAsset | null;
  amount: string;
  tradeId: string;
  timestamp: Date;
}

 const scrollToTop = (id = "scroll-container") => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};


export default function NewTrade() {
  const navigate = useNavigate();
  const { createTrade, isLoading: isLoading } = useTrades();
  const [step, setStep] = useState<'form' | 'review' | 'success'>('form');
  const [selectedAssetId, setSelectedAssetId] = useState("");
  const [amount, setAmount] = useState("");
  const [tradeData, setTradeData] = useState<TradeData | null>(null);
  const [isReviewing, setIsReviewing] = useState(false);

  const selectedAsset = tradingAssets.find(asset => asset.id === selectedAssetId);

  useEffect(() => {
    setTimeout(() => scrollToTop(), 0);
  }, [step]);
  

  const handleReview = () => {
    scrollToTop();
    setIsReviewing(true);
    if (!selectedAsset) {
      toast.error("Please select a trading asset");
      return;
    }

    if (!amount || parseFloat(amount) < selectedAsset.minAmount) {
      toast.error(`Minimum trade amount is $${selectedAsset.minAmount}`);
      return;
    }

    if (parseFloat(amount) > selectedAsset.maxAmount) {
      toast.error(`Maximum trade amount is $${selectedAsset.maxAmount.toLocaleString()}`);
      return;
    }

    setTradeData({
      asset: selectedAsset,
      amount,
      tradeId: `TRD-${Date.now()}`,
      timestamp: new Date()
    });
    setTimeout(() => {
      setStep('review');
      setIsReviewing(false);
    }, 1000);
  };

  const handlePlaceTrade = async () => {
    if (!tradeData || !tradeData.asset || !tradeData.amount) return;

    const result = await createTrade(tradeData.asset.symbol, tradeData.asset.name, parseFloat(tradeData.amount));
    if (result) {
      setStep('success');
    } 
    scrollToTop();
  };
  

  const handleBackToForm = () => {
    setStep('form');
  };

  const handleNewTrade = () => {
    setStep('form');
    setSelectedAssetId("");
    setAmount("");
    setTradeData(null);
  };

  const getVolatilityColor = (volatility: string | undefined) => {
    switch (volatility?.toLowerCase()) {
      case 'high':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const assetOptions = tradingAssets.map(asset => ({
    label: `${asset.symbol} - ${asset.name}`,
    value: asset.id
  }));

  return (
    <MainLayout>
      <div id="scroll-container" className="max-w-4xl mx-auto space-y-6 mt-10">
        {/* Header */}
        <div className=" mb-6">

          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Start New Trade
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {step === 'form' && 'Select an asset and enter your investment amount'}
              {step === 'review' && 'Review your trade details before placing'}
              {step === 'success' && 'Trade placed successfully!'}
            </p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center flex-wrap mb-8">
          <div className="flex md:items-center gap-4 flex-wrap">
            <div className={`flex items-center space-x-2 ${step === 'form' ? 'text-blue-600' : step === 'review' || step === 'success' ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`min-w-8 min-h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step === 'form' ? 'bg-blue-600 text-white' : 
                step === 'review' || step === 'success' ? 'bg-green-600 text-white' : 
                'bg-background dark:bg-foreground text-muted shadow-sm'
              }`}>
                1
              </div>
              <span className="text-sm font-medium">Trade Details</span>
            </div>
            <div className="w-8 h-1 bg-line hidden md:block"></div>
            <div className={`flex items-center space-x-2 ${step === 'review' ? 'text-blue-600' : step === 'success' ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step === 'review' ? 'bg-blue-600 text-white' : 
                step === 'success' ? 'bg-green-600 text-white' : 
                'bg-background dark:bg-foreground text-muted shadow-sm'
              }`}>
                2
              </div>
              <span className="text-sm font-medium">Review</span>
            </div>
            <div className="w-8 h-1 bg-line hidden md:block"></div>
            <div className={`flex items-center space-x-2 ${step === 'success' ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step === 'success' ? 'bg-green-600 text-white' : 'bg-background dark:bg-foreground text-muted shadow-sm'
              }`}>
                3
              </div>
              <span className="text-sm font-medium">Complete</span>
            </div>
          </div>
        </div>

        {/* Form Step */}
        {step === 'form' && (
          <div className="bg-background dark:bg-secondary rounded-lg border border-line md:p-6 p-4">
            <div className="space-y-6">
              {/* Asset Selection */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Select Trading Asset
                </h3>
                <SelectWithoutIcon
                  label="Trading Asset"
                  options={assetOptions}
                  value={selectedAssetId}
                  className="bg-secondary"
                  onChange={(e) => setSelectedAssetId(e.target.value)}
                />
                
                {selectedAsset && (
                  <div className="mt-4 p-4 bg-foreground rounded-lg">
                    <div className="flex md:items-center justify-between mb-2 flex-wrap gap-2">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {selectedAsset.symbol} - {selectedAsset.name}
                      </h4>
                      <span className={`px-2 py-1 rounded-full w-fit text-xs font-medium ${getVolatilityColor(selectedAsset.volatility)}`}>
                        {selectedAsset.volatility} Volatility
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {selectedAsset.description}
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Category:</span>
                        <span className="ml-2 text-gray-900 dark:text-white">{selectedAsset.category}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Min Amount:</span>
                        <span className="ml-2 text-gray-900 dark:text-white">${selectedAsset.minAmount}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Amount Input */}
              <div>
               
                <AmountInput
                  value={amount}
                  onChange={setAmount}
                  label="Investment Amount"
                  placeholder="0.00"
                  error={
                    selectedAsset && amount 
                      ? parseFloat(amount) < selectedAsset.minAmount 
                        ? `Minimum amount is $${selectedAsset.minAmount}` 
                        : parseFloat(amount) > selectedAsset.maxAmount 
                        ? `Maximum amount is $${selectedAsset.maxAmount.toLocaleString()}` 
                        : ""
                      : ""
                  }
                />
                
                {selectedAsset && (
                  <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                    <p>• Minimum trade: ${selectedAsset.minAmount}</p>
                    <p>• Maximum trade: ${selectedAsset.maxAmount.toLocaleString()}</p>
                  </div>
                )}
              </div>

              {/* Important Notes */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100">
                      Important Information
                    </h4>
                    <ul className="text-xs text-blue-800 dark:text-blue-200 mt-1 space-y-1">
                      <li>• Trades are executed at market prices</li>
                      <li>• You can monitor your trade performance in real-time</li>
                      <li>• All trades are subject to market volatility</li>
                      <li>• You can close your position at any time</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex justify-end">
                <ButtonWithLoader
                  onClick={handleReview}
                  loading={isReviewing}
                  disabled={!selectedAsset || !amount || parseFloat(amount) < (selectedAsset?.minAmount || 0)}
                  className="btn-primary text-white text-sm px-6 py-2 rounded-lg"
                  initialText="Review Trade"
                  loadingText="Processing..."
                />
              </div>
            </div>
          </div>
        )}

        {/* Review Step */}
        {step === 'review' && tradeData && (
          <div className="bg-background dark:bg-secondary rounded-lg border border-line md:p-6 p-4">
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <TrendingUp size={20} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Review Your Trade
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Please review the details before placing your trade
                  </p>
                </div>
              </div>

              {/* Trade Summary */}
              <div className="bg-foreground rounded-lg p-6">
                <h4 className="font-medium text-gray-900 dark:text-white mb-4">Trade Summary</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Asset:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {tradeData.asset?.symbol} - {tradeData.asset?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Category:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {tradeData.asset?.category}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Volatility:</span>
                    <span className={`font-medium px-2 py-1 rounded-full text-xs ${getVolatilityColor(tradeData.asset?.volatility)}`}>
                      {tradeData.asset?.volatility}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Investment Amount:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      ${parseFloat(tradeData.amount).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Trade ID:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {tradeData.tradeId}
                    </span>
                  </div>
                </div>
              </div>

              {/* Risk Warning */}
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium text-yellow-900 dark:text-yellow-100">
                      Risk Warning
                    </h4>
                    <p className="text-xs text-yellow-800 dark:text-yellow-200 mt-1">
                      Trading involves substantial risk of loss. However, with out AI, there is a 92% chance that you will not lose your money.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex md:flex-row flex-col gap-4">
                <button
                  onClick={handleBackToForm}
                  className="px-6 py-2 text-sm flex-1 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Back to Edit
                </button>
                <ButtonWithLoader
                  onClick={handlePlaceTrade}
                  loading={isLoading}
                  disabled={isLoading}
                  className="btn-primary text-sm text-white px-6 py-2 rounded-lg flex-1"
                  initialText="Place Trade"
                  loadingText="Placing Trade..."
                />
              </div>
            </div>
          </div>
        )}

        {/* Success Step */}
        {step === 'success' && tradeData && (
          <div className="bg-background dark:bg-secondary rounded-lg border border-line md:p-6 p-4">
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Trade Placed Successfully!
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Your trade has been executed and is now active
                </p>
              </div>

              {/* Trade Details */}
              <div className="bg-foreground rounded-lg p-6 max-w-md mx-auto">
                <h4 className="font-medium text-gray-900 dark:text-white mb-4">Trade Details</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Trade ID:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{tradeData.tradeId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Asset:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{tradeData.asset?.symbol}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Amount:</span>
                    <span className="font-medium text-gray-900 dark:text-white">${parseFloat(tradeData.amount).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Status:</span>
                    <span className="font-medium text-green-600">Active</span>
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            
                  <div className="text-left space-y-2">
                    <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100">
                      What's Next?
                    </h4>
                    <ul className="text-xs text-blue-800 dark:text-blue-200 mt-1 space-y-1">
                      <li>• Monitor your trade performance in real-time</li>
                      <li>• Set up alerts for price movements</li>
                      <li>• Close your position when ready</li>
                      <li>• View your trade history and analytics</li>
                    </ul>
                  </div>
            
              </div>

              {/* Action Buttons */}
              <div className="flex md:flex-row flex-col gap-4">
                <button
                  onClick={() => navigate('/trades')}
                  className="px-6 py-2 text-sm flex-1 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  View All Trades
                </button>
                <button
                  onClick={handleNewTrade}
                  className="btn-primary text-sm text-white px-6 py-2 rounded-lg flex-1"
                >
                  Start New Trade
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
