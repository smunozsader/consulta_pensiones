'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

interface StripePaymentFormProps {
  clientSecret: string;
  amount: number;
  serviceName: string;
  onSuccess: () => void;
  onError: (error: string) => void;
}

export default function StripePaymentForm({
  clientSecret,
  amount,
  serviceName,
  onSuccess,
  onError,
}: StripePaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setErrorMessage('Stripe not loaded');
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/servicios?payment=success`,
        },
      });

      if (error) {
        setErrorMessage(error.message || 'Payment failed');
        onError(error.message || 'Payment failed');
      } else {
        onSuccess();
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Payment failed');
      onError(err.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (cents: number) => {
    return (cents / 100).toLocaleString('es-MX', {
      style: 'currency',
      currency: 'MXN',
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <p className="text-sm text-gray-600 mb-1">Servicio:</p>
        <p className="text-lg font-semibold text-gray-900">{serviceName}</p>
        <p className="text-sm text-gray-600 mt-3">Monto a pagar:</p>
        <p className="text-2xl font-bold text-blue-600">{formatPrice(amount)}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Trust Messaging */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-start gap-2">
          <span className="text-lg">🔒</span>
          <div className="text-sm text-green-800">
            <p className="font-semibold">Datos encriptados y seguros</p>
            <p className="text-xs mt-1">Tu información de pago es procesada por Stripe (PCI-DSS Level 1 certificado). LFPDPPP Cumplimiento.</p>
          </div>
        </div>

        <div>
          <label className="block text-gray-900 text-sm font-semibold mb-3">
            Información de Pago
          </label>
          <div className="bg-white p-4 rounded-lg border border-gray-300">
            <PaymentElement
              options={{
                layout: 'tabs',
                defaultValues: {
                  billingDetails: {
                    name: '',
                    email: '',
                  },
                },
              }}
            />
          </div>
        </div>

        {errorMessage && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-700">{errorMessage}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !stripe || !elements}
          className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Procesando pago...' : `Pagar ${formatPrice(amount)}`}
        </button>

        <p className="text-xs text-gray-500 text-center">
          Datos protegidos según LFPDPPP. <Link href="/privacidad" className="text-blue-600 hover:underline">Ver política de privacidad</Link>
        </p>
      </form>
    </div>
  );
}
