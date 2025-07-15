
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

interface DeveloperLoginProps {
  onLogin: (username: string, password: string) => boolean;
}

const DeveloperLogin = ({ onLogin }: DeveloperLoginProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast.error('Please enter both username and password');
      return;
    }

    setIsLoading(true);
    
    // Simulate a small delay for better UX
    setTimeout(() => {
      const success = onLogin(username, password);
      
      if (success) {
        toast.success('Developer access granted');
      } else {
        toast.error('Invalid credentials');
        setPassword(''); // Clear password on failed attempt
      }
      
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-emerald-200/50 bg-gradient-to-br from-white/80 to-emerald-50/80 backdrop-blur-md shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] hover:shadow-[0_8px_32px_0_rgba(16,185,129,0.4)] transition-all duration-300">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-green-600/20 rounded-full flex items-center justify-center mb-4 border border-emerald-200/50">
            <Shield className="w-6 h-6 text-emerald-600" />
          </div>
          <CardTitle className="text-2xl text-emerald-900 font-semibold">Developer Access</CardTitle>
          <p className="text-emerald-600">QuickGoat Development Panel</p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-emerald-800 font-medium">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter developer username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-white/70 border-emerald-200 text-emerald-900 placeholder-emerald-500/70 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200/50 backdrop-blur-sm transition-all duration-300"
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-emerald-800 font-medium">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter developer password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/70 border-emerald-200 text-emerald-900 placeholder-emerald-500/70 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200/50 backdrop-blur-sm transition-all duration-300 pr-10"
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 text-emerald-600 hover:text-emerald-800 hover:bg-emerald-100/50 transition-all duration-300"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-medium shadow-[0_4px_16px_0_rgba(16,185,129,0.3)] hover:shadow-[0_6px_20px_0_rgba(16,185,129,0.4)] transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? 'Authenticating...' : 'Access Developer Panel'}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-xs text-emerald-600/70">
              Authorized personnel only
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeveloperLogin;
