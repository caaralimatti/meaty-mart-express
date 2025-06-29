
import { useDeveloperAuth } from '@/hooks/useDeveloperAuth';
import DeveloperLogin from '@/components/developer/DeveloperLogin';
import DeveloperSettings from '@/components/developer/DeveloperSettings';

const DeveloperPage = () => {
  const { session, isAuthenticated, login, logout } = useDeveloperAuth();

  if (!isAuthenticated) {
    return <DeveloperLogin onLogin={login} />;
  }

  return (
    <DeveloperSettings 
      onLogout={logout} 
      username={session?.username || 'Developer'}
    />
  );
};

export default DeveloperPage;
