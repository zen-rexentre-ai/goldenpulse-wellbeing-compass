
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
import WellnessAnalysis from "./pages/WellnessAnalysis";
import EmergencyContacts from "./pages/EmergencyContacts";
import Games from "./pages/Games";
import Volunteering from "./pages/Volunteering";
import Webinars from "./pages/Webinars";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import SubscriptionPlans from "./pages/SubscriptionPlans";

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
                <Route path="/wellness-analysis" element={<WellnessAnalysis />} />
                <Route path="/emergency-contacts" element={<EmergencyContacts />} />
                <Route path="/games" element={<Games />} />
                <Route path="/volunteering" element={<Volunteering />} />
                <Route path="/webinars" element={<Webinars />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/subscription-plans" element={<SubscriptionPlans />} />
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
