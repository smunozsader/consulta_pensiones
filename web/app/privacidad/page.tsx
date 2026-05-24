'use client';

import Link from 'next/link';
import Footer from '@/app/components/Footer';
import { useState } from 'react';

export default function PrivacidadPage() {
  const [expandedSections, setExpandedSections] = useState<string[]>(['quedat']);

  const toggleSection = (id: string) => {
    setExpandedSections(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const sections = [
    {
      id: 'quedat',
      title: 'QUÉ DATOS RECOLECTAMOS',
      content: (
        <div className="space-y-4 text-gray-700">
          <p><strong>De formularios:</strong> Nombre, email, teléfono, CURP, NSS, información sobre servicios solicitados</p>
          <p><strong>Automáticos:</strong> Dirección IP, tipo de navegador, páginas visitadas (mediante Google Analytics con anonimización)</p>
          <p><strong>De pagos:</strong> Información de tarjeta <strong>NUNCA es almacenada</strong> en nuestros servidores. Es procesada directamente por Stripe y Mercado Pago (proveedores certificados)</p>
          <p><strong>De soporte:</strong> Si contactas por WhatsApp, guardamos la conversación en la plataforma de Stripe o gestión interna (con tu consentimiento)</p>
        </div>
      )
    },
    {
      id: 'porque',
      title: 'POR QUÉ RECOLECTAMOS DATOS',
      content: (
        <div className="space-y-4 text-gray-700">
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Para contactarte:</strong> Responder tus preguntas y confirmar solicitudes de servicio</li>
            <li><strong>Para mejorar el sitio:</strong> Entender cómo usas la calculadora (Google Analytics anónimo)</li>
            <li><strong>Para sendemailer:</strong> Enviar confirmaciones de email, educación sobre pensiones (solo si consientes)</li>
            <li><strong>Para procesar pagos:</strong> Hacer transacciones seguras con Stripe/Mercado Pago</li>
            <li><strong>Cumplimiento legal:</strong> Si auditoría IMSS lo requiere (raramente, bajo orden legal)</li>
          </ul>
        </div>
      )
    },
    {
      id: 'lfpdppp',
      title: 'CUMPLIMIENTO LFPDPPP',
      content: (
        <div className="space-y-4 text-gray-700">
          <p>Cumplimos 100% con la <strong>Ley Federal de Protección de Datos Personales en Posesión de Particulares (LFPDPPP)</strong>:</p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Consentimiento:</strong> No recolectamos datos sin tu permiso. Todos los formularios tienen opciones de consentimiento claras</li>
            <li><strong>Minimización:</strong> Solo pedimos los datos que realmente necesitamos</li>
            <li><strong>Seguridad:</strong> Datos en tránsito (TLS encriptado) y en reposo (Firebase encriptado)</li>
            <li><strong>Acceso & Rectificación:</strong> Puedes solicitar ver o actualizar tus datos en cualquier momento</li>
            <li><strong>Transparencia:</strong> Esta política explica exactamente qué hacemos con tus datos</li>
          </ul>
          <p className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
            <strong>Auditoría anual:</strong> Revisamos nuestras prácticas de protección de datos cada año para garantizar cumplimiento continuo.
          </p>
        </div>
      )
    },
    {
      id: 'herramientas',
      title: 'HERRAMIENTAS Y PROVEEDORES',
      content: (
        <div className="space-y-4 text-gray-700">
          <div className="space-y-3 border-l-4 border-blue-400 pl-4">
            <div>
              <p className="font-semibold">Google Analytics</p>
              <p>Tracking anónimo de navegación. No almacenamos IPs personales. <a href="https://policies.google.com/privacy" className="text-blue-600 hover:underline" target="_blank">Política Google</a></p>
            </div>
            <div>
              <p className="font-semibold">Resend (Email)</p>
              <p>Envío de confirmaciones de email. Los datos se transfieren a través de conexión encriptada. <a href="https://resend.com/privacy" className="text-blue-600 hover:underline" target="_blank">Política Resend</a></p>
            </div>
            <div>
              <p className="font-semibold">Stripe (Pagos)</p>
              <p>Procesamiento de pagos con tarjeta. PCI-DSS Level 1 certificado (máximo estándar de seguridad). <a href="https://stripe.com/privacy" className="text-blue-600 hover:underline" target="_blank">Política Stripe</a></p>
            </div>
            <div>
              <p className="font-semibold">Mercado Pago (Pagos - futuro)</p>
              <p>Procesamiento de pagos con billetera. Cumplimiento regulatorio mexicano. <a href="https://www.mercadopago.com.mx/privacidad" className="text-blue-600 hover:underline" target="_blank">Política Mercado Pago</a></p>
            </div>
            <div>
              <p className="font-semibold">Firebase (Base de datos)</p>
              <p>Almacenamiento de solicitudes de servicio. Google Cloud encriptado en reposo. Ubicación: US (con cumplimiento SCG-2). <a href="https://firebase.google.com/support/privacy" className="text-blue-600 hover:underline" target="_blank">Política Firebase</a></p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'derechos',
      title: 'TUS DERECHOS (ARCO)',
      content: (
        <div className="space-y-4 text-gray-700">
          <p className="bg-yellow-50 p-3 rounded border border-yellow-200">
            Tienes derechos ARCO: <strong>Acceso, Rectificación, Cancelación, Oposición</strong>
          </p>
          <ul className="space-y-3">
            <li>
              <p className="font-semibold">Acceso (A):</p>
              <p>Solicita ver qué datos tenemos sobre ti. Responderemos en 15 días hábiles.</p>
            </li>
            <li>
              <p className="font-semibold">Rectificación (R):</p>
              <p>¿Datos incorrectos? Solicita actualizar tu información. Cambios en 5 días hábiles.</p>
            </li>
            <li>
              <p className="font-semibold">Cancelación (C):</p>
              <p>Quieres que eliminemos tu información. Borraremos (excepto si hay obligación legal). 30 días hábiles.</p>
            </li>
            <li>
              <p className="font-semibold">Oposición (O):</p>
              <p>No quieres recibir emails de marketing. Los detenemos inmediatamente.</p>
            </li>
          </ul>
          <div className="mt-4 p-4 bg-green-50 rounded border border-green-200">
            <p className="font-semibold mb-2">Cómo solicitar:</p>
            <p>Envía email a: <strong>mi.consultor.pensiones@gmail.com</strong></p>
            <p className="text-sm mt-2">Asunto: <code className="bg-gray-100 px-2 py-1 rounded">SOLICITUD ARCO - [Tu Nombre]</code></p>
            <p className="text-sm mt-2">Incluye: Nombre completo, email, qué dato solicitas (Acceso/Rectificación/Cancelación/Oposición)</p>
          </div>
        </div>
      )
    },
    {
      id: 'seguridad',
      title: 'SEGURIDAD FÍSICA Y TÉCNICA',
      content: (
        <div className="space-y-4 text-gray-700">
          <ul className="space-y-3">
            <li>
              <p className="font-semibold">🔐 Bases de datos:</p>
              <p>Cifradas en reposo. Backups automáticos diarios. Acceso limitado (solo Sergio con contraseña fuerte).</p>
            </li>
            <li>
              <p className="font-semibold">🔑 Control de acceso:</p>
              <p>Solo el titular (Sergio) puede ver solicitudes de servicio. Contraseñas de admin criptográficamente seguras.</p>
            </li>
            <li>
              <p className="font-semibold">🖥️ Servidor:</p>
              <p>Vercel (infraestructura global, cumplimiento SOC 2 Type II, ubicación US con redundancia).</p>
            </li>
            <li>
              <p className="font-semibold">🚨 Monitoreo:</p>
              <p>Alertas automáticas si intentos de acceso anómalo. Logs auditable de cambios.</p>
            </li>
            <li>
              <p className="font-semibold">🔗 Transmisión:</p>
              <p>Todo en HTTPS (TLS 1.2+). Certificado SSL Let's Encrypt verificado.</p>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: 'cookies',
      title: 'POLÍTICA DE COOKIES',
      content: (
        <div className="space-y-4 text-gray-700">
          <ul className="space-y-3">
            <li>
              <p className="font-semibold">Google Analytics:</p>
              <p>Cookies para estadísticas de uso (anónimo). No rastrean identidad. Puedes desactivarlas en tu navegador.</p>
            </li>
            <li>
              <p className="font-semibold">LocalStorage (Navegador):</p>
              <p>Guardamos tu token de acceso localmente para mantener sesión. No se comparte, solo en tu dispositivo.</p>
            </li>
            <li>
              <p className="font-semibold">Stripe/Mercado Pago:</p>
              <p>Sus propias cookies para seguridad de pago. Ver políticas de ellos para detalles.</p>
            </li>
          </ul>
          <p className="mt-4 text-sm text-gray-600">
            Puedes desactivar cookies en tu navegador (Configuración → Privacidad), pero algunos sitios pueden no funcionar correctamente.
          </p>
        </div>
      )
    },
    {
      id: 'cambios',
      title: 'CONTACTO & CAMBIOS A ESTA POLÍTICA',
      content: (
        <div className="space-y-4 text-gray-700">
          <p>
            <strong>¿Preguntas sobre privacidad?</strong> Contáctame:
          </p>
          <ul className="space-y-2 pl-4">
            <li>📧 Email: <strong>mi.consultor.pensiones@gmail.com</strong></li>
            <li>💬 WhatsApp: <a href="https://wa.me/529992005550" className="text-blue-600 hover:underline">https://wa.me/529992005550</a></li>
          </ul>
          <p className="mt-4">
            <strong>Cambios a esta política:</strong> Si hay actualizaciones, te notificaré 30 días antes. Cambios menores (correcciones de ortografía) pueden ser inmediatos.
          </p>
          <p className="mt-4 text-sm text-gray-600">
            <strong>Última actualización:</strong> Mayo 23, 2026<br/>
            <strong>Versión anterior:</strong> No disponible (primera versión)
          </p>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 sticky top-0 z-50 bg-white/90 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">Consultoría de Pensiones</Link>
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

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Política de Privacidad</h1>
        <p className="text-xl text-gray-600 mb-4">Protección de Datos Personales - LFPDPPP Cumplimiento</p>
        <p className="text-gray-600 mb-12">Tu información está segura con nosotros. Esta política explica exactamente qué datos recolectamos, por qué, y cómo los protegemos.</p>

        {/* Accordion Sections */}
        <div className="space-y-3">
          {sections.map(section => (
            <div key={section.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition"
              >
                <h2 className="text-lg font-semibold text-gray-900">{section.title}</h2>
                <span className="text-gray-500 text-2xl">
                  {expandedSections.includes(section.id) ? '−' : '+'}
                </span>
              </button>
              {expandedSections.includes(section.id) && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  {section.content}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-16 p-8 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-xl font-bold text-gray-900 mb-2">¿Aún con preguntas?</h3>
          <p className="text-gray-700 mb-4">Contáctame directamente. Responderé en 24 horas.</p>
          <a
            href="https://wa.me/529992005550"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Contactar por WhatsApp
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
