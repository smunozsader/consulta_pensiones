'use client';

import Link from 'next/link';

export default function AboutPage() {
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

      {/* About Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Acerca de Nosotros</h1>

        <div className="prose prose-lg max-w-none space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Nuestra Misión</h2>
            <p className="text-gray-700 leading-relaxed">
              Capacitar y asesorar a trabajadores mexicanos para que tomen decisiones informadas sobre su pensión.
              Creemos que toda persona merece entender completamente sus opciones de jubilación y acceder a estrategias
              que maximicen su seguridad financiera en los años posteriores al trabajo.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Quién Soy</h2>
            <p className="text-gray-700 leading-relaxed">
              Soy un asesor especializado en pensiones mexicanas con más de 15 años de experiencia en normativa
              IMSS e ISSSTE. He trabajado con cientos de clientes en situaciones variadas: empleados formales,
              independientes, agricultores, y personas con historias laborales complejas.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Mi enfoque es pedagógico y transparente. No prometo milagros, ni escondo limitaciones del sistema.
              Busco educarte completamente sobre tus opciones y ayudarte a elegir la mejor estrategia para tu caso específico.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Por Qué Confiar en Nosotros</h2>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span className="text-gray-700">
                  <strong>Especialización profunda:</strong> Conocimiento exhaustivo de Ley 73, Ley 97, AFORES,
                  y todas las modalidades de cotización.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span className="text-gray-700">
                  <strong>Experiencia comprobada:</strong> Más de 500 clientes asesorados con resultados documentados.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span className="text-gray-700">
                  <strong>Transparencia:</strong> Explicamos claramente qué es posible, qué no lo es,
                  y las limitaciones del sistema de pensiones mexicano.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span className="text-gray-700">
                  <strong>Educación primero:</strong> Toda mi consultoría comienza con enseñanza.
                  Queremos que entiendas, no solo que confíes ciegamente.
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Nuestro Enfoque</h2>
            <div className="grid md:grid-cols-2 gap-6 my-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Educación Integral</h3>
                <p className="text-gray-700 text-sm">
                  Documentos pedagógicos, casos prácticos, y explicaciones profundas que van más allá de lo superficial.
                </p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Análisis Personalizado</h3>
                <p className="text-gray-700 text-sm">
                  Cada caso es único. Revisamos tu estado de cuenta, historia laboral, y diseñamos estrategia específica.
                </p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Transparencia Total</h3>
                <p className="text-gray-700 text-sm">
                  Sin promesas imposibles. Explicamos riesgos, limitaciones, y realidades del sistema.
                </p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Seguimiento Continuo</h3>
                <p className="text-gray-700 text-sm">
                  No es venta única. Acompañamos a nuestros clientes hasta y después de la jubilación.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Nuestros Servicios</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="font-bold text-gray-900">Consulta Inicial - $1,490</h3>
                <p className="text-gray-700 text-sm mt-1">
                  Revisión de tu estado de cuenta IMSS, análisis de elegibilidad,
                  y evaluación inicial de opciones disponibles.
                </p>
              </div>
              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="font-bold text-gray-900">Estrategia Completa - $3,500</h3>
                <p className="text-gray-700 text-sm mt-1">
                  Análisis exhaustivo, proyecciones de pensión bajo diferentes estrategias,
                  recomendación personalizada.
                </p>
              </div>
              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="font-bold text-gray-900">Acompañamiento Integral - $6,470</h3>
                <p className="text-gray-700 text-sm mt-1">
                  Análisis completo, gestión de trámites, seguimiento hasta jubilación
                  y después.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">¿Listo para Optimizar tu Pensión?</h2>
            <p className="text-gray-700 mb-6">
              Contáctame hoy para una consulta inicial. Sin compromisos, sin presión.
              Solo una conversación honesta sobre tus opciones.
            </p>
            <a
              href="https://wa.me/5215512345678"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold inline-block"
            >
              Contactar por WhatsApp
            </a>
          </div>
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
