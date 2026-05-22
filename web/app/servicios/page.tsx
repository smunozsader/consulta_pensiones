'use client';

import Link from 'next/link';
import { useState } from 'react';
import Footer from '@/app/components/Footer';
import ServiceRequestModal from '@/app/components/ServiceRequestModal';

export default function ServiciosPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const services = [
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
      name: 'Solicitud de Pensión',
      price: 2890,
      timeEstimate: '15-30 días',
      description: 'Gestionamos tu solicitud de pensión o jubilación ante IMSS o ISSSTE.',
      includes: [
        'Revisión completa de expediente',
        'Solicitud oficial de pensión',
        'Seguimiento hasta aprobación',
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

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>

              <div className="bg-blue-50 rounded p-4 mb-6">
                <p className="text-3xl font-bold text-blue-600">${service.price.toLocaleString()}</p>
                <p className="text-sm text-gray-600 mt-1">Tiempo estimado: {service.timeEstimate}</p>
              </div>

              <p className="text-gray-600 mb-6">{service.description}</p>

              <p className="text-sm font-semibold text-gray-900 mb-3">Incluye:</p>
              <ul className="space-y-2 mb-8">
                {service.includes.map((item) => (
                  <li key={item} className="flex items-start">
                    <span className="text-green-600 mr-3 font-bold">✓</span>
                    <span className="text-sm text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => {
                  setSelectedService(service.id);
                  setModalOpen(true);
                }}
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Solicitar Servicio
              </button>
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

      <ServiceRequestModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        serviceName={selectedService || ''}
      />

      <Footer />
    </div>
  );
}
