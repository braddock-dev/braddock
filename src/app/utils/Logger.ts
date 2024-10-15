const formatLogTimestamp = (date: Date) => {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const milliseconds = String(date.getMilliseconds()).padStart(3, "0");

  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
};

const getStringLog = (from: string, message: string) => {
  // Prepend the timestamp to the first argument
  const now: Date = new Date();
  const timestamp: string = formatLogTimestamp(now);

  return `${timestamp} > ${from}: ${message}`;
};

const Logger = {
  log: (from: string, message: string, args?: any) => {
    const stringLog = getStringLog(from, message);
    console.log(stringLog, Logger._stringify(args) ?? "");
  },

  debug: (from: string, message: string, args?: any) => {
    const stringLog = getStringLog(from, message);
    console.debug(stringLog, Logger._stringify(args) ?? "");
  },

  info: (from: string, message: string, args?: any) => {
    const stringLog = getStringLog(from, message);
    console.info(stringLog, Logger._stringify(args) ?? "");
  },

  trace: (from: string, message: string, args?: any) => {
    const stringLog = getStringLog(from, message);
    console.trace(stringLog, Logger._stringify(args) ?? "");
  },

  warn: (from: string, message: string, args?: any) => {
    const stringLog = getStringLog(from, message);
    console.warn(stringLog, Logger._stringify(args) ?? "");
  },

  error: (from: string, message: string, args?: any) => {
    const stringLog = getStringLog(from, message);
    console.error(stringLog, Logger._stringify(args) ?? "");
  },

  _stringify: (data: any) => {
    if (typeof data === "object") {
      try {
        return JSON.stringify(data || {}, null, 2);
      } catch (error) {
        return data;
      }
    }

    return data;
  },
};

export default Logger;
