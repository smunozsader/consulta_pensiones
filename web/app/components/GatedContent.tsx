'use client';

import { useAccessToken } from '@/lib/useAccessToken';
import GateAccessForm from './GateAccessForm';
import { ReactNode } from 'react';

interface GatedContentProps {
  children: ReactNode;
  fallback?: ReactNode;
  requireToken?: boolean;
}

export default function GatedContent({
  children,
  fallback,
  requireToken = true,
}: GatedContentProps) {
  const { token, isValid, loading, error } = useAccessToken();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando acceso...</p>
        </div>
      </div>
    );
  }

  if (!requireToken) {
    return <>{children}</>;
  }

  if (isValid && token) {
    return <>{children}</>;
  }

  if (error && error !== 'Invalid stored token data') {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 my-8">
        <p className="text-red-800 font-semibold mb-4">
          ⚠️ Hubo un error al verificar tu acceso
        </p>
        <p className="text-red-700 mb-6">{error}</p>
        <div>
          {fallback || <GateAccessForm />}
        </div>
      </div>
    );
  }

  // No valid token - show fallback or form
  return (
    <div className="py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Accede a Contenido Educativo
          </h3>
          <p className="text-gray-700 mb-8">
            Registra tus datos para acceder a nuestro blog, calculadora de pensiones y casos de éxito.
            Te enviaremos un link de acceso a tu correo electrónico.
          </p>

          {fallback || <GateAccessForm />}
        </div>
      </div>
    </div>
  );
}
