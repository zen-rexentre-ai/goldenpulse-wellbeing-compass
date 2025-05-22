
import React, { ReactNode } from 'react';
import { EmbossedCard } from '@/components/ui/card';

interface ModuleCardProps {
  title: string;
  items: string[];
  gradientClasses: string;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ title, items, gradientClasses }) => {
  return (
    <EmbossedCard className="overflow-hidden">
      <div className={`${gradientClasses} p-6 h-full`}>
        <h3 className="text-xl font-bold mb-3 text-golden-dark">{title}</h3>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-primary text-lg">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </EmbossedCard>
  );
};

export default ModuleCard;
