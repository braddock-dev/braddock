interface AppointmentsChartProps {
  data: Array<{ date: string; appointments: number }> | null;
}

export default function AppointmentsChart({ data }: AppointmentsChartProps) {
  if (!data || data.length === 0) {
    return <div className="flex items-center justify-center h-48 text-gray-500">Nenhum dado disponível para exibir</div>;
  }

  const maxAppointments = Math.max(...data.map((d) => d.appointments));
  const maxHeight = 120;

  return (
    <div className="h-48">
      <div className="flex items-end justify-between h-full gap-1">
        {data.map((item, index) => {
          const height = maxAppointments > 0 ? (item.appointments / maxAppointments) * maxHeight : 0;
          const isToday = new Date().toISOString().split("T")[0] === item.date;

          return (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="relative group">
                <div
                  className={`w-full rounded-t transition-all duration-200 ${isToday ? "bg-brown" : "bg-gray-300 hover:bg-gray-400"}`}
                  style={{ height: `${Math.max(height, 4)}px` }}
                />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                  {new Date(item.date).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })}: {item.appointments} agendamentos
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
        <span>{maxAppointments}</span>
        <span>{Math.round(maxAppointments / 2)}</span>
        <span>0</span>
      </div>
    </div>
  );
}
