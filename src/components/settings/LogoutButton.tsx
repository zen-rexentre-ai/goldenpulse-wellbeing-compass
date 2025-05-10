
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const LogoutButton: React.FC = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // In a real app, you would handle session/auth logout here
    toast.success('You have been logged out');
    
    // Navigate to login page
    navigate('/login');
  };
  
  return (
    <Button 
      variant="destructive" 
      className="w-full flex items-center justify-center gap-2" 
      onClick={handleLogout}
    >
      <LogOut size={18} />
      <span>Log out</span>
    </Button>
  );
};
