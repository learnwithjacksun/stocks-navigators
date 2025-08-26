import { useState } from "react";
import { AdminTradeCard, SelectWithoutIcon } from '@/components/ui';
import { MainLayout } from '@/layouts';
import { Plus, Filter, TrendingUp, Play, TrendingDown, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTrades } from "@/hooks";

export default function Trades() {
  const { trades,  isLoadingTrades } = useTrades();
  const [filter, setFilter] = useState<'all' | 'running' | 'completed' | 'paused'>('all');
  const [profitFilter, setProfitFilter] = useState<'all' | 'profit' | 'loss'>('all');

  const filteredTrades = trades?.filter(trade => {
    const statusMatch = filter === 'all' || trade.status === filter;
    const profitMatch = profitFilter === 'all' || 
      (profitFilter === 'profit' && trade.currentValue > trade.investmentAmount) || 
      (profitFilter === 'loss' && trade.currentValue < trade.investmentAmount);
    
    return statusMatch && profitMatch;
  });

 

  const getStatusCount = (status: string) => {
    return trades?.filter(trade => trade.status === status).length;
  };

  const getProfitCount = (type: 'profit' | 'loss') => {
    return trades?.filter(trade => 
      type === 'profit' ? trade.currentValue > trade.investmentAmount : trade.currentValue < trade.investmentAmount
    ).length;
  };

  return (
    <MainLayout title='Current Trades' subtitle='View and manage your active trades'>
      <div className="mt-10 space-y-6">
        {/* Header with Stats */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <Link to='/trades/new'>
              <button className="btn-primary w-fit text-sm px-4 py-2 rounded-md">
                <Plus size={16} />
                Start New Trade
              </button>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <Play className="w-4 h-4 text-green-600" />
              <span className="text-gray-600 dark:text-gray-400">Running:</span>
              <span className="font-medium text-gray-900 dark:text-white">{getStatusCount('running')}</span>
            </div>
           
            <div className="flex items-center space-x-1">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-gray-600 dark:text-gray-400">Profitable:</span>
              <span className="font-medium text-gray-900 dark:text-white">{getProfitCount('profit')}</span>
            </div>
            <div className="flex items-center space-x-1">
              <TrendingDown className="w-4 h-4 text-red-600" />
              <span className="text-gray-600 dark:text-gray-400">Loss:</span>
              <span className="font-medium text-gray-900 dark:text-white">{getProfitCount('loss')}</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-background dark:bg-secondary rounded-lg border border-line p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filters:</span>
            </div>
            
            <div className="flex flex-wrap gap-4">
              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <SelectWithoutIcon
                className="bg-secondary px-6"
                defaultValue="Filter Status"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as 'all' | 'running' | 'completed' | 'paused')}
                  options={[
                    { label: 'All Status', value: 'all' },
                    { label: 'Running', value: 'running' },
                    { label: 'Completed', value: 'completed' },
                    { label: 'Paused', value: 'paused' }
                  ]}
                />
               
              </div>

              {/* Profit Filter */}
              <div className="flex items-center gap-2">
                <SelectWithoutIcon
                className="bg-secondary px-6"
                  defaultValue="Filter Performance"
                  value={profitFilter}
                  onChange={(e) => setProfitFilter(e.target.value as 'all' | 'profit' | 'loss')}
                  options={[
                    { label: 'All Performance', value: 'all' },
                    { label: 'Profitable', value: 'profit' },
                    { label: 'Loss', value: 'loss' }
                  ]}
                />
                
              </div>
            </div>
          </div>
        </div>

        {isLoadingTrades && !filteredTrades && (
          <div className="h-40 center gap-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Loading trades...
            </h3>
            <Loader className="animate-spin" /> 
          </div>
        )}

        {/* Trades Grid */}
        {filteredTrades && filteredTrades.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTrades?.map((trade) => (
              <AdminTradeCard
                key={trade.id}
                trade={trade}
              
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No trades found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Try adjusting your filters or start a new trade
            </p>
            <Link to='/trades/new'>
              <button className="btn-primary px-4 py-2 rounded-md">
                <Plus size={16} className="mr-2" />
                Start New Trade
              </button>
            </Link>
          </div>
        )}

        {/* Summary Stats */}
        {filteredTrades && filteredTrades.length > 0 && (
          <div className="bg-background dark:bg-secondary rounded-lg border border-line p-6">
          
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {filteredTrades?.length}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Total Trades</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">
                  ${filteredTrades?.filter(t => t.currentValue > t.investmentAmount)
                    .reduce((sum, t) => sum + t.currentValue, 0)
                    .toLocaleString()}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Total Profit</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-red-600">
                  ${Math.abs(filteredTrades?.filter(t => t.currentValue < t.investmentAmount)
                    .reduce((sum, t) => sum + t.currentValue, 0))
                    .toLocaleString()}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Total Loss</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  ${filteredTrades?.reduce((sum, t) => sum + t.currentValue, 0)
                    .toLocaleString()}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Current Value</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
