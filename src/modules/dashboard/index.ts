
/**
 * @ai_context
 * - Dashboard module managing widget components and data flow
 * - Integrates with fitness module for score display
 * - Maintains existing dashboard functionality while adding modularity
 */
import { IModule, ModuleHealth } from '../core/interfaces/ModuleInterface';
import { Logger } from '../core/logging/Logger';
import { container } from '../core/di/container';

/**
 * Dashboard Service Interface
 * @ai_context Defines contract for dashboard data management and widget coordination
 */
export interface IDashboardService {
  getWidgetData(widgetType: string): Promise<any>;
  updateWidget(widgetType: string, data: any): Promise<void>;
  getLayoutConfig(): any;
}

/**
 * Dashboard Service Implementation
 * @ai_context Manages dashboard state and widget interactions
 */
class DashboardService implements IDashboardService {
  private logger: Logger;
  private widgetData = new Map<string, any>();

  constructor() {
    this.logger = new Logger('DashboardService');
    // #ai-reason: Initialize dashboard service with logging
  }

  async getWidgetData(widgetType: string): Promise<any> {
    this.logger.debug(`Getting widget data for: ${widgetType}`);
    return this.widgetData.get(widgetType) || {};
  }

  async updateWidget(widgetType: string, data: any): Promise<void> {
    this.logger.info(`Updating widget: ${widgetType}`);
    this.widgetData.set(widgetType, data);
  }

  getLayoutConfig(): any {
    // #ai-reason: Return default layout configuration
    return {
      widgets: ['fitness-score', 'medicines', 'appointments', 'health-focus'],
      layout: 'responsive'
    };
  }
}

/**
 * Dashboard Module Implementation
 * @ai_context Coordinates dashboard components and their data sources
 */
class DashboardModule implements IModule {
  name = 'dashboard';
  version = '1.0.0';
  dependencies = ['core', 'fitness'];
  private logger: Logger;
  private dashboardService: DashboardService;

  constructor() {
    this.logger = new Logger('DashboardModule');
    this.dashboardService = new DashboardService();
  }

  async initialize(): Promise<void> {
    this.logger.info('Initializing Dashboard Module');
    
    // #ai-reason: Register dashboard service for other modules to access
    container.register('dashboardService', () => this.dashboardService);
    
    this.logger.info('Dashboard Module initialized successfully');
  }

  async shutdown(): Promise<void> {
    this.logger.info('Shutting down Dashboard Module');
  }

  getHealth(): ModuleHealth {
    return {
      status: 'healthy',
      lastCheck: new Date(),
      metrics: {
        activeWidgets: 4 // #ai-reason: Track number of active widgets
      }
    };
  }
}

export const dashboardModule = new DashboardModule();
