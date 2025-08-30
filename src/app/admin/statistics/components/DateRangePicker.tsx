"use client";

import { useState } from "react";
import dayjs from "@/app/utils/dayjs";
import { Calendar, X } from "lucide-react";

interface DateRangePickerProps {
  startDate: number;
  endDate: number;
  onDateChange: (dates: { startDate: number; endDate: number }) => void;
}

export default function DateRangePicker({ startDate, endDate, onDateChange }: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempStartDate, setTempStartDate] = useState(startDate);
  const [tempEndDate, setTempEndDate] = useState(endDate);

  const handleApply = () => {
    onDateChange({ startDate: tempStartDate, endDate: tempEndDate });
    setIsOpen(false);
  };

  const handleReset = () => {
    const thirtyDaysAgo = dayjs().subtract(30, "days").valueOf();
    const today = dayjs().valueOf();
    setTempStartDate(thirtyDaysAgo);
    setTempEndDate(today);
    onDateChange({ startDate: thirtyDaysAgo, endDate: today });
    setIsOpen(false);
  };

  const formatDate = (timestamp: number) => dayjs(timestamp).format("DD/MM/YYYY");

  const getDateRangeLabel = () => {
    const start = dayjs(startDate);
    const end = dayjs(endDate);
    const diff = end.diff(start, "day");
    if (diff === 0) return "Hoje";
    if (diff === 1) return "Ontem";
    if (diff === 6) return "Última semana";
    if (diff === 29) return "Último mês";
    if (diff === 89) return "Últimos 3 meses";
    return `${diff + 1} dias`;
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brown focus:border-transparent"
      >
        <Calendar className="w-4 h-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">{getDateRangeLabel()}</span>
        <span className="text-xs text-gray-500">
          {formatDate(startDate)} - {formatDate(endDate)}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Selecionar Período</h3>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Data Inicial</label>
                <input
                  type="date"
                  value={dayjs(tempStartDate).format("YYYY-MM-DD")}
                  onChange={(e) => setTempStartDate(dayjs(e.target.value).valueOf())}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Data Final</label>
                <input
                  type="date"
                  value={dayjs(tempEndDate).format("YYYY-MM-DD")}
                  onChange={(e) => setTempEndDate(dayjs(e.target.value).valueOf())}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown focus:border-transparent"
                />
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      const today = dayjs();
                      const yesterday = dayjs().subtract(1, "day");
                      setTempStartDate(yesterday.valueOf());
                      setTempEndDate(today.valueOf());
                    }}
                    className="px-3 py-2 text-xs font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-brown focus:border-transparent"
                  >
                    Ontem
                  </button>
                  <button
                    onClick={() => {
                      const today = dayjs();
                      const weekAgo = dayjs().subtract(7, "days");
                      setTempStartDate(weekAgo.valueOf());
                      setTempEndDate(today.valueOf());
                    }}
                    className="px-3 py-2 text-xs font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-brown focus:border-transparent"
                  >
                    Última Semana
                  </button>
                  <button
                    onClick={() => {
                      const today = dayjs();
                      const monthAgo = dayjs().subtract(30, "days");
                      setTempStartDate(monthAgo.valueOf());
                      setTempEndDate(today.valueOf());
                    }}
                    className="px-3 py-2 text-xs font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-brown focus:border-transparent"
                  >
                    Último Mês
                  </button>
                  <button
                    onClick={() => {
                      const today = dayjs();
                      const quarterAgo = dayjs().subtract(90, "days");
                      setTempStartDate(quarterAgo.valueOf());
                      setTempEndDate(today.valueOf());
                    }}
                    className="px-3 py-2 text-xs font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-brown focus:border-transparent"
                  >
                    Último Trimestre
                  </button>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={handleReset}
                    className="flex-1 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-brown focus:border-transparent"
                  >
                    Resetar
                  </button>
                  <button
                    onClick={handleApply}
                    className="flex-1 px-3 py-2 text-sm font-medium text-white bg-brown border border-transparent rounded-md hover:bg-brown/90 focus:outline-none focus:ring-2 focus:ring-brown focus:border-transparent"
                  >
                    Aplicar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}
    </div>
  );
}
