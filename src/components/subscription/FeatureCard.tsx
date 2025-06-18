
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { FeatureCardProps } from '@/types/subscription';

const FeatureCard = ({ title, icon, description, gradient, textColor }: FeatureCardProps) => {
  return (
    <Card className={cn("overflow-hidden shadow-lg transform transition-all hover:scale-105", gradient)}>
      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-0"></div>
      <CardHeader className="relative z-10">
        <div className="flex items-center justify-center mb-4 p-3 rounded-full bg-white/80 w-16 h-16 mx-auto shadow-inner">
          {icon}
        </div>
        <CardTitle className={cn("text-center", textColor)}>{title}</CardTitle>
      </CardHeader>
      <CardContent className="relative z-10">
        <CardDescription className={cn("text-center font-medium", textColor)}>
          {Array.isArray(description) ? (
            <ul className="space-y-2 text-left">
              {description.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-golden-dark text-lg mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            description
          )}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
