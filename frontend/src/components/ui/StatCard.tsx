import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changePercent?: number;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
}

export default function StatCard({ title, value, change, changePercent, icon: Icon, trend }: StatCardProps) {
  const getTrendColor = () => {
    if (trend === "up") return "text-green-600";
    if (trend === "down") return "text-red-600";
    return "text-gray-600";
  };

  const getChangeColor = () => {
    if (!changePercent) return "text-gray-600";
    return changePercent >= 0 ? "text-green-600" : "text-red-600";
  };

  return (
    <div className="bg-background dark:bg-secondary rounded-lg p-6 border border-line dark:border-line">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted">{title}</p>
          <p className="text-2xl font-bold text-main mt-1">{value}</p>
          {change && (
            <div className="flex items-center mt-2">
              <span className={`text-sm font-medium ${getChangeColor()}`}>
                {changePercent && changePercent >= 0 ? "+" : ""}{changePercent?.toFixed(2)}%
              </span>
              <span className={`text-sm ml-1 ${getChangeColor()}`}>
                ({change})
              </span>
            </div>
          )}
        </div>
        <div className={`h-14 w-14 center rounded-full bg-gray-100 dark:bg-foreground ${getTrendColor()}`}>
          <Icon size={20} className="text-primary" />
        </div>
      </div>
    </div>
  );
}
