'use client';

import Link from 'next/link';
import LegalDisclaimer from '../components/LegalDisclaimer';

const cases = [
  {
    name: 'Carlos',
    age: 62,
    situation: 'Empleado que se independizó a los 55',
    before: '$5,200/mes',
    after: '$7,090/mes',
    improvement: '+36%',
    strategy: 'Modalidad 40 + mejora de SDP',
    description: 'Carlos trabajó 35 años como empleado. A los 55 decidió ser independiente. Con nuestra estrategia, aprovechó la Modalidad 40 para aumentar semanas y mejorar su Salario Diario Promedio, resultando en una pensión significativamente mayor.',
  },
  {
    name: 'Laura',
    age: 58,
    situation: 'Profesional independiente sin registro',
    before: 'Sin elegibilidad',
    after: '$4,800/mes',
    improvement: 'Acceso a pensión',
    strategy: 'Acreditación de 100 semanas + Modalidad 10',
    description: 'Laura trabajó como consultor independiente durante 20 años sin registro en IMSS. A través de acreditación de períodos con documentación y registros en Modalidad 10, logró alcanzar las 500 semanas requeridas.',
  },
  {
    name: 'Javier',
    age: 64,
    situation: 'Agricultor con historia laboral mixta',
    before: 'Insuficiente',
    after: '$3,900/mes',
    improvement: 'Viabilidad en 65',
    strategy: 'Acreditación + Modalidad 13 + Modalidad 40',
    description: 'Javier combinó trabajo agrícola (Modalidad 13) con empleos formales. Al revisar su documentación, recuperó períodos olvidados y completó su semanas mediante estrategia modal mixta.',
  },
  {
    name: 'Ana',
    age: 60,
    situation: 'Empleada de empresa pequeña desaparecida',
    before: 'Dudosa elegibilidad',
    after: '$6,100/mes',
    improvement: '+$1.2M en valor presente',
    strategy: 'Recuperación de documentación + Modalidad 40',
    description: 'Ana trabajó 18 años en empresa que quebró. No tenía comprobantes. Mediante investigación y cartas patronales recuperadas, validamos su historial y optimizamos su pensión con Modalidad 40.',
  },
];

export default function CasosPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Consultoría de Pensiones
          </Link>
          <a
            href="https://wa.me/5215512345678"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            Contactar
          </a>
        </div>
      </header>

      {/* Page Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Casos de Éxito</h1>
          <p className="text-xl text-blue-100">
            Historias reales de clientes que mejoraron significativamente su pensión
          </p>
        </div>
      </section>

      {/* Legal Disclaimer */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <LegalDisclaimer variant="compact" />
      </section>

      {/* Cases Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-8">
          {cases.map((caseItem) => (
            <div
              key={caseItem.name}
              className="border-2 border-gray-200 rounded-lg p-8 hover:shadow-lg transition"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900">{caseItem.name}</h3>
                <p className="text-gray-600 mt-1">{caseItem.age} años - {caseItem.situation}</p>
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">{caseItem.description}</p>

              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Resultados</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-gray-600 text-sm">Antes</p>
                    <p className="text-lg font-bold text-gray-900">{caseItem.before}</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="text-2xl text-gray-400">→</span>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Después</p>
                    <p className="text-lg font-bold text-green-600">{caseItem.after}</p>
                  </div>
                </div>
                <p className="text-center text-sm text-green-600 font-semibold mt-3">
                  {caseItem.improvement}
                </p>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-600 mb-1">Estrategia utilizada:</p>
                <p className="font-semibold text-gray-900">{caseItem.strategy}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center bg-gray-50 rounded-lg p-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            ¿Cuál es tu potencial de pensión?
          </h3>
          <p className="text-gray-600 mb-8 text-lg">
            Obtén una evaluación personalizada de tu caso. Sin compromiso.
          </p>
          <a
            href="https://wa.me/5215512345678"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold inline-block"
          >
            Agendar Consulta Gratuita
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400">
            <p>&copy; 2026 Consultoría Integral de Pensiones. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
