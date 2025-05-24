
/**
 * @ai_context
 * - Centralized logging system for all modules
 * - Provides structured logging with context preservation
 * - Essential for debugging and monitoring module interactions
 */

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3
}

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  module: string;
  message: string;
  data?: any;
}

/**
 * Logger class for structured logging across modules
 * @ai_context Maintains audit trail of module operations and errors
 */
export class Logger {
  private module: string;
  private level: LogLevel = LogLevel.INFO;

  constructor(module: string) {
    this.module = module;
    // #ai-reason: Module-specific logger for better traceability
  }

  private log(level: LogLevel, message: string, data?: any): void {
    if (level < this.level) return;

    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      module: this.module,
      message,
      data
    };

    // #ai-reason: Console logging for development, can be extended to external services
    console.log(`[${LogLevel[level]}] ${entry.module}: ${message}`, data || '');
  }

  debug(message: string, data?: any): void {
    this.log(LogLevel.DEBUG, message, data);
  }

  info(message: string, data?: any): void {
    this.log(LogLevel.INFO, message, data);
  }

  warn(message: string, data?: any): void {
    this.log(LogLevel.WARN, message, data);
  }

  error(message: string, data?: any): void {
    this.log(LogLevel.ERROR, message, data);
  }

  setLevel(level: LogLevel): void {
    this.level = level;
  }
}
