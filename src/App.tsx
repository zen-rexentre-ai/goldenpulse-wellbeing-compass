import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";
import { SubscriptionProvider } from "@/contexts/SubscriptionContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute, PublicRoute } from "@/components/auth/ProtectedRoute";

// Import pages
import Index from "@/pages/Index";
import Welcome from "@/pages/Welcome";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ForgotPassword from "@/pages/ForgotPassword";
import Dashboard from "@/pages/Dashboard";
import Onboarding from "@/pages/Onboarding";
import WellnessCalculator from "@/pages/WellnessCalculator";
import WellnessAnalysis from "@/pages/WellnessAnalysis";
import PersonalWellnessFeatures from "@/pages/PersonalWellnessFeatures";
import SubscriptionPlans from "@/pages/SubscriptionPlans";
import Settings from "@/pages/Settings";
import EmergencyContacts from "@/pages/EmergencyContacts";
import Entertainment from "@/pages/Entertainment";
import Games from "@/pages/Games";
import Engagement from "@/pages/Engagement";
import EngagementFeatures from "@/pages/EngagementFeatures";
import Volunteering from "@/pages/Volunteering";
import Webinars from "@/pages/Webinars";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <SubscriptionProvider>
              <Router>
                <div className="App">
                  <Routes>
                    {/* Public routes */}
                    <Route path="/" element={<Index />} />
                    <Route path="/welcome" element={<Welcome />} />
                    <Route path="/wellness-calculator" element={<WellnessCalculator />} />
                    <Route path="/wellness-analysis" element={<WellnessAnalysis />} />
                    <Route path="/personal-wellness-features" element={<PersonalWellnessFeatures />} />
                    <Route path="/engagement-features" element={<EngagementFeatures />} />
                    <Route path="/entertainment" element={<Entertainment />} />
                    <Route path="/games" element={<Games />} />
                    <Route path="/webinars" element={<Webinars />} />
                    
                    {/* Auth routes - redirect to dashboard if already logged in */}
                    <Route path="/login" element={
                      <PublicRoute>
                        <Login />
                      </PublicRoute>
                    } />
                    <Route path="/register" element={
                      <PublicRoute>
                        <Register />
                      </PublicRoute>
                    } />
                    <Route path="/forgot-password" element={
                      <PublicRoute>
                        <ForgotPassword />
                      </PublicRoute>
                    } />
                    
                    {/* Protected routes - require authentication */}
                    <Route path="/dashboard" element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    } />
                    <Route path="/onboarding" element={
                      <ProtectedRoute>
                        <Onboarding />
                      </ProtectedRoute>
                    } />
                    <Route path="/personal-wellness" element={
                      <ProtectedRoute>
                        <PersonalWellnessFeatures />
                      </ProtectedRoute>
                    } />
                    <Route path="/subscription-plans" element={
                      <ProtectedRoute>
                        <SubscriptionPlans />
                      </ProtectedRoute>
                    } />
                    <Route path="/settings" element={
                      <ProtectedRoute>
                        <Settings />
                      </ProtectedRoute>
                    } />
                    <Route path="/emergency-contacts" element={
                      <ProtectedRoute>
                        <EmergencyContacts />
                      </ProtectedRoute>
                    } />
                    <Route path="/entertainment" element={
                      <ProtectedRoute>
                        <Entertainment />
                      </ProtectedRoute>
                    } />
                    <Route path="/games" element={
                      <ProtectedRoute>
                        <Games />
                      </ProtectedRoute>
                    } />
                    <Route path="/engagement" element={
                      <ProtectedRoute>
                        <Engagement />
                      </ProtectedRoute>
                    } />
                    <Route path="/engagement-features" element={
                      <ProtectedRoute>
                        <EngagementFeatures />
                      </ProtectedRoute>
                    } />
                    <Route path="/volunteering" element={
                      <ProtectedRoute>
                        <Volunteering />
                      </ProtectedRoute>
                    } />
                    <Route path="/webinars" element={
                      <ProtectedRoute>
                        <Webinars />
                      </ProtectedRoute>
                    } />
                    
                    {/* 404 route */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                  <Toaster />
                </div>
              </Router>
            </SubscriptionProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;