import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Check, X, AlertTriangle, Calendar, Users, Brain, Heart, HelpingHand, UserRound, UsersRound } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const SubscriptionPlans = () => {
  const navigate = useNavigate();

  // Handle plan selection
  const handlePlanSelection = (plan: 'free' | 'basic' | 'premium') => {
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
  const features = [
    { name: 'Volunteering Access', free: true, basic: true, premium: true },
    { name: 'Community Module', free: 'Limited*', basic: true, premium: true },
    { name: 'Personalized Fitness Journey', free: false, basic: 'Limited', premium: true },
    { name: 'Six Month Medical Review', free: false, basic: false, premium: true },
    { name: 'Medical Team Consultations', free: false, basic: '2/Year', premium: '4/Year' },
    { name: 'Dependents Access', free: false, basic: false, premium: true },
    { name: 'Emergency & SoS Tracking', free: 'Basic', basic: true, premium: 'Advanced' },
    { name: 'AI Powered Diagnostics', free: false, basic: 'Basic', premium: 'Advanced' },
  ];

  const featureCards = [
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

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <h1 className="text-4xl font-bold text-center mb-6">Subscription Plans</h1>
      <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
        Choose the perfect plan for your wellness journey. Unlock premium features to enhance your health and well-being.
      </p>

            {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Free Plan */}
        <Card className="overflow-hidden shadow-lg">
          <CardHeader className="bg-gradient-to-b from-gray-50 to-gray-100 border-b">
            <CardTitle className="text-center">Free</CardTitle>
            <CardDescription className="text-center text-xl font-bold mt-2">0</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-2">
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>Volunteering Access</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>Basic Emergency Tracking</span>
              </li>
              <li className="flex items-center text-muted-foreground">
                <X className="h-5 w-5 mr-2" />
                <span>Community Module*</span>
              </li>
              <li className="flex items-center text-muted-foreground">
                <X className="h-5 w-5 mr-2" />
                <span>Medical Team Access</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant="outline" onClick={() => handlePlanSelection('free')}>
              Get Started
            </Button>
            *Access enabled after completion of 3 volunteering sessions
          </CardFooter>
        </Card>

        {/* Basic Plan */}
        <Card className="overflow-hidden shadow-lg">
          <CardHeader className="bg-gradient-to-b from-blue-50 to-blue-100 border-b">
            <CardTitle className="text-center">Basic</CardTitle>
            <CardDescription className="text-center text-xl font-bold mt-2">Rs. 1000</CardDescription>
            <CardDescription className="text-center">per month</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-2">
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>All Free Features</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>Personalized Fitness Journey</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>2 Medical Consultation/Year</span>
              </li>
                <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>Community Module</span>
                <span> * Enabled after 3 volunteering sessions</span>
              </li>
            </ul>
            
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => handlePlanSelection('basic')}>
              Choose Basic
            </Button>
          </CardFooter>
        </Card>

        {/* Premium Plan */}
        <Card className="overflow-hidden shadow-lg border-golden-yellow border-2">
            <CardHeader className="bg-gradient-to-b from-golden-yellow to-golden-orange border-b">
            <CardTitle className="text-center text-golden-dark">Premium</CardTitle>
            <CardDescription className="text-center text-xl font-bold mt-2 text-golden-dark">Rs. 2000</CardDescription>
            <CardDescription className="text-center text-golden-dark">per month</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-2">
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>All Basic Features</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>Six Month Medical Review</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>4 Medical Consultations/Year</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>Dependents Access</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>Advanced AI Diagnostics</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-golden-purple hover:bg-golden-purple/90" onClick={() => handlePlanSelection('premium')}>
              Choose Premium
            </Button>
          </CardFooter>
        </Card>
      </div>

            {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {featureCards.map((card, index) => (
          <Card key={index} className={cn("overflow-hidden shadow-lg transform transition-all hover:scale-105", card.gradient)}>
            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-0"></div>
            <CardHeader className="relative z-10">
              <div className="flex items-center justify-center mb-4 p-3 rounded-full bg-white/80 w-16 h-16 mx-auto shadow-inner">
                {card.icon}
              </div>
              <CardTitle className={cn("text-center", card.textColor)}>{card.title}</CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <CardDescription className={cn("text-center font-medium", card.textColor)}>
                {card.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Plan Comparison */}
      <h2 className="text-3xl font-bold text-center mb-8">Detailed Plan Comparison</h2>
      
      <div className="overflow-x-auto rounded-lg shadow-lg mb-12 border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Features</TableHead>
              <TableHead className="text-center">Free</TableHead>
              <TableHead className="text-center">Basic</TableHead>
              <TableHead className="text-center bg-golden-yellow/20">Premium</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {features.map((feature, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{feature.name}</TableCell>
                <TableCell className="text-center">
                  {feature.free === true ? <Check className="mx-auto text-green-500" /> : 
                   feature.free === 'Basic' || feature.free === 'Limited' ? <span className="text-amber-500 text-sm">{feature.free}</span> : 
                   <X className="mx-auto text-red-400" />}
                </TableCell>
                <TableCell className="text-center">
                  {feature.basic === true ? <Check className="mx-auto text-green-500" /> : 
                   typeof feature.basic === 'string' ? <span className="text-amber-500 text-sm">{feature.basic}</span> : 
                   <X className="mx-auto text-red-400" />}
                </TableCell>
                <TableCell className="text-center bg-golden-yellow/10">
                  {feature.premium === true ? <Check className="mx-auto text-green-500" /> : 
                   typeof feature.premium === 'string' ? <span className="text-amber-500 text-sm">{feature.premium}</span> : 
                   <X className="mx-auto text-red-400" />}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell className="font-medium">Monthly Price</TableCell>
              <TableCell className="text-center font-bold">Rs. 0</TableCell>
              <TableCell className="text-center font-bold">Rs. 1000</TableCell>
              <TableCell className="text-center font-bold bg-golden-yellow/10">Rs. 2000</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

  </div>
  );
};

export default SubscriptionPlans;
