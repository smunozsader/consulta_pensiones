'use client';

import Link from 'next/link';
import { useState } from 'react';
import Footer from '@/app/components/Footer';
import PensionCalculator from '@/app/components/PensionCalculator';
import PensionFAQ from '@/app/components/PensionFAQ';
import DocumentationChecklist from '@/app/components/DocumentationChecklist';

export default function PensionPage() {
  const [activeTab, setActiveTab] = useState<'calculadora' | 'faq' | 'documentos'>('calculadora');

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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Gestión de Solicitud de Pensión
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Si tienes 60 años o más y cumples con los requisitos, es momento de solicitar tu pensión ante IMSS.
            Te ayudamos a entender el proceso, calcular tu pensión esperada, y gestionar todos los trámites.
          </p>

          {/* Key Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">500 semanas</div>
              <p className="text-gray-600">Requisito mínimo de cotización</p>
            </div>
            <div className="bg-green-50 rounded-lg p-6">
              <div className="text-3xl font-bold text-green-600 mb-2">4-8 semanas</div>
              <p className="text-gray-600">Tiempo estimado del proceso</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">75-100%</div>
              <p className="text-gray-600">Tu pensión según edad (60 o 65 años)</p>
            </div>
          </div>
        </div>

        {/* Problem Statement */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">¿Qué dudas tienes?</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-amber-600 mr-3 font-bold">❓</span>
              <span>"¿Tengo 500 semanas cotizadas?"</span>
            </li>
            <li className="flex items-start">
              <span className="text-amber-600 mr-3 font-bold">❓</span>
              <span>"¿Cuánto voy a recibir de pensión mensual?"</span>
            </li>
            <li className="flex items-start">
              <span className="text-amber-600 mr-3 font-bold">❓</span>
              <span>"¿Es mejor solicitar a los 60 o esperar a los 65?"</span>
            </li>
            <li className="flex items-start">
              <span className="text-amber-600 mr-3 font-bold">❓</span>
              <span>"¿Qué documentos necesito?"</span>
            </li>
            <li className="flex items-start">
              <span className="text-amber-600 mr-3 font-bold">❓</span>
              <span>"¿Puedo hacer los trámites yo solo o necesito ayuda?"</span>
            </li>
          </ul>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8 flex gap-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('calculadora')}
            className={`px-6 py-4 font-semibold transition ${
              activeTab === 'calculadora'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Calculadora de Pensión
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`px-6 py-4 font-semibold transition ${
              activeTab === 'faq'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Preguntas Frecuentes
          </button>
          <button
            onClick={() => setActiveTab('documentos')}
            className={`px-6 py-4 font-semibold transition ${
              activeTab === 'documentos'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Documentos Necesarios
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'calculadora' && <PensionCalculator />}
        {activeTab === 'faq' && <PensionFAQ />}
        {activeTab === 'documentos' && <DocumentationChecklist />}

        {/* Service CTA */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Gestoría de Solicitud de Pensión</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            ¿Prefieres que nosotros manejemos todo? Te acompañamos en cada paso: validamos tus datos,
            preparamos documentos, presentamos solicitud ante IMSS, y hacemos seguimiento hasta tu primer depósito.
          </p>

          <div className="bg-white/20 rounded-lg p-8 mb-8 max-w-2xl mx-auto">
            <div className="text-4xl font-bold mb-2">$1,490 MXN</div>
            <p className="text-sm opacity-90">Gestión completa de solicitud de pensión</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8 text-left">
            <div className="flex items-start">
              <span className="text-lg mr-3">✓</span>
              <div>
                <p className="font-semibold">Revisión Completa</p>
                <p className="text-sm opacity-90">Validamos elegibilidad y documentos</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-lg mr-3">✓</span>
              <div>
                <p className="font-semibold">Gestión IMSS</p>
                <p className="text-sm opacity-90">Presentamos solicitud y damos seguimiento</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-lg mr-3">✓</span>
              <div>
                <p className="font-semibold">Seguimiento</p>
                <p className="text-sm opacity-90">Hasta tu primer depósito de pensión</p>
              </div>
            </div>
          </div>

          <Link
            href="/servicios"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
          >
            Solicitar Servicio de Gestoría
          </Link>
        </div>

        {/* Timeline Info */}
        <div className="mt-20 bg-gray-50 rounded-lg p-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">¿Cuánto tarda el proceso?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">1-3 días</div>
              <p className="text-gray-600 text-sm font-semibold mb-2">Preparación</p>
              <p className="text-gray-500 text-xs">Recopilamos documentos y validamos datos</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">5-7 días</div>
              <p className="text-gray-600 text-sm font-semibold mb-2">Presentación</p>
              <p className="text-gray-500 text-xs">Presentamos solicitud ante IMSS</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">12 días</div>
              <p className="text-gray-600 text-sm font-semibold mb-2">Revisión Legal</p>
              <p className="text-gray-500 text-xs">IMSS revisa tu expediente</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">1-2 semanas</div>
              <p className="text-gray-600 text-sm font-semibold mb-2">Depósito</p>
              <p className="text-gray-500 text-xs">Primer depósito de pensión</p>
            </div>
          </div>
          <p className="text-center text-gray-600 mt-8 text-sm">
            <strong>Total: 4-8 semanas típicamente desde solicitud hasta primer depósito</strong>
          </p>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 bg-blue-50 border border-blue-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Preguntas Frecuentes sobre el Servicio</h2>
          <div className="space-y-4">
            <details className="bg-white p-4 rounded-lg">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                ¿Cuál es la diferencia entre solicitar a los 60 y a los 65 años?
              </summary>
              <p className="text-gray-600 text-sm mt-2">
                A los 60 años recibes 75% de tu pensión calculada. A los 65 años recibes 100%. La diferencia puede ser
                de $2,000-5,000 mensuales. Analizamos tu caso específico para recomendarte la opción más ventajosa.
              </p>
            </details>

            <details className="bg-white p-4 rounded-lg">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                ¿Qué pasa si no tengo estado de cuenta actualizado?
              </summary>
              <p className="text-gray-600 text-sm mt-2">
                Lo pedimos ante IMSS como parte del servicio. Esto toma 5-7 días. Mientras tanto validamos tu
                documentación.
              </p>
            </details>

            <details className="bg-white p-4 rounded-lg">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                ¿Hay riesgo de que IMSS rechace mi solicitud?
              </summary>
              <p className="text-gray-600 text-sm mt-2">
                Si cumples 500 semanas, el riesgo es muy bajo. Nuestro análisis previo identifica cualquier problema
                con documentación antes de presentar.
              </p>
            </details>

            <details className="bg-white p-4 rounded-lg">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                ¿Cuánto debo tener ahorrado para vivir mientras espero?
              </summary>
              <p className="text-gray-600 text-sm mt-2">
                Recomendamos 4-8 semanas de gastos. Es el tiempo típico de proceso. El primer depósito de pensión
                cubrirá tus gastos de ahí en adelante.
              </p>
            </details>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
