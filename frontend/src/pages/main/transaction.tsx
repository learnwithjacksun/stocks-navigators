import { useState } from "react";
import { SelectWithoutIcon, TransactionCard } from '@/components/ui';
import { transactions } from '@/constants/dummy';
import { MainLayout } from '@/layouts';
import { 
  Filter, 
  Search, 
  TrendingUp,
  TrendingDown,
  DollarSign,
} from 'lucide-react';

export default function Transaction() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<'all' | 'deposit' | 'withdrawal' | 'trade' | 'profit_claim' | 'fee'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'pending' | 'processing' | 'failed'>('all');
  const [dateFilter, setDateFilter] = useState<'all' | 'today' | 'week' | 'month'>('all');

  const filteredTransactions = transactions.filter(transaction => {
    const searchMatch = searchTerm === "" || 
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.reference.toLowerCase().includes(searchTerm.toLowerCase());

    const typeMatch = typeFilter === 'all' || transaction.type === typeFilter;
    const statusMatch = statusFilter === 'all' || transaction.status === statusFilter;

    const dateMatch = (() => {
      if (dateFilter === 'all') return true;
      
      const transactionDate = new Date(transaction.createdAt);
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

      switch (dateFilter) {
        case 'today':
          return transactionDate >= today;
        case 'week':
          return transactionDate >= weekAgo;
        case 'month':
          return transactionDate >= monthAgo;
        default:
          return true;
      }
    })();

    return searchMatch && typeMatch && statusMatch && dateMatch;
  });

 

  const getTotalAmount = () => {
    return filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
  };



 



 

  return (
    <MainLayout title="Transaction History" subtitle="View and manage your transaction history">
      <div className="mt-10 space-y-6">
        {/* Header with Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-background dark:bg-secondary rounded-lg border border-line p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Total Transactions</div>
                <div className="text-xl font-semibold text-gray-900 dark:text-white">
                  {transactions.length}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-background dark:bg-secondary rounded-lg border border-line p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Total Inflow</div>
                <div className="text-xl font-semibold text-green-600">
                  ${transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0).toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-background dark:bg-secondary rounded-lg border border-line p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <TrendingDown className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Total Outflow</div>
                <div className="text-xl font-semibold text-red-600">
                  ${Math.abs(transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0)).toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          
        </div>

        {/* Search and Filters */}
        <div className="bg-background dark:bg-secondary rounded-lg border border-line p-6">
          <div className="flex flex-wrap lg:items-center lg:justify-between gap-4">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-line rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background dark:bg-foreground text-main"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex md:items-center flex-wrap gap-3">
              {/* Type Filter */}
              <SelectWithoutIcon
                   value={typeFilter}
                   defaultValue="Select Type"
                   onChange={(e) => setTypeFilter(e.target.value as typeof typeFilter )}
                   options={[
                    { label: 'All Types', value: 'all' },
                    { label: 'Deposits', value: 'deposit' },
                    { label: 'Withdrawals', value: 'withdrawal' },
                    { label: 'Trades', value: 'trade' },
                    { label: 'Profit Claims', value: 'profit_claim' },
                    { label: 'Fees', value: 'fee' }
                   ]}
                   />
              

              {/* Status Filter */}
              <SelectWithoutIcon
                value={statusFilter}
                defaultValue="Select Status"
                onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter )}
                options={[
                  { label: 'All Status', value: 'all' },
                  { label: 'Completed', value: 'completed' },
                  { label: 'Pending', value: 'pending' },
                  { label: 'Processing', value: 'processing' },
                  { label: 'Failed', value: 'failed' }
                ]}
              />
              

              {/* Date Filter */}
              <SelectWithoutIcon
                value={dateFilter}
                defaultValue="Select Date"
                onChange={(e) => setDateFilter(e.target.value as typeof dateFilter )}
                options={[
                  { label: 'All Time', value: 'all' },
                  { label: 'Today', value: 'today' },
                  { label: 'This Week', value: 'week' },
                  { label: 'This Month', value: 'month' }
                ]}
              />


              {/* Export Button */}
            </div>
             
          </div>
        </div>

        {/* Filtered Results Summary */}
        {filteredTransactions.length > 0 && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex md:items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  Showing {filteredTransactions.length} of {transactions.length} transactions
                </span>
              </div>
              <div className="text-sm text-blue-800 dark:text-blue-200">
                Net Amount: <span className="font-medium">${getTotalAmount().toLocaleString()}</span>
               
              </div>
            </div>
          </div>
        )}

        {/* Transactions Grid */}
        {filteredTransactions.length > 0 ? (
          <div className="grid grid-cols-1 gap-2">
            {filteredTransactions.map((transaction) => (
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
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Try adjusting your search or filters
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setTypeFilter('all');
                setStatusFilter('all');
                setDateFilter('all');
              }}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        
      </div>
    </MainLayout>
  );
}
