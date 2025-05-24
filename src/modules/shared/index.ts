
/**
 * @ai_context
 * - Shared utilities and services used across multiple modules
 * - Provides common functionality like validation, formatting, and helpers
 * - Prevents code duplication and ensures consistency
 */
import { Logger } from '../core/logging/Logger';

/**
 * Validation Service
 * @ai_context Provides consistent validation across all modules
 */
export class ValidationService {
  private logger: Logger;

  constructor() {
    this.logger = new Logger('ValidationService');
  }

  /**
   * Validate email format
   * @ai_context Used for user registration and profile management
   */
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate phone number (Indian format)
   * @ai_context Supports Indian phone number formats for user registration
   */
  isValidPhone(phone: string): boolean {
    const phoneRegex = /^[+]?[91]?[6-9]\d{9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  }

  /**
   * Validate age range for health calculations
   * @ai_context Ensures age inputs are within acceptable range for health scoring
   */
  isValidAge(age: number): boolean {
    return age >= 18 && age <= 120;
  }
}

/**
 * Formatting Service
 * @ai_context Consistent data formatting across all modules
 */
export class FormattingService {
  private logger: Logger;

  constructor() {
    this.logger = new Logger('FormattingService');
  }

  /**
   * Format date for Indian locale
   * @ai_context Provides consistent date formatting across the application
   */
  formatDate(date: Date): string {
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  /**
   * Format BMI value with proper precision
   * @ai_context Used in fitness calculations and health displays
   */
  formatBMI(bmi: number): string {
    return bmi.toFixed(1);
  }

  /**
   * Format health score for display
   * @ai_context Consistent score presentation across dashboard components
   */
  formatScore(score: number): string {
    return Math.round(score).toString();
  }
}

/**
 * Error Boundary Service
 * @ai_context Centralized error handling and reporting
 */
export class ErrorService {
  private logger: Logger;

  constructor() {
    this.logger = new Logger('ErrorService');
  }

  /**
   * Handle and log application errors
   * @ai_context Provides consistent error handling across modules
   */
  handleError(error: Error, context: string): void {
    this.logger.error(`Error in ${context}`, {
      message: error.message,
      stack: error.stack
    });

    // #ai-reason: In production, this could send errors to monitoring service
    console.error(`[${context}] ${error.message}`);
  }

  /**
   * Create user-friendly error messages
   * @ai_context Converts technical errors to user-understandable messages
   */
  getUserErrorMessage(error: Error): string {
    // #ai-reason: Map technical errors to user-friendly messages
    const errorMessages: Record<string, string> = {
      'ValidationError': 'Please check your input and try again.',
      'NetworkError': 'Please check your internet connection.',
      'AuthenticationError': 'Please log in again.',
      default: 'Something went wrong. Please try again.'
    };

    return errorMessages[error.name] || errorMessages.default;
  }
}

// Export shared services
export const validationService = new ValidationService();
export const formattingService = new FormattingService();
export const errorService = new ErrorService();
