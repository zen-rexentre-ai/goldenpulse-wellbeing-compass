
/**
 * @ai_context
 * - Defines strict interface contracts for module communication
 * - Ensures type safety and consistent API across modules
 * - Enables compile-time validation of module interactions
 */

/**
 * Base interface that all modules must implement
 * @ai_context Provides standardized lifecycle and communication patterns
 */
export interface IModule {
  name: string;
  version: string;
  dependencies: string[];
  initialize(): Promise<void>;
  shutdown(): Promise<void>;
  getHealth(): ModuleHealth;
}

/**
 * Health status for module monitoring
 * @ai_context Enables system-wide health checks and error detection
 */
export interface ModuleHealth {
  status: 'healthy' | 'degraded' | 'unhealthy';
  lastCheck: Date;
  errors?: string[];
  metrics?: Record<string, number>;
}

/**
 * Event system for inter-module communication
 * @ai_context Loose coupling through event-driven architecture
 */
export interface IEventBus {
  subscribe<T>(event: string, handler: (data: T) => void): void;
  unsubscribe(event: string, handler: Function): void;
  emit<T>(event: string, data: T): void;
}

/**
 * Configuration interface for modules
 * @ai_context Centralized configuration management with type safety
 */
export interface ModuleConfig {
  [key: string]: any;
  enabled: boolean;
  priority: number;
}
