'use client';

import Link from 'next/link';
import Footer from '@/app/components/Footer';
import PersonalizedCalculator from '@/app/components/PersonalizedCalculator';

export default function CalculadoraPage() {

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Consultoría de Pensiones
          </Link>
          <a
            href="https://wa.me/529992005550"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            Contactar
          </a>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Calculadora de Pensión Personalizada
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          Ingresa tus datos personales y calcula tu pensión esperada en tiempo real.
        </p>

        {/* Calculator Component */}
        <PersonalizedCalculator />

        {/* CTA */}
        <div className="mt-16 bg-blue-600 text-white p-12 rounded-lg text-center">
          <h3 className="text-2xl font-bold mb-4">¿Quieres un análisis personalizado?</h3>
          <p className="mb-6 text-lg">
            Esta calculadora es una estimación. Contáctame para una asesoría completa con proyecciones detalladas.
          </p>
          <a
            href="https://wa.me/529992005550"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-bold inline-block"
          >
            Contactar por WhatsApp
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
