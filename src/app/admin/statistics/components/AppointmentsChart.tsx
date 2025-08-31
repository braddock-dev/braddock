"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface AppointmentsChartProps {
  data: Array<{ date: string; appointments: number }> | null;
}

export default function AppointmentsChart({ data }: AppointmentsChartProps) {
  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Agendamentos</CardTitle>
          <CardDescription>Visão geral dos agendamentos por data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-48 text-gray-500">Nenhum dado disponível para exibir</div>
        </CardContent>
      </Card>
    );
  }

  // Transform data for the chart
  const chartData = data.map((item) => ({
    date: new Date(item.date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
    }),
    appointments: item.appointments,
    originalDate: item.date,
  }));

  // Check if today's data exists to highlight it
  const today = new Date().toISOString().split("T")[0];
  const todayData = data.find((item) => item.date === today);

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="1 1" />
          <XAxis dataKey="date" className="text-xs" tick={{ fontSize: 12 }} />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <ChartTooltipContent
                    label="Agendamentos"
                    payload={payload.map((item: any) => ({
                      name: "Agendamentos",
                      value: item.value,
                      fill: item.payload.originalDate === today ? "#8B4513" : "#6B7280",
                    }))}
                    indicator="line"
                  />
                );
              }
              return null;
            }}
          />
          <Bar
            dataKey="appointments"
            radius={[4, 4, 0, 0]}
            className="fill-muted-foreground/20 hover:fill-muted-foreground/40 transition-colors"
            fill="#734434"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
