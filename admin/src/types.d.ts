interface InputWithIconProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode;
  type: string;
  label?: string;
  error?: string;
}
interface InputWithoutIconProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  type: string;
  label?: string;
  error?: string;
}

interface ButtonWithLoaderProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  initialText: string;
  loadingText: string;
}

interface SelectWithIconProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  icon: React.ReactNode;
  label?: string;
  error?: string;
  defaultValue?: string;
  options: {
    label: string;
    value: string;
  }[];
}

interface SelectWithoutIconProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  defaultValue?: string;
  options: {
    label: string;
    value: string;
  }[];
}


interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  address: string;
  avatar?: string;
}

interface SecuritySettings {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  twoFactorEnabled: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
}

interface PreferencesSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
}

interface AccountInfo {
  accountId: string;
  memberSince: string;
  accountStatus: string;
}


interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city?: string;
  address?: string;
  avatar?: string;
  availableBalance: number;
  bonus: number;
  isActive: boolean;
  hasPendingWithdrawal: boolean;
  isAdmin: boolean;
  preferences: {
    emailNotifications: boolean;
    smsNotifications: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

interface ITransaction {
  id: string;
  user: IUser; 
  amount: number;
  type: "deposit" | "withdrawal" | "trade" | "profit_claim" | "fee";
  status: "completed" | "pending" | "failed" | "processing";
  description: string;
  method: string;
  recipient?: string;
  reference: string;
  receipt: {
    url: string;
    id: string;
  };
  fee: number;
  createdAt: Date; 
  updatedAt: Date; 
}

interface ITrade {
  id: string;
  user: IUser;
  symbol: string;
  name: string;
  investmentAmount: number;
  currentValue: number;
  status: "completed" | "running" | "paused";
  createdAt: string; 
  updatedAt: string;
}


interface IPaymentMethod {
  id: string;
  currency: string;
  network: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}
