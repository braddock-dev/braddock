interface TreatmentsChartProps {
  data: Array<{ name: string; count: number }>;
}

export default function TreatmentsChart({ data }: TreatmentsChartProps) {
  if (!data || data.length === 0) {
    return <div className="flex items-center justify-center h-48 text-gray-500">Nenhum dado disponível para exibir</div>;
  }

  const maxCount = Math.max(...data.map((d) => d.count));
  const maxWidth = 200;

  return (
    <div className="space-y-3">
      {data.map((treatment, index) => {
        const width = maxCount > 0 ? (treatment.count / maxCount) * maxWidth : 0;

        return (
          <div key={index} className="flex items-center gap-3">
            <div className="w-24 text-sm font-medium text-gray-700 truncate">{treatment.name}</div>
            <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
              <div className="bg-brown h-6 rounded-full transition-all duration-500 ease-out" style={{ width: `${width}px` }} />
              <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs font-medium text-white">{treatment.count}</span>
            </div>
          </div>
        );
      })}
      <div className="flex justify-between text-xs text-gray-400 mt-4 pt-2 border-t">
        <span>0</span>
        <span>{Math.round(maxCount / 2)}</span>
        <span>{maxCount}</span>
      </div>
    </div>
  );
}
