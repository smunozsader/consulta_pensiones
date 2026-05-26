'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export interface Subscriber {
  nombre: string;
  telefono: string;
  correo: string;
  semanas_cotizadas?: number;
  subscribedAt: string;
  accessCount: number;
  lastAccessDate?: string;
}

interface UseAccessTokenResult {
  token: string | null;
  isValid: boolean;
  subscriber: Subscriber | null;
  loading: boolean;
  error: string | null;
  verifyToken: (token: string) => Promise<boolean>;
}

const STORAGE_KEY = 'pension_access_token';
const SUBSCRIBER_KEY = 'pension_subscriber_data';

export function useAccessToken(): UseAccessTokenResult {
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string | null>(null);
  const [subscriber, setSubscriber] = useState<Subscriber | null>(null);
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const verifyToken = async (tokenToVerify: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/verify-token?token=${tokenToVerify}`);
      const data = await response.json();

      if (data.valid && data.subscriber) {
        setToken(tokenToVerify);
        setSubscriber(data.subscriber);
        setIsValid(true);
        localStorage.setItem(STORAGE_KEY, tokenToVerify);
        localStorage.setItem(SUBSCRIBER_KEY, JSON.stringify(data.subscriber));
        return true;
      } else {
        setError(data.error || 'Invalid token');
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(SUBSCRIBER_KEY);
        setToken(null);
        setSubscriber(null);
        setIsValid(false);
        return false;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Verification failed';
      setError(errorMessage);
      setIsValid(false);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initializeAccess = async () => {
      try {
        setLoading(true);

        // Check URL param for token (e.g., from email link)
        const tokenFromUrl = searchParams.get('token');
        if (tokenFromUrl) {
          // Verify token from email link
          const isValid = await verifyToken(tokenFromUrl);
          if (isValid) {
            // Remove token from URL to keep it clean
            window.history.replaceState({}, '', window.location.pathname);
          }
          return;
        }

        // Check localStorage for existing token
        const storedToken = localStorage.getItem(STORAGE_KEY);
        const storedSubscriber = localStorage.getItem(SUBSCRIBER_KEY);

        if (storedToken && storedSubscriber) {
          try {
            const subscriberData = JSON.parse(storedSubscriber);
            setToken(storedToken);
            setSubscriber(subscriberData);
            setIsValid(true);

            // Optionally re-verify the token to ensure it's still valid
            // Commented out to reduce API calls on every page load
            // await verifyToken(storedToken);
          } catch (e) {
            // Invalid stored data
            localStorage.removeItem(STORAGE_KEY);
            localStorage.removeItem(SUBSCRIBER_KEY);
            setIsValid(false);
            setError('Invalid stored token data');
          }
        }

        setLoading(false);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Initialization failed';
        setError(errorMessage);
        setLoading(false);
      }
    };

    initializeAccess();
  }, [searchParams]);

  return {
    token,
    isValid,
    subscriber,
    loading,
    error,
    verifyToken,
  };
}
