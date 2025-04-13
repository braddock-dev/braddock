export const calendarTheme = {
  common: {
    backgroundColor: "#ffffff",
    border: "1px solid #e0e0e0",
    gridSelection: {
      backgroundColor: "rgba(66, 133, 244, 0.05)",
      border: "1px solid #4285f4",
    },
    dayName: { color: "#70757a" },
    holiday: { color: "#d50000" },
    saturday: { color: "#70757a" },
    today: { color: "#4285f4" },
  },
  week: {
    dayName: {
      borderLeft: "none",
      borderTop: "1px solid #e0e0e0",
      borderBottom: "1px solid #e0e0e0",
      backgroundColor: "#f8f9fa",
    },
    dayGrid: {
      borderRight: "1px solid #e0e0e0",
      backgroundColor: "inherit",
    },
    dayGridLeft: {
      borderRight: "1px solid #e0e0e0",
      backgroundColor: "#f8f9fa",
      width: "72px",
    },
    timeGrid: {
      borderRight: "1px solid #e0e0e0",
    },
    timeGridLeft: {
      borderRight: "1px solid #e0e0e0",
      backgroundColor: "#f8f9fa",
      width: "45px",
    },
    nowIndicatorLabel: { color: "#ea4335" },
    nowIndicatorPast: { border: "1px solid #ea4335" },
    nowIndicatorBullet: { backgroundColor: "#ea4335" },
    nowIndicatorToday: { border: "1px solid #ea4335" },
    nowIndicatorFuture: { border: "none" },
    pastTime: { color: "#bbb" },
    futureTime: { color: "#333" },
    today: {
      color: "#4285f4",
      backgroundColor: "rgba(66, 133, 244, 0.05)",
    },
    pastDay: { color: "#bbb" },
    panelResizer: { border: "1px solid #e0e0e0" },
    gridSelection: { color: "#4285f4" },
    timeGridHalfHour: { borderBottom: "1px dotted #e0e0e0" },
    timeGridHourLine: { borderBottom: "1px solid #e0e0e0" },
  },
  month: {
    dayExceptThisMonth: { color: "#bdc1c6" },
    holidayExceptThisMonth: { color: "#f8bbd0" },
    dayName: {
      borderLeft: "none",
      backgroundColor: "#f8f9fa",
    },
    moreView: {
      border: "1px solid #e0e0e0",
      boxShadow: "0 2px 6px 0 rgba(0, 0, 0, 0.1)",
      backgroundColor: "white",
      width: 320,
      height: 200,
    },
    moreViewTitle: { backgroundColor: "#f8f9fa" },
    gridCell: {
      headerHeight: 31,
      footerHeight: 10,
    },
  },
};
