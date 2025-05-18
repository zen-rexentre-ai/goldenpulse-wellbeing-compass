
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { signOut } from '@/services/authService';

export const LogoutButton: React.FC = () => {
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    const result = await signOut();
    
    if (result.success) {
      // Navigate to login page after successful logout
      navigate('/login');
    }
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
