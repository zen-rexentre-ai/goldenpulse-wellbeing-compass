
# Health Calculation Patterns

## Pattern: Age-Normalized Health Metric

**Usage**: When calculating health metrics that vary by age
**Context**: All health parameters need age-specific normal ranges

```typescript
/**
 * @ai_context
 * - Normalizes [METRIC] with age-specific optimal ranges
 * - Accounts for [PHYSIOLOGICAL_CHANGE] in aging process
 * - Weight: [PERCENTAGE]% of total fitness score
 */
export function normalize[Metric]ByAge(value: number, age: number): number {
  const ageGroup = getAgeGroup(age);
  const { optimal, range } = AGE_FACTORS[ageGroup].[metric];
  
  // #ai-reason: [Medical justification for range limits]
  if (value < MIN_SAFE || value > MAX_SAFE) {
    return 0.1; // Very low score for dangerous ranges
  }
  
  const deviation = Math.abs(value - optimal);
  const normalizedDeviation = Math.min(deviation / range, 3);
  
  return Math.max(0.1, 1 - (normalizedDeviation / 3));
}
```

## Pattern: Health Risk Assessment

**Usage**: When determining health risk levels
**Context**: Converting numeric health metrics to actionable risk categories

```typescript
/**
 * @ai_context
 * - Converts numeric health scores to risk categories
 * - Provides user-friendly interpretation for seniors
 * - Used for UI color coding and messaging
 */
export function assessHealthRisk(score: number): HealthRisk {
  // #ai-reason: Clinical thresholds adapted for Indian senior population
  if (score >= 80) return { level: 'low', message: 'Excellent health', color: 'green' };
  if (score >= 65) return { level: 'moderate', message: 'Good health', color: 'blue' };
  if (score >= 50) return { level: 'elevated', message: 'Needs attention', color: 'yellow' };
  return { level: 'high', message: 'Medical consultation recommended', color: 'red' };
}
```

## Pattern: Progressive Scoring

**Usage**: When scoring metrics with diminishing returns
**Context**: Exercise minutes, where more is better but with limits

```typescript
/**
 * @ai_context
 * - Progressive scoring with diminishing returns after target
 * - Prevents over-exercise penalties for enthusiastic seniors
 * - Accounts for realistic capabilities by age
 */
export function calculateProgressiveScore(actual: number, target: number): number {
  if (actual >= target) return 1.0;
  if (actual >= target * 0.75) return 0.8 + (0.2 * (actual / target));
  if (actual >= target * 0.5) return 0.6 + (0.2 * (actual / (target * 0.75)));
  if (actual >= target * 0.25) return 0.4 + (0.2 * (actual / (target * 0.5)));
  return Math.max(0.1, 0.4 * (actual / (target * 0.25)));
}
```

## Pattern: Cultural Health Adaptation

**Usage**: When adapting health guidelines for Indian population
**Context**: BMI, diabetes prevalence, dietary considerations

```typescript
/**
 * @ai_context
 * - Adapts international health guidelines for Indian seniors
 * - Accounts for genetic predisposition to diabetes and heart disease
 * - Considers vegetarian diet impacts and cultural factors
 */
export function adaptForIndianPopulation(standardScore: number, metric: string): number {
  // #ai-reason: Indians have higher diabetes risk at lower BMI
  if (metric === 'bmi' && standardScore > 0.7) {
    return standardScore * 0.9; // Slight penalty for higher BMI
  }
  
  // #ai-reason: Account for higher baseline diabetes prevalence
  if (metric === 'hba1c') {
    return Math.min(1.0, standardScore * 1.1); // Slight bonus for good control
  }
  
  return standardScore;
}
```
