
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface HealthFocusItem {
  name: string;
  value: string;
  status: string;
  recommendation: string;
}

interface HealthFocusWidgetProps {
  healthFocus: HealthFocusItem[];
  toggleWidget: (widgetName: string) => void;
}

export const HealthFocusWidget: React.FC<HealthFocusWidgetProps> = ({ healthFocus, toggleWidget }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Health Areas to Focus</h2>
        <Button variant="outline" size="sm" onClick={() => toggleWidget('Health Focus')}>
          Customize
        </Button>
      </div>
      
      {healthFocus.map((item, index) => (
        <Card key={index} className={item.status === 'warning' ? 'border-amber-300' : 'border-green-300'}>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{item.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold">{item.value}</span>
                  <Badge 
                    variant={item.status === 'warning' ? 'default' : 'secondary'}
                    className={item.status === 'warning' ? 'bg-amber-500' : 'bg-green-500'}
                  >
                    {item.status}
                  </Badge>
                </div>
              </div>
              <div className="text-right max-w-[50%]">
                <p className="text-sm text-muted-foreground">{item.recommendation}</p>
                <Button variant="link" className="p-0 h-auto mt-1">Learn more</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      <Button variant="outline" className="w-full">View Health Report</Button>
    </div>
  );
};
