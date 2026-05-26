'use client';

import Link from 'next/link';
import { useState, ReactNode } from 'react';
import Footer from '@/app/components/Footer';

interface AccordionSection {
  title: string;
  content: ReactNode;
}

export default function PrivacidadPage() {
  const [openSection, setOpenSection] = useState<number>(0);

  const sections: AccordionSection[] = [
    {
      title: '1. QUÉ DATOS RECOLECTAMOS',
      content: (
        <div className="space-y-4 text-gray-700">
          <p>Recolectamos información de varias formas:</p>
          <div className="bg-blue-50 p-4 rounded-lg space-y-3">
            <div>
              <p className="font-semibold text-gray-900">📋 De Formularios:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2 text-sm">
                <li>Nombre, email, teléfono, CURP, NSS</li>
                <li>Datos de solicitudes (edad, semanas, etc.)</li>
              </ul>
            </div>
            <div className="border-t pt-3">
              <p className="font-semibold text-gray-900">🤖 De Navegación:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2 text-sm">
                <li>IP, navegador, páginas visitadas (Google Analytics)</li>
              </ul>
            </div>
            <div className="border-t pt-3">
              <p className="font-semibold text-gray-900">💳 De Pagos:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2 text-sm">
                <li><strong>NUNCA</strong> almacenamos tarjetas. Stripe es PCI-DSS certificado.</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: '2. POR QUÉ RECOLECTAMOS DATOS',
      content: (
        <div className="space-y-4 text-gray-700">
          <div className="space-y-2">
            <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-500">
              <p className="font-semibold text-sm text-gray-900">Contactarte sobre solicitudes</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500">
              <p className="font-semibold text-sm text-gray-900">Mejorar el sitio (Google Analytics - anónimo)</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg border-l-4 border-purple-500">
              <p className="font-semibold text-sm text-gray-900">Educación (si consientes marketing)</p>
            </div>
            <div className="bg-amber-50 p-3 rounded-lg border-l-4 border-amber-500">
              <p className="font-semibold text-sm text-gray-900">Cumplimiento legal (auditoría IMSS)</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: '3. LFPDPPP - CUMPLIMIENTO LEGAL',
      content: (
        <div className="space-y-4 text-gray-700">
          <p className="text-sm"><strong>LFPDPPP</strong> = Ley Federal de Protección de Datos (México)</p>
          <div className="space-y-2">
            <div className="border-l-4 border-green-500 pl-3 py-1 text-sm">
              <p><strong>✓ Consentimiento:</strong> Solo con tu permiso</p>
            </div>
            <div className="border-l-4 border-green-500 pl-3 py-1 text-sm">
              <p><strong>✓ Minimización:</strong> Solo datos necesarios</p>
            </div>
            <div className="border-l-4 border-green-500 pl-3 py-1 text-sm">
              <p><strong>✓ Seguridad:</strong> Encriptado TLS + Firebase</p>
            </div>
            <div className="border-l-4 border-green-500 pl-3 py-1 text-sm">
              <p><strong>✓ Derechos ARCO:</strong> Acceso, rectificación, cancelación, oposición</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: '4. HERRAMIENTAS Y PROVEEDORES',
      content: (
        <div className="space-y-3 text-gray-700">
          <div className="bg-gray-50 p-3 rounded-lg text-sm">
            <p className="font-semibold">🔍 Google Analytics</p>
            <p className="text-xs text-gray-600">Rastreo anónimo</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg text-sm">
            <p className="font-semibold">📧 Resend</p>
            <p className="text-xs text-gray-600">Emails de confirmación</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg text-sm">
            <p className="font-semibold">💳 Stripe</p>
            <p className="text-xs text-gray-600">Pagos (PCI-DSS). No vemos tarjetas.</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg text-sm">
            <p className="font-semibold">🗄️ Firebase</p>
            <p className="text-xs text-gray-600">Almacenamiento encriptado, backup diario</p>
          </div>
          <div className="bg-red-50 p-3 rounded-lg border border-red-200 text-sm">
            <p className="text-red-800"><strong>⚠️ NO vendemos datos a terceros.</strong></p>
          </div>
        </div>
      ),
    },
    {
      title: '5. TUS DERECHOS - ARCO',
      content: (
        <div className="space-y-3 text-gray-700">
          <div className="border-l-4 border-blue-500 pl-3 py-1 text-sm">
            <p><strong>🔍 ACCESO:</strong> Ver tus datos guardados</p>
            <p className="text-xs text-gray-600">Email: sergio@asesor-pensiones.mx</p>
          </div>
          <div className="border-l-4 border-green-500 pl-3 py-1 text-sm">
            <p><strong>✏️ RECTIFICACIÓN:</strong> Corregir datos incorrectos</p>
            <p className="text-xs text-gray-600">Email: sergio@asesor-pensiones.mx</p>
          </div>
          <div className="border-l-4 border-orange-500 pl-3 py-1 text-sm">
            <p><strong>❌ CANCELACIÓN:</strong> Eliminar datos</p>
            <p className="text-xs text-gray-600">Email: sergio@asesor-pensiones.mx</p>
          </div>
          <div className="border-l-4 border-red-500 pl-3 py-1 text-sm">
            <p><strong>🚫 OPOSICIÓN:</strong> Rechazar cierto uso</p>
            <p className="text-xs text-gray-600">Email: sergio@asesor-pensiones.mx</p>
          </div>
          <div className="bg-yellow-50 p-2 rounded text-xs text-yellow-900 mt-2">
            <p><strong>⏱️ Plazo:</strong> Máximo 20 días hábiles (por ley)</p>
          </div>
        </div>
      ),
    },
    {
      title: '6. SEGURIDAD TÉCNICA',
      content: (
        <div className="space-y-2 text-gray-700 text-sm">
          <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-500">
            <p><strong>🔐 Encriptación TLS:</strong> HTTPS protege datos en tránsito</p>
          </div>
          <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-500">
            <p><strong>🗄️ Firebase Encriptado:</strong> Datos en reposo protegidos</p>
          </div>
          <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-500">
            <p><strong>🔄 Backups Diarios:</strong> Recuperación si falla</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500">
            <p><strong>⚠️ Alertas de Seguridad:</strong> Monitoreamos acceso anómalo</p>
          </div>
        </div>
      ),
    },
    {
      title: '7. COOKIES Y RASTREO',
      content: (
        <div className="space-y-3 text-gray-700 text-sm">
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="font-semibold">📊 Google Analytics</p>
            <p className="text-xs text-gray-600">Rastreo anónimo. Deshabilita en navegador si quieres.</p>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg">
            <p className="font-semibold">🔑 Token Autenticación</p>
            <p className="text-xs text-gray-600">Si te registras, guardamos token para mantenerte conectado.</p>
          </div>
        </div>
      ),
    },
    {
      title: '8. CONTACTO Y CAMBIOS',
      content: (
        <div className="space-y-3 text-gray-700 text-sm">
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="font-semibold">📧 Preguntas?</p>
            <p>Email: sergio@asesor-pensiones.mx</p>
            <p>WhatsApp: <a href="https://wa.me/529992005550" className="text-blue-600 hover:underline">+52 999 200 5550</a></p>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <p className="font-semibold">📝 Cambios a esta política</p>
            <p className="text-xs">Cambios importantes: notificación 30 días antes</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg text-xs text-gray-600">
            <p>Última actualización: Mayo 25, 2026 | Versión: 1.0</p>
          </div>
        </div>
      ),
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
            Contactar
          </a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Política de Privacidad</h1>
          <p className="text-xl text-gray-600">Tu privacidad es importante. Cumplimos 100% con LFPDPPP.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-blue-50 p-6 rounded-lg text-center border border-blue-200">
            <p className="text-2xl mb-2">🔐</p>
            <p className="font-semibold text-gray-900">Encriptación</p>
            <p className="text-sm text-gray-600 mt-1">TLS + Firebase</p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg text-center border border-green-200">
            <p className="text-2xl mb-2">📋</p>
            <p className="font-semibold text-gray-900">Cumplimiento</p>
            <p className="text-sm text-gray-600 mt-1">LFPDPPP + ARCO</p>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg text-center border border-purple-200">
            <p className="text-2xl mb-2">👤</p>
            <p className="font-semibold text-gray-900">Sin Compartir</p>
            <p className="text-sm text-gray-600 mt-1">Nunca vendemos</p>
          </div>
        </div>

        <div className="space-y-3">
          {sections.map((section, index) => (
            <div key={index} className="border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setOpenSection(openSection === index ? -1 : index)}
                className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 flex justify-between items-center transition text-left"
              >
                <h3 className="font-semibold text-gray-900">{section.title}</h3>
                <span className="text-2xl text-gray-600">
                  {openSection === index ? '−' : '+'}
                </span>
              </button>
              {openSection === index && (
                <div className="px-6 py-6 bg-white border-t border-gray-200">
                  {section.content}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">¿Preguntas sobre privacidad?</h3>
          <a
            href="https://wa.me/529992005550?text=Tengo%20una%20pregunta%20sobre%20privacidad"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-bold transition"
          >
            Contactar por WhatsApp
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
