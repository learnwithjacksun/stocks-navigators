import { TransactionCard, TransactionSkeleton } from "@/components/ui";
import { useTransactions, useUsers } from "@/hooks";
import { MainLayout } from "@/layouts";
import { Search } from "lucide-react";
import { useParams } from "react-router-dom";

export default function UserTransactions() {
  const {id} = useParams();
  const {users} = useUsers();
  const user = users?.find((user) => user.id === id);
  const {transactions, isLoadingTransactions} = useTransactions();
  const userTransactions = transactions?.filter((transaction) => transaction.user.id === id);
  return (
    <MainLayout title={`${user?.firstName}'s Transaction History`} subtitle="View and manage user transactions">
      <div className="mt-10 space-y-6">
        {/* Loading State */}
        {isLoadingTransactions && (
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <TransactionSkeleton key={index} />
            ))}
          </div>
        )}

        {/* Content when not loading */}
        {!isLoadingTransactions && (
          <>
        

        {/* Transactions Grid */}
          {userTransactions && userTransactions?.length > 0 ? (
          <div className="grid grid-cols-1 gap-2">
            {userTransactions?.map((transaction) => (
              <TransactionCard
                key={transaction.id}
                transaction={transaction}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No transactions found
            </h3>
           
            
          </div>
        )}
          </>
        )}

        
      </div>
    </MainLayout>
  )
}
