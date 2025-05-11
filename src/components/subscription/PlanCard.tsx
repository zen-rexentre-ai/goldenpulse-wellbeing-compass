
import React from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlanType } from '@/types/subscription';

interface PlanCardProps {
  type: PlanType;
  title: string;
  price: string;
  features: {
    text: string;
    available: boolean;
    note?: string;
  }[];
  headerGradient: string;
  isFeatured?: boolean;
  onSelect: (plan: PlanType) => void;
}

const PlanCard = ({
  type,
  title,
  price,
  features,
  headerGradient,
  isFeatured = false,
  onSelect
}: PlanCardProps) => {
  const cardClasses = isFeatured ? "overflow-hidden shadow-lg border-golden-yellow border-2" : "overflow-hidden shadow-lg";
  const titleClasses = isFeatured ? "text-center text-golden-dark" : "text-center";
  const descriptionClasses = isFeatured ? "text-center text-xl font-bold mt-2 text-golden-dark" : "text-center text-xl font-bold mt-2";
  const secondaryDescClasses = isFeatured ? "text-center text-golden-dark" : "text-center";
  const buttonVariant = type === 'free' ? "outline" : "default";
  const buttonClasses = isFeatured ? "w-full bg-golden-purple hover:bg-golden-purple/90" : "w-full";

  return (
    <Card className={cardClasses}>
      <CardHeader className={headerGradient}>
        <CardTitle className={titleClasses}>{title}</CardTitle>
        <CardDescription className={descriptionClasses}>{price}</CardDescription>
        {price !== "0" && <CardDescription className={secondaryDescClasses}>per month</CardDescription>}
      </CardHeader>
      <CardContent className="pt-6">
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className={`flex items-center ${!feature.available ? 'text-muted-foreground' : ''}`}>
              {feature.available ? (
                <Check className="h-5 w-5 text-green-500 mr-2" />
              ) : (
                <X className="h-5 w-5 mr-2" />
              )}
              <span>{feature.text}</span>
              {feature.note && <span>{feature.note}</span>}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          className={buttonClasses} 
          variant={buttonVariant as any}
          onClick={() => onSelect(type)}
        >
          {type === 'free' ? 'Get Started' : `Choose ${title}`}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PlanCard;
