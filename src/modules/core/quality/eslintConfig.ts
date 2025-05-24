
/**
 * @ai_context
 * - Medical-grade ESLint configuration for healthcare applications
 * - Enforces strict code quality standards for patient safety
 * - Prevents common errors that could affect health calculations
 * - Validates JSDoc completeness and AI context markers
 */

export const medicalGradeRules = {
  // #ai-reason: Critical error prevention for healthcare applications
  'no-unsafe-optional-chaining': 'error',
  'no-unsafe-member-access': 'error',
  'no-unsafe-call': 'error',
  'no-unsafe-assignment': 'error',
  'no-unsafe-return': 'error',
  
  // #ai-reason: Ensure all health calculations have proper error handling
  'no-unreachable': 'error',
  'no-fallthrough': 'error',
  'no-implicit-coercion': 'error',
  'no-loss-of-precision': 'error',
  
  // #ai-reason: Prevent data corruption in health records
  'no-param-reassign': ['error', { props: true }],
  'no-shadow': 'error',
  'no-use-before-define': 'error',
  
  // #ai-reason: Enforce comprehensive documentation for medical calculations
  'valid-jsdoc': ['error', {
    requireReturn: true,
    requireParamDescription: true,
    requireReturnDescription: true,
    matchDescription: '@ai_context'
  }],
  
  // #ai-reason: TypeScript strict mode for type safety in health data
  '@typescript-eslint/strict-boolean-expressions': 'error',
  '@typescript-eslint/prefer-nullish-coalescing': 'error',
  '@typescript-eslint/prefer-optional-chain': 'error',
  '@typescript-eslint/no-non-null-assertion': 'error',
  
  // #ai-reason: Prevent console logs in production health applications
  'no-console': ['warn', { allow: ['warn', 'error'] }],
  
  // #ai-reason: Ensure consistent code style for maintainability
  'prettier/prettier': 'error',
  
  // #ai-reason: React best practices for health UI components
  'react-hooks/rules-of-hooks': 'error',
  'react-hooks/exhaustive-deps': 'error',
  'react/prop-types': 'off', // Using TypeScript instead
  'react/jsx-no-bind': 'error',
  'react/jsx-key': 'error'
};

/**
 * Custom ESLint rules for medical applications
 * @ai_context
 * - Validates presence of @ai_context markers in health functions
 * - Ensures critical health calculations have proper documentation
 * - Prevents unsafe patterns in patient data handling
 */
export const customMedicalRules = {
  // #ai-reason: Ensure all health calculation functions have AI context
  'require-ai-context': {
    create(context: any) {
      return {
        FunctionDeclaration(node: any) {
          const isHealthFunction = node.id?.name?.toLowerCase().includes('health') ||
                                  node.id?.name?.toLowerCase().includes('fitness') ||
                                  node.id?.name?.toLowerCase().includes('calculate');
          
          if (isHealthFunction) {
            const comments = context.getCommentsBefore?.(node) || [];
            const hasAiContext = comments.some((comment: any) => 
              comment.value.includes('@ai_context')
            );
            
            if (!hasAiContext) {
              context.report({
                node,
                message: 'Health-related functions must include @ai_context documentation'
              });
            }
          }
        }
      };
    }
  },
  
  // #ai-reason: Prevent direct mutation of health data objects
  'no-health-data-mutation': {
    create(context: any) {
      return {
        AssignmentExpression(node: any) {
          const varName = node.left?.object?.name?.toLowerCase() || '';
          if (varName.includes('health') || varName.includes('patient') || varName.includes('vital')) {
            context.report({
              node,
              message: 'Direct mutation of health data is not allowed. Use immutable updates.'
            });
          }
        }
      };
    }
  }
};
