'use client';

import { Suspense, ReactNode } from 'react';
import GatedContent from './GatedContent';

interface GatedContentBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

function GatedContentInner({ children, fallback }: GatedContentBoundaryProps) {
  return <GatedContent fallback={fallback}>{children}</GatedContent>;
}

export default function GatedContentBoundary({
  children,
  fallback,
}: GatedContentBoundaryProps) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando...</p>
          </div>
        </div>
      }
    >
      <GatedContentInner fallback={fallback}>{children}</GatedContentInner>
    </Suspense>
  );
}
