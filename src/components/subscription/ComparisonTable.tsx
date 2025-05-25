
import React from 'react';
import { Check, X } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Feature } from '@/types/subscription';

interface ComparisonTableProps {
  features: Feature[];
}

const ComparisonTable = ({ features }: ComparisonTableProps) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow-lg mb-12 border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px] font-bold text-xl">Features</TableHead>
            <TableHead className="text-center w-[250px] font-bold text-xl bg-gradient-to-b from-gray-50 to-gray-100 border-b">Free</TableHead>
            <TableHead className="text-center w-[250px] font-bold text-xl bg-gradient-to-b from-blue-50 to-blue-100 border-b">Basic</TableHead>
            <TableHead className="text-center w-[250px] font-bold text-xl bg-gradient-to-b from-golden-yellow to-golden-orange border-b">Premium</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {features.map((feature, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">{feature.name}</TableCell>
              <TableCell className="text-center">
                {feature.free === true ? <Check className="mx-auto text-green-500" /> : 
                 feature.free === 'Basic' || feature.free === 'Limited' || feature.free === 'Recorded'? <span className="text-amber-500 text-sm">{feature.free}</span> : 
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
            <TableCell className="text-center font-bold">Rs. 1500</TableCell>
            <TableCell className="text-center font-bold bg-golden-yellow/10">Rs. 3000</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default ComparisonTable;
