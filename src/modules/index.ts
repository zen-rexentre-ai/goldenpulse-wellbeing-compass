
/**
 * @ai_context
 * - Main module orchestrator and initialization point
 * - Manages module lifecycle and dependency resolution
 * - Provides centralized module registry and health monitoring
 */
import { IModule } from './core/interfaces/ModuleInterface';
import { Logger } from './core/logging/Logger';
import { container } from './core/di/container';

// Import all modules
import { fitnessModule } from './fitness';
import { dashboardModule } from './dashboard';
import { gamesModule } from './games';

/**
 * Module Manager
 * @ai_context Orchestrates module initialization and manages their lifecycle
 */
export class ModuleManager {
  private modules: IModule[] = [];
  private logger: Logger;
  private initialized = false;

  constructor() {
    this.logger = new Logger('ModuleManager');
    
    // #ai-reason: Register modules in dependency order
    this.modules = [
      fitnessModule,
      dashboardModule,
      gamesModule
    ];
  }

  /**
   * Initialize all modules
   * @ai_context Ensures proper startup sequence and dependency resolution
   */
  async initialize(): Promise<void> {
    if (this.initialized) {
      this.logger.warn('Modules already initialized');
      return;
    }

    this.logger.info('Starting module initialization');

    try {
      // #ai-reason: Initialize modules in dependency order
      for (const module of this.modules) {
        this.logger.info(`Initializing module: ${module.name}`);
        await module.initialize();
        this.logger.info(`Module ${module.name} initialized successfully`);
      }

      this.initialized = true;
      this.logger.info('All modules initialized successfully');
    } catch (error) {
      this.logger.error('Failed to initialize modules', error);
      throw error;
    }
  }

  /**
   * Shutdown all modules
   * @ai_context Graceful shutdown with proper cleanup
   */
  async shutdown(): Promise<void> {
    this.logger.info('Shutting down modules');

    // #ai-reason: Shutdown in reverse order
    for (const module of [...this.modules].reverse()) {
      try {
        await module.shutdown();
        this.logger.info(`Module ${module.name} shut down successfully`);
      } catch (error) {
        this.logger.error(`Failed to shutdown module ${module.name}`, error);
      }
    }

    this.initialized = false;
  }

  /**
   * Get health status of all modules
   * @ai_context Provides system-wide health monitoring
   */
  getSystemHealth(): Record<string, any> {
    const health: Record<string, any> = {};

    for (const module of this.modules) {
      health[module.name] = module.getHealth();
    }

    return health;
  }

  /**
   * Get module by name
   * @ai_context Allows runtime module access for debugging
   */
  getModule(name: string): IModule | undefined {
    return this.modules.find(module => module.name === name);
  }
}

// Export singleton instance
export const moduleManager = new ModuleManager();

// #ai-reason: Export container for global access
export { container };
