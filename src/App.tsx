
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";
import { SubscriptionProvider } from "@/contexts/SubscriptionContext";

// Pages
import Welcome from "./pages/Welcome";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import EmergencyContacts from "./pages/EmergencyContacts";
import Engagement from "./pages/Engagement";
import Volunteering from "./pages/Volunteering";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import SubscriptionPlans from "./pages/SubscriptionPlans";
import WellnessCalculator from "./pages/WellnessCalculator";
import PersonalWellnessFeatures from "./pages/PersonalWellnessFeatures";
import EngagementFeatures from "./pages/EngagementFeatures";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <SubscriptionProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/welcome" element={<Welcome />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/emergency-contacts" element={<EmergencyContacts />} />
                <Route path="/engagement" element={<Engagement />} />
                <Route path="/volunteering" element={<Volunteering />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/subscription-plans" element={<SubscriptionPlans />} />
                <Route path="/wellness-calculator" element={<WellnessCalculator />} />
                <Route path="/personal-wellness-features" element={<PersonalWellnessFeatures />} />
                <Route path="/engagement-features" element={<EngagementFeatures />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </SubscriptionProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
