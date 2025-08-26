export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
}






// Dummy recent trades
export const trades = [
  {
    id: '1',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    type: 'gain',
    price: 175.43,
    profit: 1754.30,
    createdAt: '2024-01-15T10:30:00Z',
    status: 'running',
    investmentAmount: 10000,
    currentValue: 11754.30,
    profitPercentage: 17.54,
    canClaim: true,
  },
  {
    id: '2',
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    type: 'loss',   
    price: 142.56,
    profit: -712.80,
    createdAt: '2024-01-14T14:20:00Z',
    status: 'running',
    investmentAmount: 5000,
    currentValue: 4287.20,
    profitPercentage: -14.26,
    canClaim: false,
  },
  {
    id: '3',
    symbol: 'MSFT',
    name: 'Microsoft Corporation',  
    type: 'gain',
    price: 378.85,
    profit: 5682.75,
    createdAt: '2024-01-13T09:15:00Z',
    status: 'completed',
    investmentAmount: 15000,
    currentValue: 20682.75,
    profitPercentage: 37.89,
    canClaim: true,
  },
  {
    id: '4',
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    type: 'gain',
    price: 248.42,
    profit: 1987.36,
    createdAt: '2024-01-12T16:45:00Z',
    status: 'running',
    investmentAmount: 8000,
    currentValue: 9987.36,
    profitPercentage: 24.84,
    canClaim: true,
  },
  {
    id: '5',
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    type: 'gain',
    price: 485.09,
    profit: 2425.45,
    createdAt: '2024-01-11T11:20:00Z',
    status: 'paused',
    investmentAmount: 12000,
    currentValue: 14425.45,
    profitPercentage: 20.21,
    canClaim: false,
  },
  {
    id: '6',
    symbol: 'META',
    name: 'Meta Platforms Inc.',
    type: 'loss',
    price: 378.76,
    profit: -756.52,
    createdAt: '2024-01-10T13:45:00Z',
    status: 'running',
    investmentAmount: 6000,
    currentValue: 5243.48,
    profitPercentage: -12.61,
    canClaim: false,
  },
];




export const paymentMethods: IPaymentMethod[] = [
    {
      id: "1",
      currency: "Bitcoin",
      network: "BTC",
      address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-01-15T10:30:00Z"
    },
    {
      id: "2",
      currency: "Ethereum",
      network: "ERC-20",
      address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-01-15T10:30:00Z"
    },
    {
      id: "3",
      currency: "Tether",
      network: "TRC-20",
      address: "TX7s4aD4Vf4k7rH4fZPj6cvMqg8Lh2kPKP",
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-01-15T10:30:00Z"
    },
    {
      id: "4",
      currency: "Litecoin",
      network: "LTC",
      address: "ltc1qg0h7cvk7rzhh3n7t3kcs0jf0c9g6wj2r8fq2c4",
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-01-15T10:30:00Z"
    }
  ];

  export const tradingAssets = [
    {
      id: "1",
      symbol: "AAPL",
      name: "Apple Inc.",
      category: "Technology",
      minAmount: 200,
      maxAmount: 100000,
      volatility: "Medium",
      description: "Leading technology company specializing in consumer electronics"
    },
    {
      id: "2",
      symbol: "TSLA",
      name: "Tesla Inc.",
      category: "Automotive",
      minAmount: 200,
      maxAmount: 100000,
      volatility: "High",
      description: "Electric vehicle and clean energy company"
    },
    {
      id: "3",
      symbol: "MSFT",
      name: "Microsoft Corporation",
      category: "Technology",
      minAmount: 200,
      maxAmount: 100000,
      volatility: "Low",
      description: "Global technology leader in software and cloud services"
    },
    {
      id: "4",
      symbol: "GOOGL",
      name: "Alphabet Inc.",
      category: "Technology",
      minAmount: 200,
      maxAmount: 100000,
      volatility: "Medium",
      description: "Parent company of Google and other technology ventures"
    },
    {
      id: "5",
      symbol: "AMZN",
      name: "Amazon.com Inc.",
      category: "E-commerce",
      minAmount: 200,
      maxAmount: 100000,
      volatility: "Medium",
      description: "Global e-commerce and cloud computing giant"
    },
    {
      id: "6",
      symbol: "NVDA",
      name: "NVIDIA Corporation",
      category: "Technology",
      minAmount: 200,
      maxAmount: 100000,
      volatility: "High",
      description: "Leading graphics processing and AI technology company"
    },
    {
      id: "7",
      symbol: "META",
      name: "Meta Platforms Inc.",
      category: "Technology",
      minAmount: 200,
      maxAmount: 100000,
      volatility: "High",
      description: "Social media and virtual reality technology company"
    },
    {
      id: "8",
      symbol: "NFLX",
      name: "Netflix Inc.",
      category: "Entertainment",
      minAmount: 200,
      maxAmount: 100000,
      volatility: "High",
      description: "Global streaming entertainment service"
    },
    {
      id: "9",
      symbol: "JPM",
      name: "JPMorgan Chase & Co.",
      category: "Finance",
      minAmount: 200,
      maxAmount: 100000,
      volatility: "Low",
      description: "Leading global financial services firm"
    },
    {
      id: "10",
      symbol: "JNJ",
      name: "Johnson & Johnson",
      category: "Healthcare",
      minAmount: 200,
      maxAmount: 100000,
      volatility: "Low",
      description: "Global healthcare and pharmaceutical company"
    }
  ];

