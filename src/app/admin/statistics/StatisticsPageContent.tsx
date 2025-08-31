"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAppointments } from "@/app/backend/actions/appointmentActions";
import { getTreatmentsList } from "@/app/backend/actions/treatmentsActions";
import { getOperators } from "@/app/backend/actions/operatorActions";
import { IAppointment } from "@/app/backend/business/treatments/data/AppointmentData";

interface DayAppointments {
  day: string;
  dayInMillis: number;
  appointments: IAppointment[];
}
import { getFutureXDaysDate, getPastXDaysDate } from "@/app/utils/functions";
import dayjs from "@/app/utils/dayjs";
import StatisticsCard from "./components/StatisticsCard";
import AppointmentsChart from "@/app/admin/statistics/components/AppointmentsChart";
import TreatmentsChart from "@/app/admin/statistics/components/TreatmentsChart";
import RevenueChart from "@/app/admin/statistics/components/RevenueChart";
import TopOperatorsChart from "@/app/admin/statistics/components/TopOperatorsChart";
import DateRangePicker from "@/app/admin/statistics/components/DateRangePicker";
import { AppointmentStatus } from "@/app/backend/business/treatments/data/AppointmentData";

export default function StatisticsPageContent() {
  const [dateRange, setDateRange] = useState({
    startDate: getPastXDaysDate(6),
    endDate: getFutureXDaysDate(0),
  });

  const filter = useMemo(
    () => ({
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
    }),
    [dateRange]
  );

  const { data: appointments, isLoading: appointmentsLoading } = useQuery({
    queryKey: ["appointments", filter],
    queryFn: () => getAppointments(filter),
  });

  const { data: treatments, isLoading: treatmentsLoading } = useQuery({
    queryKey: ["treatments"],
    queryFn: () => getTreatmentsList(),
  });

  const { data: operators, isLoading: operatorsLoading } = useQuery({
    queryKey: ["operators"],
    queryFn: () => getOperators(),
  });

  const isLoading = appointmentsLoading || treatmentsLoading || operatorsLoading;

  const statistics = useMemo(() => {
    if (!appointments || !treatments || !operators) return null;

    const flatAppointments = appointments || [];

    // Total appointments
    const totalAppointments = flatAppointments.length;

    // Completed appointments
    const completedAppointments = flatAppointments.filter((apt) => apt.state !== AppointmentStatus.CUSTOMER_DID_NOT_APPEAR).length;

    // No-show appointments
    const noShowAppointments = totalAppointments - completedAppointments;

    // Total revenue (if prices are available) - for now showing 0 since prices aren't in mock data
    const totalRevenue = flatAppointments.reduce((total, apt) => {
      const appointmentRevenue =
        apt.treatments?.reduce((treatmentTotal, treatment) => {
          return treatmentTotal + (treatment.price || 0);
        }, 0) || 0;
      return total + appointmentRevenue;
    }, 0);

    // Average appointment duration
    const totalDuration = flatAppointments.reduce((total, apt) => {
      return total + (apt.durationInMinutes || 0);
    }, 0);
    const averageDuration = totalAppointments > 0 ? totalDuration / totalAppointments : 0;

    // Most popular treatments
    const treatmentCounts: Record<string, number> = {};
    flatAppointments.forEach((apt) => {
      apt.treatments?.forEach((treatment) => {
        treatmentCounts[treatment.name] = (treatmentCounts[treatment.name] || 0) + 1;
      });
    });

    const topTreatments = Object.entries(treatmentCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));

    // Appointments by operator
    const operatorAppointments: Record<string, number> = {};
    flatAppointments.forEach((apt) => {
      if (apt.operatorId) {
        operatorAppointments[apt.operatorId] = (operatorAppointments[apt.operatorId] || 0) + 1;
      }
    });

    const topOperators = Object.entries(operatorAppointments)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([operatorId, count]) => {
        const operator = operators.find((op) => op.id === operatorId);
        return { name: operator?.name || "Unknown", count };
      });

    return {
      totalAppointments,
      completedAppointments,
      noShowAppointments,
      totalRevenue,
      averageDuration,
      topTreatments,
      topOperators,
      completionRate: totalAppointments > 0 ? (completedAppointments / totalAppointments) * 100 : 0,
      noShowRate: totalAppointments > 0 ? (noShowAppointments / totalAppointments) * 100 : 0,
    };
  }, [appointments, treatments, operators]);

  const chartData = useMemo(() => {
    if (!appointments) return null;

    // Group appointments by date for the chart
    const appointmentsByDate: Record<string, number> = {};

    appointments.forEach((appointment) => {
      const dateKey = dayjs(appointment.startTimeInMillis).format("YYYY-MM-DD");
      appointmentsByDate[dateKey] = (appointmentsByDate[dateKey] || 0) + 1;
    });

    // Fill in missing dates with 0
    const startDate = dayjs(dateRange.startDate);
    const endDate = dayjs(dateRange.endDate);
    const dates: string[] = [];

    for (let date = startDate; date.isBefore(endDate) || date.isSame(endDate, "day"); date = date.add(1, "day")) {
      dates.push(dayjs(date).format("YYYY-MM-DD"));
    }

    return dates.map((date) => ({
      date,
      appointments: appointmentsByDate[date] || 0,
    }));
  }, [appointments, dateRange]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full w-full p-80">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brown"></div>
      </div>
    );
  }

  if (!statistics) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Nenhum dado disponível para exibir estatísticas.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Estatísticas</h1>
          <p className="text-gray-600">Visão geral dos agendamentos e desempenho do negócio</p>
        </div>
        <DateRangePicker startDate={dateRange.startDate} endDate={dateRange.endDate} onDateChange={setDateRange} />
      </div>

      {/* Summary Section */}
      <div className="bg-gradient-to-r from-brown to-brown01 text-white p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Resumo do Período</h2>
        <p className="text-white/90">
          Período selecionado: {dayjs(dateRange.startDate).format("DD/MM/YYYY")} - {dayjs(dateRange.endDate).format("DD/MM/YYYY")}
        </p>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-white/80">Total de Agendamentos</p>
            <p className="text-2xl font-bold">{statistics.totalAppointments}</p>
          </div>
          <div>
            <p className="text-sm text-white/80">Taxa de Conclusão</p>
            <p className="text-2xl font-bold">{statistics.completionRate.toFixed(1)}%</p>
          </div>
          <div>
            <p className="text-sm text-white/80">Taxa de Ausência</p>
            <p className="text-2xl font-bold">{statistics.noShowRate.toFixed(1)}%</p>
          </div>
          <div>
            <p className="text-sm text-white/80">Duração Média</p>
            <p className="text-2xl font-bold">{statistics.averageDuration.toFixed(0)}min</p>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatisticsCard
          title="Total de Agendamentos"
          value={statistics.totalAppointments}
          icon="📅"
          trend="up"
          trendValue={`${statistics.completionRate.toFixed(1)}%`}
          trendLabel="Taxa de Conclusão"
        />
        <StatisticsCard
          title="Agendamentos Concluídos"
          value={statistics.completedAppointments}
          icon="✅"
          trend="up"
          trendValue={`${statistics.completionRate.toFixed(1)}%`}
          trendLabel="Taxa de Sucesso"
        />
        <StatisticsCard
          title="Não Compareceram"
          value={statistics.noShowAppointments}
          icon="❌"
          trend="down"
          trendValue={`${statistics.noShowRate.toFixed(1)}%`}
          trendLabel="Taxa de Ausência"
        />
        <StatisticsCard
          title="Receita Total"
          value={statistics.totalRevenue > 0 ? `€${statistics.totalRevenue.toFixed(2)}` : "€0.00"}
          icon="💰"
          trend="up"
          trendValue={`${statistics.averageDuration.toFixed(0)}min`}
          trendLabel="Duração Média"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Agendamentos por Dia</h3>
          <AppointmentsChart data={chartData} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tratamentos Mais Populares</h3>
          <TreatmentsChart data={statistics.topTreatments} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Operadores</h3>
          <TopOperatorsChart data={statistics.topOperators} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Receita por Período</h3>
          <RevenueChart data={chartData} appointments={appointments || []} />
        </div>
      </div>

      {/* Treatment Insights */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Insights dos Tratamentos</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Tratamento Mais Popular</h4>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{statistics.topTreatments[0]?.count || 0}</div>
              <div className="text-sm text-blue-600">{statistics.topTreatments[0]?.name || "N/A"}</div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-700 mb-2">Duração Total</h4>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{Math.round((statistics.averageDuration * statistics.totalAppointments) / 60)}h</div>
              <div className="text-sm text-green-600">Tempo total agendado</div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-700 mb-2">Eficiência</h4>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{statistics.completionRate.toFixed(1)}%</div>
              <div className="text-sm text-purple-600">Taxa de conclusão</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
