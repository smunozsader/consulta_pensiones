'use client';

import Link from 'next/link';

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Consultoría de Pensiones
          </Link>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Términos y Condiciones</h1>

        <div className="prose prose-lg max-w-none space-y-8 text-gray-700">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Descargo de Responsabilidad</h2>
            <p>
              <strong>IMPORTANTE:</strong> La información y herramientas proporcionadas en este sitio web son
              de naturaleza educativa y no constituyen asesoría legal, contable o financiera oficial.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Los cálculos de la calculadora son estimaciones basadas en normativa vigente</li>
              <li>Los resultados NO son garantías de pensión del IMSS</li>
              <li>Cada caso es único y requiere análisis personalizado profesional</li>
              <li>La información puede cambiar debido a reformas legislativas</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Validación Legal Pendiente</h2>
            <p>
              Este sitio contiene análisis de pensiones basados en interpretación de normativa IMSS.
              Sin embargo, existe un proceso de <strong>validación legal pendiente</strong> que debe completarse
              antes de considerar esta asesoría como orientación definitiva.
            </p>
            <p>
              Se recomienda consultar directamente con el IMSS o un profesional certificado antes de tomar
              decisiones críticas sobre jubilación.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Casos Prácticos</h2>
            <p>
              Los casos prácticos presentados (Carlos, Laura, Javier, Diego, Sofía, Roberto) son
              <strong> ilustrativos</strong> y representan escenarios típicos, no casos reales identificables.
            </p>
            <p>
              Los números y resultados están sujetos a:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Cambios en UMA y tasas de Modalidad 40</li>
              <li>Variaciones en documentación disponible para acreditación</li>
              <li>Cambios en políticas IMSS</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Responsabilidades del Usuario</h2>
            <p>Al usar esta plataforma, usted acepta:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Validar cualquier información con fuentes oficiales (IMSS, CONSAR)</li>
              <li>No depender únicamente de estos cálculos para decisiones importantes</li>
              <li>Consultar profesionales certificados para asesoría personalizada</li>
              <li>Obtener su estado de cuenta IMSS antes de aplicar cualquier estrategia</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Limitaciones de Responsabilidad</h2>
            <p>
              La consultoría y su propietario no serán responsables por:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Errores en cálculos o proyecciones</li>
              <li>Cambios normativos no reflejados en la plataforma</li>
              <li>Decisiones tomadas basadas únicamente en esta información</li>
              <li>Rechazos de IMSS en procesos de acreditación o solicitudes</li>
              <li>Cambios en UMA, tasas o políticas de pensión</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Modificaciones de Términos</h2>
            <p>
              Estos términos pueden cambiar en cualquier momento. Se recomienda revisar regularmente
              esta página para estar informado de actualizaciones.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Contacto</h2>
            <p>
              Para preguntas sobre estos términos:
              <br />
              Email: smunozam@gmail.com
              <br />
              WhatsApp: +52 1 55 1234 5678
            </p>
          </section>

          <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg mt-8">
            <p className="text-sm font-semibold text-yellow-900">
              Última actualización: Mayo 20, 2026
            </p>
          </div>
        </div>
      </div>

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
