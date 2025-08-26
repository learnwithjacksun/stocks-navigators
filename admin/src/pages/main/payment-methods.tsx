import { useState } from "react";
import { Plus, Search, Wallet} from "lucide-react";
import { usePaymentMethods } from "@/hooks";
import { PaymentMethodCard, AddPaymentMethodModal } from "@/components/ui";
import { MainLayout } from "@/layouts";

export default function PaymentMethods() {
  const {
    paymentMethods,
    isLoadingPaymentMethods,
    createPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod,
  } = usePaymentMethods();

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // Filter payment methods based on search term
  const filteredPaymentMethods = paymentMethods?.filter((method) =>
    method.currency.toLowerCase().includes(searchTerm.toLowerCase()) ||
    method.network.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  // Calculate statistics



  const handleCreatePaymentMethod = async (data: { currency: string; network: string; address: string }) => {
    setIsCreating(true);
    try {
      await createPaymentMethod(data);
    } finally {
      setIsCreating(false);
    }
  };

  const handleUpdatePaymentMethod = async (id: string, data: { currency: string; network: string; address: string }) => {
    await updatePaymentMethod(id, data);
  };

  const handleDeletePaymentMethod = async (id: string) => {
    await deletePaymentMethod(id);
  };

  return (
    <MainLayout title="Payment Methods" subtitle="Manage payment methods for deposits and withdrawals">

    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
     
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Payment Method</span>
        </button>
      </div>

     

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted w-4 h-4" />
        <input
          type="text"
          placeholder="Search payment methods..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 text-sm pr-4 py-2 border border-line rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background dark:bg-foreground text-main"
        />
      </div>

      {/* Payment Methods List */}
      <div className="space-y-4">
        {isLoadingPaymentMethods ? (
          // Loading skeleton
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-background dark:bg-secondary rounded-lg border border-line p-6 animate-pulse">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                  <div className="w-20 h-4 bg-gray-300 rounded"></div>
                </div>
                <div className="space-y-3">
                  <div className="w-24 h-4 bg-gray-300 rounded"></div>
                  <div className="w-32 h-4 bg-gray-300 rounded"></div>
                  <div className="w-full h-12 bg-gray-300 rounded"></div>
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                  <div className="w-16 h-8 bg-gray-300 rounded"></div>
                  <div className="w-16 h-8 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredPaymentMethods.length > 0 ? (
          // Payment methods grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPaymentMethods.map((method) => (
              <PaymentMethodCard
                key={method.id}
                paymentMethod={method}
                onUpdate={handleUpdatePaymentMethod}
                onDelete={handleDeletePaymentMethod}
                isLoading={false}
              />
            ))}
          </div>
        ) : (
          // Empty state
          <div className="text-center py-12">
            <Wallet size={48} className=" text-muted mx-auto mb-4" />
            <h3 className="text-lg font-medium text-main mb-2">
              {searchTerm ? "No payment methods found" : "No payment methods yet"}
            </h3>
            <p className="text-muted text-sm mb-6">
              {searchTerm 
                ? "Try adjusting your search terms" 
                : "Get started by adding your first payment method"
              }
            </p>
            {!searchTerm && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center space-x-2 mx-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Add Payment Method</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Add Payment Method Modal */}
      <AddPaymentMethodModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreatePaymentMethod}
        isLoading={isCreating}
      />
    </div>
    </MainLayout>
  );
}
