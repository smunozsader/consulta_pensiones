'use client';

import { useState } from 'react';
import ServiceRequestForm from './ServiceRequestForm';

interface ServiceRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
  serviceId: string;
  price: number;
}

type ModalStage = 'form' | 'payment' | 'success';

export default function ServiceRequestModal({
  isOpen,
  onClose,
  serviceName,
  serviceId,
  price,
}: ServiceRequestModalProps) {
  const [stage, setStage] = useState<ModalStage>('form');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (data: any) => {
    setLoading(true);
    setError(null);

    try {
      // Save service request to Firebase
      const response = await fetch('/api/service-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serviceId,
          serviceName,
          price,
          ...data,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al procesar tu solicitud');
      }

      setStage('payment');
    } catch (err: any) {
      setError(err.message || 'Error procesando solicitud');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setStage('form');
    setError(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={handleClose}
      />

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">
              {stage === 'form' && `Solicitar: ${serviceName}`}
              {stage === 'payment' && 'Pagar con CoDi'}
              {stage === 'success' && '✓ Solicitud Registrada'}
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              ×
            </button>
          </div>

          <div className="p-6">
            {stage === 'form' && (
              <ServiceRequestForm
                serviceName={serviceId}
                onSubmit={handleFormSubmit}
                loading={loading}
              />
            )}

            {stage === 'payment' && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Pagar Transferencia Inmediata</h3>
                  <p className="text-gray-600">
                    Escanea el código QR con tu app bancaria para realizar la transferencia
                  </p>
                </div>

                {/* QR Code Box */}
                <div className="bg-white border-4 border-gray-800 rounded-lg p-6 text-center">
                  <div className="mb-4 space-y-2">
                    <p className="text-sm font-semibold text-gray-600">Banco Banamex - CoDi®</p>
                    <p className="text-4xl font-bold text-blue-600">
                      ${price.toLocaleString('es-MX')}
                    </p>
                    <p className="text-xs text-gray-500">
                      Beneficiario: SERGIO MU OZ DE ALBA MEDRANO
                    </p>
                  </div>

                  {/* QR Placeholder - will be replaced with actual image when provided */}
                  <div className="bg-gray-100 p-4 rounded inline-block mb-4">
                    <div className="w-80 h-80 bg-gradient-to-br from-gray-200 to-gray-300 rounded flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-gray-600 font-semibold">📱 Código QR CoDi</p>
                        <p className="text-xs text-gray-500 mt-2">
                          {serviceId === 'analisis-actuarial' ? 'Análisis Actuarial' : 'Servicio de Gestión'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 mt-2">
                    Válido para: {new Date(Date.now() + 24*60*60*1000).toLocaleDateString('es-MX')}
                  </p>
                </div>

                {/* Instructions */}
                <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-4">
                  <h4 className="font-bold text-blue-900 mb-3">Cómo pagar:</h4>
                  <ol className="space-y-2 text-blue-800 text-sm">
                    <li><strong>1.</strong> Abre tu app bancaria (BBVA, Banamex, Santander, etc.)</li>
                    <li><strong>2.</strong> Busca la opción "Escanear QR", "CoDi" o "Transferencia QR"</li>
                    <li><strong>3.</strong> Apunta tu cámara al código arriba</li>
                    <li><strong>4.</strong> Revisa los datos y confirma (SPEI instantáneo ~5 segundos)</li>
                  </ol>
                </div>

                {/* Alternative Method */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-700 mb-3">
                    ¿Tu app no lee QR? Contacta por WhatsApp para detalles manuales
                  </p>
                  <a
                    href="https://wa.me/529992005550"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm font-semibold"
                  >
                    💬 WhatsApp
                  </a>
                </div>

                {/* Confirmation */}
                <button
                  onClick={() => setStage('success')}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition"
                >
                  ✓ Ya Realicé la Transferencia
                </button>
              </div>
            )}

            {stage === 'success' && (
              <div className="text-center py-8">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-4">
                    <svg
                      className="h-10 w-10 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    ¡Solicitud Registrada!
                  </h3>
                  <p className="text-gray-600">
                    Tu solicitud de <strong>{serviceName}</strong> ha sido registrada en nuestro sistema
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6 text-left text-sm">
                  <h4 className="font-bold text-gray-900 mb-3">¿Qué sucede ahora?</h4>
                  <ol className="space-y-2 text-gray-700">
                    <li><strong>1.</strong> Monitoreamos tu transferencia (SPEI instantáneo)</li>
                    <li><strong>2.</strong> Confirmamos recepción por WhatsApp o email</li>
                    <li><strong>3.</strong> Iniciaremos tu trabajo (2-8 semanas según servicio)</li>
                    <li><strong>4.</strong> Te mantendremos actualizado del progreso</li>
                  </ol>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 text-sm">
                  <p className="text-amber-900">
                    <strong>⏱️ Nota:</strong> Si no recibimos tu transferencia en 24 horas,
                    nos contactaremos contigo automáticamente por WhatsApp
                  </p>
                </div>

                <a
                  href="https://wa.me/529992005550"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition mb-3"
                >
                  💬 Contactar por WhatsApp
                </a>

                <button
                  onClick={handleClose}
                  className="w-full text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Cerrar
                </button>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
