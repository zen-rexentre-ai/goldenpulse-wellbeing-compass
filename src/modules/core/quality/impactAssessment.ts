
/**
 * @ai_context
 * - Impact assessment tool for predicting change effects
 * - Analyzes dependency graphs and potential side effects
 * - Provides risk assessment for health-critical modifications
 * - Generates automated test coverage recommendations
 */

import { Logger } from '../logging/Logger';

interface ImpactAssessment {
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  affectedModules: string[];
  testCoverageNeeded: string[];
  recommendations: string[];
  potentialSideEffects: string[];
}

interface ChangeRequest {
  files: string[];
  functions: string[];
  modules: string[];
  description: string;
}

/**
 * Analyze impact of proposed code changes
 * @ai_context
 * - Performs static analysis of change dependencies
 * - Identifies health-critical code paths that could be affected
 * - Generates risk assessment based on medical software standards
 * - Provides actionable recommendations for safe deployment
 */
export class ImpactAssessmentTool {
  private logger: Logger;
  private healthCriticalModules = ['fitness', 'health', 'medicine', 'vital'];
  private highRiskFunctions = ['calculate', 'normalize', 'score', 'recommend'];

  constructor() {
    this.logger = new Logger('ImpactAssessment');
  }

  /**
   * Assess impact of proposed changes
   * @ai_context
   * - Primary entry point for change impact analysis
   * - Returns comprehensive risk assessment with recommendations
   * - Used by development workflow to prevent unsafe deployments
   */
  async assessChange(change: ChangeRequest): Promise<ImpactAssessment> {
    this.logger.info('Analyzing impact of proposed changes', { 
      files: change.files.length,
      modules: change.modules.length 
    });

    const assessment: ImpactAssessment = {
      riskLevel: 'low',
      affectedModules: [],
      testCoverageNeeded: [],
      recommendations: [],
      potentialSideEffects: []
    };

    // #ai-reason: Analyze module dependencies and health-critical impacts
    assessment.affectedModules = this.analyzeModuleDependencies(change);
    assessment.riskLevel = this.calculateRiskLevel(change, assessment.affectedModules);
    assessment.testCoverageNeeded = this.identifyTestCoverage(change);
    assessment.recommendations = this.generateRecommendations(change, assessment.riskLevel);
    assessment.potentialSideEffects = this.identifySideEffects(change);

    this.logger.info('Impact assessment completed', {
      riskLevel: assessment.riskLevel,
      affectedModules: assessment.affectedModules.length
    });

    return assessment;
  }

  /**
   * Analyze module dependencies for change impact
   * @ai_context
   * - Maps change propagation through module dependency graph
   * - Identifies indirect effects on health calculations
   * - Critical for preventing unexpected health score changes
   */
  private analyzeModuleDependencies(change: ChangeRequest): string[] {
    const affectedModules = new Set<string>(change.modules);

    // #ai-reason: Add modules that depend on changed modules
    change.modules.forEach(module => {
      if (module === 'fitness') {
        affectedModules.add('dashboard');
        affectedModules.add('wellness');
      }
      if (module === 'core') {
        affectedModules.add('fitness');
        affectedModules.add('dashboard');
        affectedModules.add('games');
      }
    });

    return Array.from(affectedModules);
  }

  /**
   * Calculate risk level based on change characteristics
   * @ai_context
   * - Uses medical software risk classification standards
   * - Health calculation changes are automatically high risk
   * - UI-only changes are typically low risk
   */
  private calculateRiskLevel(change: ChangeRequest, affectedModules: string[]): 'low' | 'medium' | 'high' | 'critical' {
    // #ai-reason: Any change to health calculations is high risk
    const hasHealthCriticalChanges = this.healthCriticalModules.some(module => 
      affectedModules.includes(module)
    );

    const hasHighRiskFunctions = change.functions.some(func =>
      this.highRiskFunctions.some(risk => func.toLowerCase().includes(risk))
    );

    // #ai-reason: Critical risk for core health calculation changes
    if (hasHealthCriticalChanges && hasHighRiskFunctions) {
      return 'critical';
    }

    if (hasHealthCriticalChanges) {
      return 'high';
    }

    if (affectedModules.length > 3) {
      return 'medium';
    }

    return 'low';
  }

