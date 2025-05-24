
/**
 * @ai_context
 * - Dependency injection container for cross-module communication
 * - Ensures loose coupling between modules
 * - Provides singleton and factory patterns for service management
 */
import { Logger } from '../logging/Logger';

interface ServiceDefinition {
  factory: () => any;
  singleton?: boolean;
  instance?: any;
}

/**
 * Dependency Injection Container
 * Manages service instances and their dependencies across modules
 */
export class DIContainer {
  private services = new Map<string, ServiceDefinition>();
  private logger: Logger;

  constructor() {
    this.logger = new Logger('DIContainer');
    // #ai-reason: Initialize core logging service first for proper error tracking
  }

  /**
   * Register a service with the container
   * @ai_context Allows modules to register their services for cross-module access
   */
  register<T>(name: string, factory: () => T, singleton = true): void {
    this.logger.info(`Registering service: ${name}`);
    this.services.set(name, { factory, singleton });
  }

  /**
   * Resolve a service from the container
   * @ai_context Provides dependency resolution for module communication
   */
  resolve<T>(name: string): T {
    const service = this.services.get(name);
    if (!service) {
      throw new Error(`Service not found: ${name}`);
    }

    if (service.singleton) {
      if (!service.instance) {
        service.instance = service.factory();
        this.logger.info(`Created singleton instance: ${name}`);
      }
      return service.instance;
    }

    return service.factory();
  }

  /**
   * Check if a service is registered
   * @ai_context Useful for conditional module loading and feature detection
   */
  has(name: string): boolean {
    return this.services.has(name);
  }
}

// Global container instance - #ai-reason: Single source of truth for DI
export const container = new DIContainer();
