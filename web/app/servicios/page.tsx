'use client';

import Link from 'next/link';
import { useState } from 'react';
import Footer from '@/app/components/Footer';
import ServiceRequestModal from '@/app/components/ServiceRequestModal';

export default function ServiciosPage() {
  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const services = [
    {
      id: 'analisis-actuarial',
      name: 'Análisis Actuarial Completo',
      price: 4990,
      timeEstimate: '2-3 días',
      description: 'Análisis profesional completo de tu situación de pensión con proyecciones y estrategias de optimización.',
      includes: [
        'Análisis actuarial completo según IMSS 2026',
        'Proyecciones de pensión desde 60 a 75 años',
        'Cálculo del punto de equilibrio financiero',
        'Estrategias personalizadas de optimización',
        'Reporte profesional en PDF',
        'Recomendación final especializada',
      ],
      isExternal: true,
      externalLink: '/pension/analisis',
    },
    {
      id: 'estado-cuenta',
      name: 'Solicitud de Estado de Cuenta',
      price: 890,
      timeEstimate: '7-10 días',
      description: 'Solicitamos tu estado de cuenta actualizado ante IMSS o ISSSTE.',
      includes: [
        'Solicitud oficial ante la institución',
        'Validación de semanas cotizadas',
        'Reporte detallado de tu cuenta',
      ],
    },
    {
      id: 'modalidad-40',
      name: 'Inscripción en Modalidad 40',
      price: 1290,
      timeEstimate: '10-15 días',
      description: 'Tramitamos tu inscripción en Modalidad 40 para cotizaciones voluntarias.',
      includes: [
        'Cálculo personalizado de cuotas',
        'Inscripción ante IMSS',
        'Asesoría en aportaciones mensuales',
      ],
    },
    {
      id: 'solicitud-pension',
      name: 'Gestoría de Solicitud de Pensión',
      price: 1490,
      timeEstimate: '4-8 semanas',
      description: 'Gestionamos tu solicitud de pensión o jubilación ante IMSS o ISSSTE.',
      includes: [
        'Revisión completa de expediente',
        'Solicitud oficial de pensión',
        'Coordinación de documentación',
        'Seguimiento ante IMSS',
        'Acompañamiento hasta primer depósito',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
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
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Servicios de Gestión
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nos encargamos directamente de tus trámites ante IMSS e ISSSTE. Tú proporcionas los datos,
            nosotros hacemos todo el papeleo.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {services.map((service: any) => (
            <div
              key={service.id}
              className={`bg-white border ${
                service.id === 'analisis-actuarial' ? 'border-blue-300 lg:col-span-2' : 'border-gray-200'
              } rounded-lg p-8 hover:shadow-lg transition ${
                service.id === 'analisis-actuarial' ? 'md:col-span-2' : ''
              }`}
            >
              {service.id === 'analisis-actuarial' && (
                <div className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">
                  SERVICIO PRINCIPAL
                </div>
              )}

              <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>

              <div className={`rounded p-4 mb-6 ${
                service.id === 'analisis-actuarial' ? 'bg-blue-100' : 'bg-blue-50'
              }`}>
                <p className="text-3xl font-bold text-blue-600">${service.price.toLocaleString()}</p>
                <p className="text-sm text-gray-600 mt-1">Tiempo estimado: {service.timeEstimate}</p>
              </div>

              <p className="text-gray-600 mb-6">{service.description}</p>

              <p className="text-sm font-semibold text-gray-900 mb-3">Incluye:</p>
              <ul className="space-y-2 mb-8">
                {service.includes.map((item: string) => (
                  <li key={item} className="flex items-start">
                    <span className="text-green-600 mr-3 font-bold">✓</span>
                    <span className="text-sm text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>

              {service.isExternal ? (
                <Link
                  href={service.externalLink}
                  className="block w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition text-center"
                >
                  Iniciar Análisis
                </Link>
              ) : (
                <button
                  onClick={() => {
                    setSelectedService(service);
                    setModalOpen(true);
                  }}
                  className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition"
                >
                  Solicitar Servicio
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-lg p-12 text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">¿Cómo funciona?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">1</div>
              <p className="text-gray-600 text-sm">Selecciona el servicio que necesitas</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">2</div>
              <p className="text-gray-600 text-sm">Completa el pago con Stripe</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">3</div>
              <p className="text-gray-600 text-sm">Nos contactamos por WhatsApp</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">4</div>
              <p className="text-gray-600 text-sm">Tramitamos ante IMSS/ISSSTE</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
          <p className="text-gray-700 mb-4">
            ¿Preguntas sobre nuestros servicios? Contacta directamente con nosotros:
          </p>
          <a
            href="https://wa.me/529992005550"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold"
          >
            Contactar por WhatsApp
          </a>
        </div>
      </main>

      {selectedService && (
        <ServiceRequestModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          serviceName={selectedService.name}
          serviceId={selectedService.id}
          price={selectedService.price}
        />
      )}

      <Footer />
    </div>
  );
}
