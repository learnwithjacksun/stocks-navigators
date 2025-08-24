import { useState } from "react";
import { DollarSign } from "lucide-react";

interface AmountInputProps {
  value: string;
  onChange: (value: string) => void;
  currency?: string;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
}

export default function AmountInput({
  value,
  onChange,
  placeholder = "0.00",
  label = "Amount",
  error,
  disabled = false
}: AmountInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    // Only allow numbers and decimal point
    if (/^\d*\.?\d{0,2}$/.test(input) || input === '') {
      onChange(input);
    }
  };



  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-muted">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <DollarSign className="h-5 w-5 text-muted" />
        </div>
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          disabled={disabled}
          className={`block w-full pl-10 pr-12 py-3 border rounded-lg placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary disabled:bg-gray-50 disabled:text-muted text-muted ${
            error 
              ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
              : isFocused 
                ? 'border-primary' 
                : 'border-line'
          } bg-white dark:bg-foreground text-gray-900 dark:text-white`}
        />
        
      </div>
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}
