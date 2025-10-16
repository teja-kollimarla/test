import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useUser } from '@/contexts/UserContext';

export default function Index() {
  const router = useRouter();
  const { isAuthenticated, role, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated && role) {
        router.replace(`/${role}` as any);
      } else {
        router.replace('/(auth)/landing' as any);
      }
    }
  }, [isAuthenticated, role, isLoading, router]);

  return null;
}
