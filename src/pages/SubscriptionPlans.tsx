
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Calendar, Users, Brain, Heart, HelpingHand, UserRound, UsersRound } from 'lucide-react';
import { toast } from 'sonner';
import { Feature, FeatureCardProps, PlanType } from '@/types/subscription';
import PlanCard from '@/components/subscription/PlanCard';
import FeatureCard from '@/components/subscription/FeatureCard';
import ComparisonTable from '@/components/subscription/ComparisonTable';

const SubscriptionPlans = () => {
  const navigate = useNavigate();

  // Handle plan selection
  const handlePlanSelection = (plan: PlanType) => {
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
  };

  // Plan features for comparison table
  const features: Feature[] = [
    { name: 'Volunteering Access', free: true, basic: true, premium: true },
    { name: 'Community Module', free: 'Limited*', basic: true, premium: true },
    { name: 'Personalized Fitness Journey', free: false, basic: 'Limited', premium: true },
    { name: 'Six Month Medical Review', free: false, basic: false, premium: true },
    { name: 'Medical Team Consultations', free: false, basic: '2/Year', premium: '4/Year' },
    { name: 'Dependents Access', free: false, basic: false, premium: true },
    { name: 'Emergency & SoS Tracking', free: 'Basic', basic: true, premium: 'Advanced' },
    { name: 'AI Powered Diagnostics', free: false, basic: 'Basic', premium: 'Advanced' },
  ];

  const featureCards: FeatureCardProps[] = [
    {
      title: 'Volunteering',
      icon: <HelpingHand className="h-8 w-8 text-golden-purple" />,
      description: 'For users seeking purpose through volunteering opportunities in their community.',
      gradient: 'bg-gradient-to-br from-golden-pink to-golden-peach',
      textColor: 'text-golden-dark'
    },
    {
      title: 'Community Module',
      icon: <Users className="h-8 w-8 text-golden-purple" />,
      description: 'Connect, share, and grow with a vibrant member community of like-minded individuals.',
      gradient: 'bg-gradient-to-br from-golden-peach to-golden-yellow',
      textColor: 'text-golden-dark'
    },
    {
      title: 'Personalized Fitness Journey',
      icon: <Heart className="h-8 w-8 text-golden-purple" />,
      description: 'Tailored fitness plans and ongoing care from our specialist physician team.',
      gradient: 'bg-gradient-to-br from-golden-yellow to-golden-orange',
      textColor: 'text-golden-dark'
    },
    {
      title: 'Six Month Review',
      icon: <Calendar className="h-8 w-8 text-golden-purple" />,
      description: 'Comprehensive health review by our medical team every six months.',
      gradient: 'bg-gradient-to-br from-golden-orange to-golden-pink',
      textColor: 'text-golden-dark'
    },
    {
      title: 'Limited Medical Team Access',
      icon: <UserRound className="h-8 w-8 text-golden-purple" />,
      description: 'Up to 3 consults/month with Physio, GeriCare, Happiness Consultant, Sleep Therapist, or Yoga Master.',
      gradient: 'bg-gradient-to-br from-golden-pink to-golden-peach',
      textColor: 'text-golden-dark'
    },
    {
      title: 'Dependents Access',
      icon: <UsersRound className="h-8 w-8 text-golden-purple" />,
      description: 'Your dependents can access GoldenPulse for free.',
      gradient: 'bg-gradient-to-br from-golden-peach to-golden-yellow',
      textColor: 'text-golden-dark'
    },
    {
      title: 'Emergency & SoS Tracking',
      icon: <AlertTriangle className="h-8 w-8 text-golden-purple" />,
      description: 'Real-time emergency and SoS tracking for peace of mind.',
      gradient: 'bg-gradient-to-br from-golden-yellow to-golden-orange',
      textColor: 'text-golden-dark'
    },
    {
      title: 'AI Powered Diagnostics',
      icon: <Brain className="h-8 w-8 text-golden-purple" />,
      description: 'Advanced AI-driven health diagnostics for proactive care.',
      gradient: 'bg-gradient-to-br from-golden-orange to-golden-pink',
      textColor: 'text-golden-dark'
    },
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
        { text: 'Community Module', available: false, note: '* (Enabled after 3 volunteering sessions)' },
        { text: 'Medical Team Access', available: false }
      ],
    },
    {
      type: 'basic' as PlanType,
      title: 'Basic',
      price: 'Rs. 1000',
      headerGradient: 'bg-gradient-to-b from-blue-50 to-blue-100 border-b',
      features: [
        { text: 'All Free Features', available: true },
        { text: 'Personalized Fitness Journey', available: true },
        { text: '2 Medical Consultation/Year', available: true },
        { text: 'Community Module', available: true, note: ' * Enabled after 3 volunteering sessions' }
      ],
    },
    {
      type: 'premium' as PlanType,
      title: 'Premium',
      price: 'Rs. 2000',
      headerGradient: 'bg-gradient-to-b from-golden-yellow to-golden-orange border-b',
      features: [
        { text: 'All Basic Features', available: true },
        { text: 'Six Month Medical Review', available: true },
        { text: '4 Medical Consultations/Year', available: true },
        { text: 'Dependents Access', available: true },
        { text: 'Advanced AI Diagnostics', available: true }
      ],
      isFeatured: true
    }
  ];

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <h1 className="text-4xl font-bold text-center mb-6">Subscription Plans</h1>
      <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
        Choose the perfect plan for your wellness journey. Unlock premium features to enhance your health and well-being.
      </p>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 mb-16">
        {featureCards.map((card, index) => (
          <FeatureCard
            key={index}
            title={card.title}
            icon={card.icon}
            description={card.description}
            gradient={card.gradient}
            textColor={card.textColor}
          />
        ))}
      </div>
      
      {/* Plan Comparison */}
      <h2 className="text-3xl font-bold text-center mb-8">Detailed Plan Comparison</h2>
      <ComparisonTable features={features} />
    </div>
  );
};

export default SubscriptionPlans;
