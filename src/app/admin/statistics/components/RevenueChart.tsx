"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

import { ChartTooltipContent } from "@/components/ui/chart";
import { IAppointment } from "@/app/backend/business/treatments/data/AppointmentData";
import { ITreatment } from "@/app/backend/business/treatments/data/TreatmentsData";
import dayjs from "@/app/utils/dayjs";

interface RevenueChartProps {
  data: Array<{ date: string; appointments: number }> | null;
  appointments: IAppointment[] | null;
}

export default function RevenueChart({ data, appointments }: RevenueChartProps) {
  if (!data || !appointments || data.length === 0) {
    return <div className="flex items-center justify-center h-48 text-gray-500">Nenhum dado disponível para exibir</div>;
  }

  const hasPriceData = appointments.some((apt) => apt.treatments?.some((treatment) => treatment.price));

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

  // Calculate revenue data for each date
  const revenueData = data.map((item) => {
    const dateAppointments = appointments.filter((day) => dayjs(day.dayInMillis).format("YYYY-MM-DD") === item.date);
    const dayRevenue = dateAppointments.reduce((total: number, apt: IAppointment) => {
      const appointmentRevenue =
        apt.treatments?.reduce((treatmentTotal: number, treatment: ITreatment) => {
          return treatmentTotal + (treatment.price || 0);
        }, 0) || 0;
      return total + appointmentRevenue;
    }, 0);
    return {
      date: new Date(item.date).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }),
      revenue: dayRevenue,
      originalDate: item.date,
    };
  });

  // Check if today's data exists to highlight it
  const today = new Date().toISOString().split("T")[0];
  const todayData = revenueData.find((item) => item.originalDate === today);

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={revenueData}>
          <CartesianGrid strokeDasharray="1 1" />
          <XAxis dataKey="date" className="text-xs" tick={{ fontSize: 12 }} />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <ChartTooltipContent
                    label="Receita"
                    payload={payload.map((item: any) => ({
                      name: "Receita",
                      value: `€${item.value}`,
                      fill: item.payload.originalDate === today ? "#10B981" : "#6B7280",
                    }))}
                    indicator="line"
                  />
                );
              }
              return null;
            }}
          />
          <Bar
            dataKey="revenue"
            radius={[4, 4, 0, 0]}
            className="fill-muted-foreground/20 hover:fill-muted-foreground/40 transition-colors"
            fill="#734434"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