  /**
   * Identify required test coverage for changes
   * @ai_context
   * - Maps changes to required test scenarios
   * - Ensures health calculations have comprehensive test coverage
   * - Prevents regression in critical health features
   */
  private identifyTestCoverage(change: ChangeRequest): string[] {
    const coverage: string[] = [];

    // #ai-reason: Health calculations require extensive test coverage
    if (change.modules.includes('fitness')) {
      coverage.push('Fitness score calculation with edge cases');
      coverage.push('Age normalization boundary testing');
      coverage.push('Chronic condition impact validation');
      coverage.push('Recommendation generation accuracy');
    }

    if (change.modules.includes('dashboard')) {
      coverage.push('Widget data flow integration');
      coverage.push('Score display accuracy');
      coverage.push('Trend calculation validation');
    }

    if (change.files.some(file => file.includes('normalization'))) {
      coverage.push('Parameter normalization boundary testing');
      coverage.push('Age group classification accuracy');
      coverage.push('Clinical range validation');
    }

    return coverage;
  }

  /**
   * Generate recommendations for safe deployment
   * @ai_context
   * - Provides actionable steps for risk mitigation
   * - Ensures compliance with medical software standards
   * - Guides developers through safe deployment process
   */
  private generateRecommendations(change: ChangeRequest, riskLevel: string): string[] {
    const recommendations: string[] = [];

    switch (riskLevel) {
      case 'critical':
        recommendations.push('Require medical professional review');
        recommendations.push('Implement A/B testing with small user group');
        recommendations.push('Add comprehensive monitoring and rollback plan');
        recommendations.push('Validate against clinical test cases');
        break;

      case 'high':
        recommendations.push('Require senior developer review');
        recommendations.push('Run full regression test suite');
        recommendations.push('Validate health calculation accuracy');
        recommendations.push('Monitor health score distributions post-deployment');
        break;

      case 'medium':
        recommendations.push('Require peer code review');
        recommendations.push('Run affected module test suites');
        recommendations.push('Validate UI component behavior');
        break;

      case 'low':
        recommendations.push('Standard code review required');
        recommendations.push('Run unit tests for changed components');
        break;
    }

    return recommendations;
  }

  /**
   * Identify potential side effects of changes
   * @ai_context
   * - Predicts unintended consequences of modifications
   * - Focuses on health calculation accuracy and user experience
   * - Helps prevent subtle bugs in critical health features
   */
  private identifySideEffects(change: ChangeRequest): string[] {
    const sideEffects: string[] = [];

    // #ai-reason: Changes to normalization could affect all fitness scores
    if (change.files.some(file => file.includes('normalization'))) {
      sideEffects.push('Historical fitness scores may appear different');
      sideEffects.push('Recommendation accuracy could be affected');
      sideEffects.push('Dashboard widgets may show unexpected trends');
    }

    // #ai-reason: Core module changes affect all dependent modules
    if (change.modules.includes('core')) {
      sideEffects.push('All modules could be affected by DI container changes');
      sideEffects.push('Logging behavior might change across the application');
      sideEffects.push('Module initialization order could be affected');
    }

    // #ai-reason: UI changes might affect accessibility or mobile responsiveness
    if (change.files.some(file => file.includes('component') || file.includes('ui'))) {
      sideEffects.push('Mobile responsiveness could be affected');
      sideEffects.push('Accessibility features might need validation');
      sideEffects.push('Theme and language switching behavior could change');
    }

    return sideEffects;
  }
}

/**
 * Generate automated test recommendations
 * @ai_context
 * - Creates specific test cases for health-critical changes
 * - Ensures comprehensive coverage of edge cases
 * - Provides templates for medical software testing
 */
export function generateTestRecommendations(assessment: ImpactAssessment): {
  unitTests: string[];
  integrationTests: string[];
  e2eTests: string[];
} {
  return {
    unitTests: [
      'Test boundary conditions for all changed functions',
      'Validate error handling for invalid inputs',
      'Test age group edge cases (49->50, 79->80)',
      'Verify calculation accuracy with known test cases'
    ],
    integrationTests: [
      'Test module communication through DI container',
      'Validate data flow from fitness service to dashboard',
      'Test error propagation across module boundaries',
      'Verify service registration and dependency resolution'
    ],
    e2eTests: [
      'Complete fitness calculation workflow',
      'Dashboard widget display and interaction',
      'Score trend calculation and display',
      'Mobile responsiveness across devices'
    ]
  };
}
