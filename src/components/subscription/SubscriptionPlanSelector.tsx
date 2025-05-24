
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Feature, PlanType } from '@/types/subscription';
import PlanCard from '@/components/subscription/PlanCard';
import ComparisonTable from '@/components/subscription/ComparisonTable';

interface SubscriptionPlanSelectorProps {
  navigateOnSelect?: boolean;
  onPlanSelected?: (plan: PlanType) => void;
  showComparisonTable?: boolean;
}

const SubscriptionPlanSelector: React.FC<SubscriptionPlanSelectorProps> = ({
  navigateOnSelect = true,
  onPlanSelected,
  showComparisonTable = true
}) => {
  const navigate = useNavigate();

  // Handle plan selection
  const handlePlanSelection = (plan: PlanType) => {
    if (onPlanSelected) {
      onPlanSelected(plan);
    }
    
    if (navigateOnSelect) {
      if (plan === 'premium') {
        // Only premium users get to complete the onboarding
        toast.success("Premium plan selected!", {
          description: "Complete onboarding to get started with all premium features."
        });
        navigate('/onboarding', { state: { fromPremiumSelection: true } });
      } else {
        // Free and basic users skip onboarding and go straight to dashboard
        toast.success(`${plan === 'free' ? 'Free' : 'Basic'} plan selected!`, {
          description: "Welcome to GoldenPulse!"
        });
        navigate('/dashboard');
      }
    }
  };

  // Plan features for comparison table
 const features: Feature[] = [
    { name: 'Personalized Wellness Journey', free: false, basic: true, premium: true },
    { name: 'Doctor Consultations', free: false, basic: 'Once Every 6 months', premium: 'Once Every 3 Months' },
	{ name: 'Specialist(Physio/Dietician/Mental Wellness Advisor) Consultations', free: false, basic: false, premium: 'Once Every 3 Months' },
    { name: 'Wellness Recommendation/Review by Medical Team', free: false, basic: false, premium: 'Once Every 3 Months' },
    { name: 'Wellness Webinars -  3 per week', free: false, basic: 'Fixed schedule', premium: 'Flexible Schedule' },
    { name: 'Wellness score with AI analytics and tailored recommendations', free: false, basic: 'Basic', premium: 'Advanced' },
    { name: 'Emergency & SoS Tracking', free: true, basic: true, premium: 'Advanced' },
  	{ name: 'Access to kin', free: false, basic: false, premium: true },
   
  	{ name: 'Volunteering Access', free: true, basic: true, premium: true },
    { name: 'Webinars for key needs (Digital Security/Hobbies/General Health)', free: 'Recorded', basic: true, premium: 'QnA Allowed' },
	{ name: 'User Groups', free: 'Enabled after 3 volunteering sessions', basic: true, premium: 'Advanced with AI' },
	{ name: 'Cognitive Games', free: false, basic: 'Limited', premium: true },
	];

  // Plan card configuration
  const planCards = [
    {
      type: 'free' as PlanType,
      title: 'Free',
      price: '0',
      headerGradient: 'bg-gradient-to-b from-gray-50 to-gray-100 border-b',
      features: [
        { text: 'Volunteering Access', available: true },
        { text: 'Basic Emergency Tracking', available: true },
        { text: 'Community Module**      **Enabled after 3 volunteering sessions ', available: true},

       
      ],
    },
    {
      type: 'basic' as PlanType,
      title: 'Basic',
      price: 'Rs. 1000',
      headerGradient: 'bg-gradient-to-b from-blue-50 to-blue-100 border-b',
      features: [
        { text: 'All Free Features', available: true },
        { text: 'Personalized Wellness Journey', available: true },
        { text: 'Medical Team Review : Once Every 6 months', available: true },
        { text: 'Community Module', available: true}
      ],
    },
    {
      type: 'premium' as PlanType,
      title: 'Premium',
      price: 'Rs. 2000',
      headerGradient: 'bg-gradient-to-b from-golden-yellow to-golden-orange border-b',
      features: [
        { text: 'All Basic Features', available: true },
        { text: 'Medical Team Review : Once every 3 months', available: true },
        { text: 'Access to Kin', available: true },
        { text: 'Advanced AI Diagnostics', available: true }
      ],
      isFeatured: true
    }
  ];

  return (
    <div>
      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {planCards.map((plan, index) => (
          <PlanCard
            key={index}
            type={plan.type}
            title={plan.title}
            price={plan.price}
            features={plan.features}
            headerGradient={plan.headerGradient}
            isFeatured={plan.isFeatured}
            onSelect={handlePlanSelection}
          />
        ))}
      </div>

      {/* Comparison table */}
      {showComparisonTable && (
        <>
          <h2 className="text-3xl font-bold text-center mb-8">Detailed Plan Comparison</h2>
          <ComparisonTable features={features} />
        </>
      )}
    </div>
  );
};

export default SubscriptionPlanSelector;
