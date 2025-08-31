interface StatisticsCardProps {
  title: string;
  value: string | number;
  icon: string;
  trend: "up" | "down" | "neutral";
  trendValue: string;
  trendLabel: string;
}

export default function StatisticsCard({ title, value, icon, trend, trendValue, trendLabel }: StatisticsCardProps) {
  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-green-600";
      case "down":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return "↗";
      case "down":
        return "↘";
      default:
        return "→";
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          <div className="flex items-center gap-2 mt-3">
            <span className={`text-sm font-medium ${getTrendColor()}`}>
              {getTrendIcon()} {trendValue}
            </span>
            <span className="text-xs text-gray-500">{trendLabel}</span>
          </div>
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
    </div>
  );
}
