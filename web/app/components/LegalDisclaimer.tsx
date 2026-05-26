import React from 'react';

interface LegalDisclaimerProps {
  variant?: 'full' | 'compact' | 'calculator';
}

export default function LegalDisclaimer({ variant = 'full' }: LegalDisclaimerProps) {
  if (variant === 'compact') {
    return (
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <span className="text-xl">⚠️</span>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-800">
              <strong>Estimativo legal:</strong> Esta información se basa en la Ley del Seguro Social vigente (Mayo 2026).
              Valida cada caso con IMSS antes de tomar decisiones.{' '}
              <a href="/privacidad" className="underline font-semibold hover:text-yellow-900">
                Ver detalles legales
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'calculator') {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-5 mb-6 rounded">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <span className="text-2xl">⚠️</span>
          </div>
          <div className="ml-3">
            <h3 className="font-bold text-red-900 mb-2">IMPORTANTE: Información Estimativa</h3>
            <ul className="text-sm text-red-800 space-y-1 list-disc list-inside">
              <li>Los valores mostrados son <strong>estimativos</strong> basados en normativa Mayo 2026</li>
              <li>Validado contra: Ley del Seguro Social (Art. 218-239), Reglamento IMSS</li>
              <li>Cada caso requiere <strong>validación individual</strong> con IMSS</li>
              <li>Consulta tu estado de cuenta IMSS oficial antes de decidir</li>
            </ul>
            <p className="text-red-800 font-semibold mt-2 text-xs">
              ❌ ESTA INFORMACIÓN NO SUSTITUYE ASESORÍA PROFESIONAL
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Full variant (default)
  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-8 rounded-r-lg">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 text-2xl">⚠️</div>
        <div className="flex-1">
          <h3 className="font-bold text-yellow-900 mb-3 text-base">DISCLAIMER LEGAL IMPORTANTE</h3>

          <div className="text-sm text-yellow-800 space-y-2 mb-3">
            <p>
              <strong>Esta información ha sido validada contra:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Ley del Seguro Social vigente (Artículos 218-239)</li>
              <li>Reglamento IMSS en Materia de Afiliación (RLSSMACERF)</li>
              <li>Normativa vigente Mayo 2026</li>
            </ul>
          </div>

          <div className="text-sm text-yellow-800 space-y-2 mb-3">
            <p>
              <strong>⚠️ CADA CASO REQUIERE VALIDACIÓN INDIVIDUAL:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Estado de cuenta IMSS oficial</li>
              <li>Asesor certificado en pensiones</li>
              <li>IMSS directamente para validación final</li>
            </ul>
          </div>

          <div className="text-sm text-yellow-800 space-y-2 mb-3">
            <p>
              <strong>Los números son ESTIMATIVOS basados en:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Proyecciones de UMA 2026-2030</li>
              <li>Tasas de Modalidad 40 2025-2030 (oficiales)</li>
              <li>Fórmulas de cálculo estándar IMSS</li>
            </ul>
          </div>

          <p className="text-red-800 font-bold text-sm bg-red-100 p-2 rounded border border-red-300">
            ❌ ESTA INFORMACIÓN NO SUSTITUYE ASESORÍA PROFESIONAL.
            <br />
            La Ley del Seguro Social es compleja y cada caso es único.
          </p>
        </div>
      </div>
    </div>
  );
}
