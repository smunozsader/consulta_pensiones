'use client';

import Link from 'next/link';
import { useState } from 'react';
import Footer from '@/app/components/Footer';
import ActuarialAnalysisForm from '@/app/components/ActuarialAnalysisForm';
import ActuarialAnalysisDisplay from '@/app/components/ActuarialAnalysisDisplay';
import { generateActuarialAnalysis, ClientData, ActuarialAnalysis } from '@/lib/actuarial-service';

type PageStep = 'form' | 'review' | 'payment' | 'success';

export default function AnalisisActuarialPage() {
  const [step, setStep] = useState<PageStep>('form');
  const [analysis, setAnalysis] = useState<ActuarialAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (formData: ClientData) => {
    setLoading(true);
    setError(null);

    try {
      // Generar análisis actuarial
      const generatedAnalysis = generateActuarialAnalysis(formData);
      setAnalysis(generatedAnalysis);
      setStep('review');

      // TODO: Guardar análisis en Firebase
      // TODO: Enviar email de confirmación
    } catch (err: any) {
      setError(err.message || 'Error generando análisis');
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    // TODO: Implementar generación de PDF
    alert('Función de descarga PDF - próximamente disponible');
  };

  const handleRequestGestoria = () => {
    // Redirigir a página de servicios con pre-selección de gestoría
    window.location.href = '/servicios?service=pension-gestoria';
  };

  const proceedToPayment = async () => {
    if (!analysis) return;

    setLoading(true);
    setError(null);

    try {
      // Crear PaymentIntent en Stripe
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: 499000, // $4,990 en centavos
          serviceName: 'Análisis Actuarial Completo',
          serviceId: 'analisis-actuarial',
          clientEmail: analysis.clientName,
        }),
      });

      if (!response.ok) {
        throw new Error('Error creando transacción de pago');
      }

      const { clientSecret } = await response.json();

      // Redirigir a página de pago de Stripe
      // TODO: Implementar flujo de Stripe payment
      setStep('payment');
    } catch (err: any) {
      setError(err.message || 'Error procesando pago');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 sticky top-0 z-40 bg-white/90 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Consultoría de Pensiones
          </Link>
          <a
            href="https://wa.me/529992005550"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            Contactar por WhatsApp
          </a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Step Indicator */}
        <div className="mb-12 flex justify-between items-center">
          <div
            className={`flex-1 h-2 rounded-full mr-2 ${
              step === 'form' ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          />
          <div
            className={`flex-1 h-2 rounded-full mr-2 ${
              ['review', 'payment', 'success'].includes(step) ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          />
          <div
            className={`flex-1 h-2 rounded-full ${
              step === 'success' ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          />
        </div>

        {/* STEP 1: Form */}
        {step === 'form' && (
          <div>
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Análisis Actuarial Completo</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Proporciona tus datos y generaremos un análisis profesional completo sobre cómo
                optimizar tu pensión ante IMSS.
              </p>
            </div>

            {error && (
              <div className="mb-8 bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            <ActuarialAnalysisForm onSubmit={handleFormSubmit} loading={loading} />
          </div>
        )}

        {/* STEP 2: Review Analysis */}
        {step === 'review' && analysis && (
          <div>
            <ActuarialAnalysisDisplay
              analysis={analysis}
              onDownloadPDF={handleDownloadPDF}
              onRequestGestoria={handleRequestGestoria}
            />

            {error && (
              <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-12 flex gap-4 justify-center">
              <button
                onClick={() => setStep('form')}
                className="px-8 py-3 border-2 border-gray-300 text-gray-900 font-bold rounded-lg hover:border-gray-400 transition"
              >
                ← Volver a editar
              </button>

              <button
                onClick={proceedToPayment}
                disabled={loading}
                className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? 'Procesando...' : 'Proceder a Pago - $4,990'}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Payment */}
        {step === 'payment' && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">💳</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Procesando Pago</h2>
            <p className="text-gray-600 mb-8">
              Redirigiendo a Stripe para completar tu pago seguro...
            </p>
            <p className="text-gray-500 text-sm">
              Si no se redirige automáticamente, por favor{' '}
              <button onClick={proceedToPayment} className="text-blue-600 hover:underline">
                haz clic aquí
              </button>
              .
            </p>
          </div>
        )}

        {/* STEP 4: Success */}
        {step === 'success' && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">✓</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">¡Análisis Completado!</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Tu análisis actuarial ha sido generado exitosamente. Revisa tu email para
              el documento PDF y los próximos pasos.
            </p>
            <Link
              href="/servicios"
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition"
            >
              Ver Servicio de Gestoría
            </Link>
          </div>
        )}

        {/* Info Section */}
        {step === 'form' && (
          <div className="mt-16 grid md:grid-cols-2 gap-8">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-3">¿Qué incluye el análisis?</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">✓</span>
                  <span>Revisión completa de tu situación de cotización</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">✓</span>
                  <span>Cálculos actuariales según IMSS 2026</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">✓</span>
                  <span>Proyecciones de pensión desde edad 60 a 75</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">✓</span>
                  <span>Identificación de punto de equilibrio financiero</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">✓</span>
                  <span>Estrategias personalizadas de optimización</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">✓</span>
                  <span>Recomendación final profesional</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-3">¿Qué necesitas?</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-start">
                  <span className="text-green-600 mr-3">•</span>
                  <span>Tener 60 años o más</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3">•</span>
                  <span>Mínimo 500 semanas cotizadas al IMSS</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3">•</span>
                  <span>Conocer tu Número de Seguridad Social (NSS)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3">•</span>
                  <span>Tener acceso a estado de cuenta IMSS (o lo obtenemos)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3">•</span>
                  <span>Documentación personal básica (CURP, RFC)</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
