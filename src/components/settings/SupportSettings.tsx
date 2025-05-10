
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { ExternalLink } from 'lucide-react';

export const SupportSettings: React.FC = () => {
  return (
    <div className="space-y-4">
      <div>
        <Button variant="outline" className="w-full justify-start" asChild>
          <a href="/help" className="flex justify-between w-full">
            <span>Help Center</span>
            <ExternalLink size={18} />
          </a>
        </Button>
      </div>
      
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full justify-start">
              <span className="flex justify-between w-full">
                <span>Terms of Service</span>
                <ExternalLink size={18} />
              </span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Terms of Service</DialogTitle>
            </DialogHeader>
            <div className="text-sm text-left">
              <h2 className="text-lg font-bold mt-4">1. Introduction</h2>
              <p className="my-2">
                Welcome to our health and wellness application. These Terms of Service govern your use of our application and services.
                By using our application, you agree to these terms. Please read them carefully.
              </p>
              
              <h2 className="text-lg font-bold mt-4">2. Using Our Services</h2>
              <p className="my-2">
                You must follow any policies made available to you within the Services.
                Don't misuse our Services. For example, don't interfere with our Services or try to access them using a method other than the interface and the instructions that we provide.
              </p>
              
              <h2 className="text-lg font-bold mt-4">3. Privacy and Copyright Protection</h2>
              <p className="my-2">
                Our privacy policies explain how we treat your personal data and protect your privacy when you use our Services.
                By using our Services, you agree that we can use such data in accordance with our privacy policies.
              </p>
              
              <h2 className="text-lg font-bold mt-4">4. Your Content in Our Services</h2>
              <p className="my-2">
                Some of our Services allow you to upload, submit, store, send or receive content.
                You retain ownership of any intellectual property rights that you hold in that content.
              </p>
              
              <h2 className="text-lg font-bold mt-4">5. Modifying and Terminating our Services</h2>
              <p className="my-2">
                We are constantly changing and improving our Services. We may add or remove functionalities or features,
                and we may suspend or stop a Service altogether.
              </p>
              
              <h2 className="text-lg font-bold mt-4">6. Our Warranties and Disclaimers</h2>
              <p className="my-2">
                We provide our Services using a commercially reasonable level of skill and care and we hope that you will enjoy using them.
                But there are certain things that we don't promise about our Services.
              </p>
              
              <h2 className="text-lg font-bold mt-4">7. Liability for our Services</h2>
              <p className="my-2">
                When permitted by law, we will not be responsible for lost profits, revenues, or data,
                financial losses or indirect, special, consequential, exemplary, or punitive damages.
              </p>
              
              <h2 className="text-lg font-bold mt-4">8. About these Terms</h2>
              <p className="my-2">
                We may modify these terms or any additional terms that apply to a Service to, for example,
                reflect changes to the law or changes to our Services.
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <div>
        <Button variant="outline" className="w-full justify-start">
          <span className="flex justify-between w-full">
            <span>Contact Support</span>
            <ExternalLink size={18} />
          </span>
        </Button>
      </div>
      
      <div className="pt-2">
        <p className="text-xs text-muted-foreground text-center">
          Version 1.0.0 • © 2025 Care Connect
        </p>
      </div>
    </div>
  );
};