export interface TradingAsset {
  id: string;
  symbol: string;
  name: string;
  category: string;
  minAmount: number;
  maxAmount: number;
  volatility: string;
  description: string;
}

export interface Transaction {
  id: string;
  type: "deposit" | "withdrawal" | "trade" | "profit_claim" | "fee";
  status: "completed" | "pending" | "failed" | "processing";
  amount: number;
  currency: string;
  description: string;
  reference: string;
  createdAt: string;
  completedAt?: string;
  fee?: number;
  method?: string;
  asset?: string;
  tradeId?: string;
}

export const transactions: Transaction[] = [
  {
    id: "TXN-001",
    type: "deposit",
    status: "completed",
    amount: 5000,
    currency: "USD",
    description: "Deposit via Bitcoin",
    reference: "BTC-2024-001",
    createdAt: "2024-01-15T10:30:00Z",
    completedAt: "2024-01-15T10:35:00Z",
    method: "Bitcoin",
    fee: 0
  },
  {
    id: "TXN-002",
    type: "trade",
    status: "completed",
    amount: 10000,
    currency: "USD",
    description: "Trade: AAPL - Buy",
    reference: "TRD-2024-001",
    createdAt: "2024-01-15T11:00:00Z",
    completedAt: "2024-01-15T11:01:00Z",
    asset: "AAPL",
    tradeId: "TRD-2024-001",
    fee: 25
  },
  {
    id: "TXN-003",
    type: "profit_claim",
    status: "completed",
    amount: 1754.30,
    currency: "USD",
    description: "Profit claim from AAPL trade",
    reference: "PROFIT-2024-001",
    createdAt: "2024-01-16T14:20:00Z",
    completedAt: "2024-01-16T14:22:00Z",
    asset: "AAPL",
    tradeId: "TRD-2024-001",
    fee: 0
  },
  {
    id: "TXN-004",
    type: "withdrawal",
    status: "pending",
    amount: 2000,
    currency: "USD",
    description: "Withdrawal to Bank Account",
    reference: "WTH-2024-001",
    createdAt: "2024-01-17T09:15:00Z",
    method: "Bank Transfer",
    fee: 10
  },
  {
    id: "TXN-005",
    type: "trade",
    status: "completed",
    amount: 8000,
    currency: "USD",
    description: "Trade: TSLA - Buy",
    reference: "TRD-2024-002",
    createdAt: "2024-01-17T15:45:00Z",
    completedAt: "2024-01-17T15:46:00Z",
    asset: "TSLA",
    tradeId: "TRD-2024-002",
    fee: 20
  },
  {
    id: "TXN-006",
    type: "deposit",
    status: "processing",
    amount: 3000,
    currency: "USD",
    description: "Deposit via Ethereum",
    reference: "ETH-2024-001",
    createdAt: "2024-01-18T12:30:00Z",
    method: "Ethereum",
    fee: 0
  },
  {
    id: "TXN-007",
    type: "fee",
    status: "completed",
    amount: -25,
    currency: "USD",
    description: "Trading fee for AAPL transaction",
    reference: "FEE-2024-001",
    createdAt: "2024-01-15T11:01:00Z",
    completedAt: "2024-01-15T11:01:00Z",
    fee: 25
  },
  {
    id: "TXN-008",
    type: "profit_claim",
    status: "completed",
    amount: 1987.36,
    currency: "USD",
    description: "Profit claim from TSLA trade",
    reference: "PROFIT-2024-002",
    createdAt: "2024-01-19T16:20:00Z",
    completedAt: "2024-01-19T16:22:00Z",
    asset: "TSLA",
    tradeId: "TRD-2024-002",
    fee: 0
  },
  {
    id: "TXN-009",
    type: "withdrawal",
    status: "failed",
    amount: 1500,
    currency: "USD",
    description: "Withdrawal to Crypto Wallet",
    reference: "WTH-2024-002",
    createdAt: "2024-01-20T10:00:00Z",
    method: "Bitcoin",
    fee: 5
  },
  {
    id: "TXN-010",
    type: "trade",
    status: "completed",
    amount: 12000,
    currency: "USD",
    description: "Trade: NVDA - Buy",
    reference: "TRD-2024-003",
    createdAt: "2024-01-21T13:15:00Z",
    completedAt: "2024-01-21T13:16:00Z",
    asset: "NVDA",
    tradeId: "TRD-2024-003",
    fee: 30
  }
];