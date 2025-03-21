// components/ProtectedRoute.js
"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { ReactNode } from 'react';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    // Check if the access_token cookie exists
    const accessToken = Cookies.get('access_token');
    if (!accessToken) {
      // Redirect to the login page if not authenticated
      router.push('/login');
    }
  }, [router]);

  return <>{children}</>;
};

export default ProtectedRoute;