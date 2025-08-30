import dayjs from "@/app/utils/dayjs";

interface RevenueChartProps {
  data: Array<{ date: string; appointments: number }> | null;
  appointments: any[] | null;
}

export default function RevenueChart({ data, appointments }: RevenueChartProps) {
  if (!data || !appointments || data.length === 0) {
    return <div className="flex items-center justify-center h-48 text-gray-500">Nenhum dado disponível para exibir</div>;
  }

  const hasPriceData = appointments.some((day) => day.appointments?.some((apt) => apt.treatments?.some((treatment) => treatment.price)));

  if (!hasPriceData) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-500">
        <div className="text-center">
          <p>Dados de preço não disponíveis</p>
          <p className="text-sm text-gray-400 mt-1">Configure preços nos serviços para ver a receita</p>
        </div>
      </div>
    );
  }

  const revenueData = data.map((item) => {
    const dateAppointments = appointments.find((day) => dayjs(day.dayInMillis).format("YYYY-MM-DD") === item.date)?.appointments || [];
    const dayRevenue = dateAppointments.reduce((total: number, apt: any) => {
      const appointmentRevenue =
        apt.treatments?.reduce((treatmentTotal: number, treatment: any) => {
          return treatmentTotal + (treatment.price || 0);
        }, 0) || 0;
      return total + appointmentRevenue;
    }, 0);
    return { date: item.date, revenue: dayRevenue };
  });

  const maxRevenue = Math.max(...revenueData.map((d) => d.revenue));
  const maxHeight = 120;

  return (
    <div className="h-48">
      <div className="flex items-end justify-between h-full gap-1">
        {revenueData.map((item, index) => {
          const height = maxRevenue > 0 ? (item.revenue / maxRevenue) * maxHeight : 0;
          const isToday = new Date().toISOString().split("T")[0] === item.date;

          return (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="relative group">
                <div
                  className={`w-full rounded-t transition-all duration-200 ${isToday ? "bg-green-500" : "bg-green-400 hover:bg-green-500"}`}
                  style={{ height: `${Math.max(height, 4)}px` }}
                />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                  {new Date(item.date).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })}: €{item.revenue.toFixed(2)}
                </div>
              </div>
              <span className="text-xs text-gray-500 mt-2 text-center">
                {new Date(item.date).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })}
              </span>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between text-xs text-gray-400 mt-2">
        <span>€{maxRevenue.toFixed(2)}</span>
        <span>€{(maxRevenue / 2).toFixed(2)}</span>
        <span>€0.00</span>
      </div>
    </div>
  );
}
