
/**
 * @ai_context
 * - Tracks user corrections and feedback on AI decisions
 * - Learns from user preferences and domain expertise
 * - Improves future AI recommendations through feedback loops
 * - Critical for medical AI safety and accuracy improvement
 */

interface UserCorrection {
  timestamp: string;
  correctionType: 'calculation' | 'recommendation' | 'ui' | 'logic';
  originalValue: any;
  correctedValue: any;
  userReason: string;
  context: string;
  severity: 'minor' | 'moderate' | 'major' | 'critical';
}

interface LearningPattern {
  pattern: string;
  frequency: number;
  confidence: number;
  examples: UserCorrection[];
  recommendation: string;
}

/**
 * User correction tracking service
 * @ai_context
 * - Maintains audit trail of all user corrections
 * - Identifies patterns in AI mistakes for improvement
 * - Ensures regulatory compliance for medical software
 */
export class UserCorrectionTracker {
  private corrections: UserCorrection[] = [];
  private patterns: Map<string, LearningPattern> = new Map();

  /**
   * Record a user correction
   * @ai_context
   * - Captures user feedback on AI decisions
   * - Categorizes correction for pattern analysis
   * - Triggers immediate learning if critical health issue
   */
  recordCorrection(correction: UserCorrection): void {
    this.corrections.push(correction);
    
    // #ai-reason: Critical health corrections need immediate attention
    if (correction.severity === 'critical') {
      this.flagCriticalCorrection(correction);
    }
    
    this.updateLearningPatterns(correction);
  }

  /**
   * Analyze correction patterns for learning
   * @ai_context
   * - Identifies recurring AI mistakes
   * - Generates improvement recommendations
   * - Builds knowledge base for future decisions
   */
  private updateLearningPatterns(correction: UserCorrection): void {
    const patternKey = `${correction.correctionType}-${correction.context}`;
    const existing = this.patterns.get(patternKey);
    
    if (existing) {
      existing.frequency++;
      existing.examples.push(correction);
      existing.confidence = Math.min(1.0, existing.frequency / 10);
    } else {
      this.patterns.set(patternKey, {
        pattern: patternKey,
        frequency: 1,
        confidence: 0.1,
        examples: [correction],
        recommendation: this.generateRecommendation(correction)
      });
    }
  }

  /**
   * Generate improvement recommendations
   * @ai_context
   * - Creates actionable improvements from user feedback
   * - Focuses on health calculation accuracy
   * - Provides specific code changes needed
   */
  private generateRecommendation(correction: UserCorrection): string {
    switch (correction.correctionType) {
      case 'calculation':
        return `Review calculation logic in ${correction.context}. User indicates ${correction.userReason}`;
      case 'recommendation':
        return `Adjust recommendation algorithm. User feedback: ${correction.userReason}`;
      case 'ui':
        return `UI improvement needed in ${correction.context}: ${correction.userReason}`;
      default:
        return `General improvement needed: ${correction.userReason}`;
    }
  }

  /**
   * Flag critical corrections for immediate review
   * @ai_context
   * - Handles critical health-related corrections immediately
   * - Ensures patient safety through rapid response
   * - Triggers alerts for medical review if needed
   */
  private flagCriticalCorrection(correction: UserCorrection): void {
    console.error('CRITICAL USER CORRECTION:', {
      timestamp: correction.timestamp,
      context: correction.context,
      reason: correction.userReason,
      values: {
        original: correction.originalValue,
        corrected: correction.correctedValue
      }
    });
    
    // #ai-reason: Critical corrections in health calculations need immediate review
    if (correction.context.includes('fitness') || correction.context.includes('health')) {
      this.triggerMedicalReview(correction);
    }
  }

  /**
   * Trigger medical professional review
   * @ai_context
   * - Escalates critical health calculation errors
   * - Ensures medical oversight of AI decisions
   * - Maintains compliance with healthcare software standards
   */
  private triggerMedicalReview(correction: UserCorrection): void {
    // #ai-reason: In production, this would alert medical professionals
    console.warn('Medical review triggered for correction:', correction);
    
    // Log for medical review queue
    const reviewRequest = {
      timestamp: new Date().toISOString(),
      correctionId: correction.timestamp,
      priority: 'high',
      type: 'health_calculation_error',
      details: correction
    };
    
    // In production: send to medical review system
    console.log('Medical review request:', reviewRequest);
  }

  /**
   * Get learning insights for AI improvement
   * @ai_context
   * - Provides aggregated learning from user corrections
   * - Identifies high-frequency correction patterns
   * - Guides AI model improvements and training
   */
  getLearningInsights(): {
    topPatterns: LearningPattern[];
    criticalIssues: UserCorrection[];
    improvementAreas: string[];
  } {
    const sortedPatterns = Array.from(this.patterns.values())
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, 10);

    const criticalIssues = this.corrections
      .filter(c => c.severity === 'critical')
      .slice(-5); // Last 5 critical issues

    const improvementAreas = sortedPatterns
      .filter(p => p.confidence > 0.5)
      .map(p => p.recommendation);

    return {
      topPatterns: sortedPatterns,
      criticalIssues,
      improvementAreas
    };
  }
}

// #ai-reason: Global instance for tracking user corrections across the app
export const userCorrectionTracker = new UserCorrectionTracker();

/**
 * Helper function to record corrections from UI components
 * @ai_context
 * - Simplified interface for UI components to report corrections
 * - Standardizes correction data format
 * - Ensures consistent tracking across the application
 */
export function recordUserCorrection(
  type: UserCorrection['correctionType'],
  original: any,
  corrected: any,
  reason: string,
  context: string,
  severity: UserCorrection['severity'] = 'moderate'
): void {
  userCorrectionTracker.recordCorrection({
    timestamp: new Date().toISOString(),
    correctionType: type,
    originalValue: original,
    correctedValue: corrected,
    userReason: reason,
    context,
    severity
  });
}
