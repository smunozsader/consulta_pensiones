'use client';

import { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import ServiceRequestForm from './ServiceRequestForm';
import StripePaymentForm from './StripePaymentForm';

let stripePromise: any = null;

const getStripe = () => {
  if (!stripePromise && typeof window !== 'undefined') {
    // Stripe is loaded from CDN in root layout
    const stripe = (window as any).Stripe;
    if (stripe) {
      stripePromise = stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');
    }
  }
  return stripePromise;
};

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
  const [formData, setFormData] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stripe, setStripe] = useState<any>(null);

  useEffect(() => {
    if (isOpen && !stripe) {
      // Wait for Stripe to be loaded from CDN
      const checkStripe = () => {
        const stripeInstance = getStripe();
        if (stripeInstance) {
          setStripe(stripeInstance);
        } else {
          setTimeout(checkStripe, 100);
        }
      };
      checkStripe();
    }
  }, [isOpen, stripe]);

  const handleFormSubmit = async (data: any) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: price * 100,
          serviceId,
          serviceName,
          ...data,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      const paymentData = await response.json();
      setClientSecret(paymentData.clientSecret);
      setFormData(data);
      setStage('payment');
    } catch (err: any) {
      setError(err.message || 'Error creating payment');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    setStage('success');
  };

  const handlePaymentError = (errorMessage: string) => {
    setError(errorMessage);
  };

  const handleClose = () => {
    setStage('form');
    setFormData(null);
    setClientSecret(null);
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
              {stage === 'payment' && 'Información de Pago'}
              {stage === 'success' && '✓ Solicitud Enviada'}
            </h2>
            {stage !== 'payment' && (
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                ×
              </button>
            )}
          </div>

          <div className="p-6">
            {stage === 'form' && (
              <ServiceRequestForm
                serviceName={serviceId}
                onSubmit={handleFormSubmit}
                loading={loading}
              />
            )}

            {stage === 'payment' && clientSecret && stripe && (
              <Elements
                stripe={stripe}
                options={{
                  clientSecret,
                  appearance: {
                    theme: 'stripe',
                    variables: {
                      colorPrimary: '#2563eb',
                      colorText: '#1f2937',
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
                    },
                  },
                }}
              >
                <StripePaymentForm
                  clientSecret={clientSecret}
                  amount={price * 100}
                  serviceName={serviceName}
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                />
              </Elements>
            )}

            {stage === 'success' && (
              <div className="text-center py-12">
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
                    ¡Tu solicitud fue enviada!
                  </h3>
                  <p className="text-lg text-gray-600 mb-6">
                    Hemos recibido tu solicitud de <strong>{serviceName}</strong>
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                  <p className="text-gray-700 mb-4">
                    Hemos enviado una confirmación a tu email.
                    <br />
                    <strong>Nos contactaremos por WhatsApp en las próximas 24 horas</strong>
                    para:
                  </p>
                  <ul className="text-sm text-gray-600 text-left space-y-2 inline-block">
                    <li>✓ Confirmar los detalles de tu solicitud</li>
                    <li>✓ Validar documentación requerida</li>
                    <li>✓ Explicar los próximos pasos</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <p className="text-gray-600 mb-4">
                    ¿Preguntas antes de entonces? Contacta directamente:
                  </p>
                  <a
                    href="https://wa.me/529992005550"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold transition"
                  >
                    Contactar por WhatsApp
                  </a>
                  <div>
                    <button
                      onClick={handleClose}
                      className="inline-block text-blue-600 hover:text-blue-700 font-semibold mt-4"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
                <p className="text-red-700">{error}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
