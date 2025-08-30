"use client";

import * as React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface TopOperatorsChartProps {
  data: Array<{ name: string; count: number }>;
}

export default function TopOperatorsChart({ data }: TopOperatorsChartProps) {
  if (!data || data.length === 0) {
    return <div className="flex items-center justify-center h-48 text-gray-500">Nenhum dado disponível para exibir</div>;
  }

  // Prepare data for the pie chart
  const chartData = data.map((operator, index) => ({
    name: operator.name,
    value: operator.count,
    fill: getOperatorColor(index),
  }));

  // Generate colors for operators
  function getOperatorColor(index: number): string {
    const colors = [
      "#734434", // Brown (primary brand color)
      "#b47866", // Brown01
      "#735f5f", // Brown02
      "#d9b384", // Light brown
      "#ECE1CD", // Light brown01
    ];
    return colors[index % colors.length];
  }

  return (
    <div className="space-y-4">
      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={chartData} cx="50%" cy="50%" innerRadius={20} outerRadius={110} paddingAngle={0} dataKey="value">
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                      <div className="font-medium text-gray-900">{payload[0].name}</div>
                      <div className="text-sm text-gray-600">{payload[0].value} agendamentos</div>
                    </div>
                  );
                }
                return null;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {chartData.map((item, index) => (
          <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }} />
            <span className="text-sm text-gray-700 font-medium">{item.name}</span>
            <span className="text-xs text-gray-500">({item.value})</span>
          </div>
        ))}
      </div>
    </div>
  );
}
