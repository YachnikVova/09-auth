'use client';

import { useEffect, useState } from 'react';
import { checkSession, getMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

interface Props {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: Props) {
  const [loading, setLoading] = useState(true);
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore((state) => state.clearIsAuthenticated);

  useEffect(() => {
    const fetchSession = async () => {
      const isAuthenticated = await checkSession();
      if (isAuthenticated) {
        const user = await getMe();
        setUser(user);
      } else {
        clearIsAuthenticated();
      }
      setLoading(false);
    };

    fetchSession();
  }, [setUser, clearIsAuthenticated]);

  return loading ? <p>Loading...</p> : <>{children}</>;
}
