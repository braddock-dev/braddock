"use client";

import { useState } from "react";
import dayjs from "@/app/utils/dayjs";
import { Calendar, X, AlertCircle } from "lucide-react";
import { Constants } from "@/app/utils/Constants";

interface DateRangePickerProps {
  startDate: number;
  endDate: number;
  onDateChange: (dates: { startDate: number; endDate: number }) => void;
  maxDays?: number;
}

export default function DateRangePicker({ startDate, endDate, onDateChange, maxDays = 90 }: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempStartDate, setTempStartDate] = useState(startDate);
  const [tempEndDate, setTempEndDate] = useState(endDate);
  const [error, setError] = useState<string | null>(null);

  const MAX_DAYS = maxDays; // Use the prop value with default fallback

  const validateDateRange = (start: number, end: number): boolean => {
    const startDate = dayjs(start);
    const endDate = dayjs(end);
    const diffInDays = endDate.diff(startDate, "day");

    if (diffInDays > MAX_DAYS) {
      setError(`O período máximo permitido é de (${Math.round(MAX_DAYS / 30)} meses)`);
      return false;
    }

    if (diffInDays < 0) {
      setError("A data final deve ser posterior à data inicial");
      return false;
    }

    setError(null);
    return true;
  };

  const handleStartDateChange = (newStartDate: number) => {
    // Ensure start date is set to beginning of day (00:00:00)
    const startOfDay = dayjs(newStartDate).startOf("day").valueOf();
    setTempStartDate(startOfDay);
    validateDateRange(startOfDay, tempEndDate);
  };

  const handleEndDateChange = (newEndDate: number) => {
    // Ensure end date is set to end of day (23:59:59)
    const endOfDay = dayjs(newEndDate).endOf("day").valueOf();
    setTempEndDate(endOfDay);
    validateDateRange(tempStartDate, endOfDay);
  };

  const handleApply = () => {
    if (validateDateRange(tempStartDate, tempEndDate)) {
      onDateChange({ startDate: tempStartDate, endDate: tempEndDate });
      setIsOpen(false);
      setError(null);
    }
  };

  const handleReset = () => {
    const thirtyDaysAgo = dayjs().subtract(30, "days").startOf("day").valueOf();
    const today = dayjs().endOf("day").valueOf();
    setTempStartDate(thirtyDaysAgo);
    setTempEndDate(today);
    setError(null);
    onDateChange({ startDate: thirtyDaysAgo, endDate: today });
    setIsOpen(false);
  };

  const formatDate = (timestamp: number) => dayjs(timestamp).format(Constants.TIME.DAY_DATE_FORMAT);

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
                  onChange={(e) => handleStartDateChange(dayjs(e.target.value).valueOf())}
                  min={dayjs(tempEndDate).subtract(MAX_DAYS, "days").format("YYYY-MM-DD")}
                  max={dayjs(tempEndDate).format("YYYY-MM-DD")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Data Final</label>
                <input
                  type="date"
                  value={dayjs(tempEndDate).format("YYYY-MM-DD")}
                  onChange={(e) => handleEndDateChange(dayjs(e.target.value).valueOf())}
                  min={dayjs(tempStartDate).add(1, "day").format("YYYY-MM-DD")}
                  max={dayjs(tempStartDate).add(MAX_DAYS, "days").format("YYYY-MM-DD")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown focus:border-transparent"
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span className="text-sm text-red-700">{error}</span>
                </div>
              )}

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      const today = dayjs().endOf("day");
                      const yesterday = dayjs().subtract(1, "day").startOf("day");
                      setTempStartDate(yesterday.valueOf());
                      setTempEndDate(today.valueOf());
                      setError(null);
                    }}
                    className="px-3 py-2 text-xs font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-brown focus:border-transparent"
                  >
                    Ontem
                  </button>
                  <button
                    onClick={() => {
                      const today = dayjs().endOf("day");
                      const weekAgo = dayjs().subtract(7, "days").startOf("day");
                      setTempStartDate(weekAgo.valueOf());
                      setTempEndDate(today.valueOf());
                      setError(null);
                    }}
                    className="px-3 py-2 text-xs font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-brown focus:border-transparent"
                  >
                    Última Semana
                  </button>
                  <button
                    onClick={() => {
                      const today = dayjs().endOf("day");
                      const monthAgo = dayjs().subtract(30, "days").startOf("day");
                      setTempStartDate(monthAgo.valueOf());
                      setTempEndDate(today.valueOf());
                      setError(null);
                    }}
                    className="px-3 py-2 text-xs font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-brown focus:border-transparent"
                  >
                    Último Mês
                  </button>
                  <button
                    onClick={() => {
                      const today = dayjs().endOf("day");
                      const quarterAgo = dayjs().subtract(90, "days").startOf("day");
                      setTempStartDate(quarterAgo.valueOf());
                      setTempEndDate(today.valueOf());
                      setError(null);
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
                    disabled={!!error}
                    className="flex-1 px-3 py-2 text-sm font-medium text-white bg-brown border border-transparent rounded-md hover:bg-brown/90 focus:outline-none focus:ring-2 focus:ring-brown focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
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
