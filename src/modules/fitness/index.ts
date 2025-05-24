
/**
 * @ai_context
 * - Fitness module entry point with health calculation services
 * - Integrates with existing fitness score utilities
 * - Maintains backward compatibility with current dashboard
 */
import { IModule, ModuleHealth } from '../core/interfaces/ModuleInterface';
import { Logger } from '../core/logging/Logger';
import { container } from '../core/di/container';
import { calculateFitnessScore } from '../../utils/fitnessScoreUtils';

/**
 * Fitness Score Service Interface
 * @ai_context Defines contract for fitness calculations and recommendations
 */
export interface IFitnessService {
  calculateScore(data: any): Promise<any>;
  getRecommendations(score: number, params: any): Promise<any[]>;
  validateInput(data: any): boolean;
}

/**
 * Fitness Service Implementation
 * @ai_context Wraps existing fitness utilities in modular architecture
 */
class FitnessService implements IFitnessService {
  private logger: Logger;

  constructor() {
    this.logger = new Logger('FitnessService');
    // #ai-reason: Initialize logging for fitness calculations
  }

  /**
   * Calculate fitness score using existing utilities
   * @ai_context Maintains compatibility with current fitness calculation logic
   */
  async calculateScore(data: any): Promise<any> {
    this.logger.info('Calculating fitness score', { userId: data.email });
    
    try {
      // #ai-reason: Use existing calculateFitnessScore to maintain functionality
      const result = calculateFitnessScore(data);
      this.logger.info('Fitness score calculated successfully', { score: result.score });
      return result;
    } catch (error) {
      this.logger.error('Failed to calculate fitness score', error);
      throw error;
    }
  }

  async getRecommendations(score: number, params: any): Promise<any[]> {
    this.logger.info('Generating recommendations', { score });
    // #ai-reason: Placeholder for enhanced recommendation logic
    return [];
  }

  validateInput(data: any): boolean {
    // #ai-reason: Basic validation, can be enhanced with schema validation
    return data && typeof data === 'object';
  }
}

/**
 * Fitness Module Implementation
 * @ai_context Manages fitness-related services and their lifecycle
 */
class FitnessModule implements IModule {
  name = 'fitness';
  version = '1.0.0';
  dependencies = ['core'];
  private logger: Logger;
  private fitnessService: FitnessService;

  constructor() {
    this.logger = new Logger('FitnessModule');
    this.fitnessService = new FitnessService();
  }

  async initialize(): Promise<void> {
    this.logger.info('Initializing Fitness Module');
    
    // #ai-reason: Register services with DI container for cross-module access
    container.register('fitnessService', () => this.fitnessService);
    
    this.logger.info('Fitness Module initialized successfully');
  }

  async shutdown(): Promise<void> {
    this.logger.info('Shutting down Fitness Module');
  }

  getHealth(): ModuleHealth {
    return {
      status: 'healthy',
      lastCheck: new Date(),
      metrics: {
        calculationsPerformed: 0 // #ai-reason: Placeholder for metrics
      }
    };
  }
}

// Export module instance and service interface
export const fitnessModule = new FitnessModule();
export { IFitnessService };

// #ai-reason: Maintain backward compatibility by re-exporting existing utilities
export * from '../../utils/fitnessScoreUtils';
