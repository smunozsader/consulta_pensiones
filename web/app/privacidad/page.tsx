'use client';

import Link from 'next/link';

export default function PrivacidadPage() {
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
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Aviso de Privacidad Integral</h1>
        <p className="text-gray-600 mb-8 text-sm italic">Conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP, 2025)</p>

        <div className="prose prose-lg max-w-none space-y-8 text-gray-700">
          <section className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Responsable del Tratamiento de Datos</h2>
            <p>
              <strong>Nombre:</strong> Consultoría Integral de Pensiones<br/>
              <strong>Responsable Legal:</strong> Sergio Muñoz de Alba Medrano<br/>
              <strong>Domicilio:</strong> Mérida, Yucatán, México<br/>
              <strong>Email:</strong> mi.consultor.pensiones@gmail.com<br/>
              <strong>WhatsApp:</strong> +52 999 200 5550
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Finalidades del Tratamiento de Datos</h2>
            <p><strong>Finalidades Principales:</strong></p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Gestionar tu registro como usuario en el sitio web</li>
              <li>Procesar tu solicitud de consultoría sobre pensiones</li>
              <li>Enviar la guía gratuita solicitada (cálculo de semanas cotizadas)</li>
              <li>Brindar asesoría personalizada conforme contratos de servicios</li>
            </ul>
            <p className="mt-4"><strong>Finalidades Secundarias:</strong></p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Enviar boletines educativos sobre normativa de pensiones</li>
              <li>Información sobre nuevos servicios o contenidos del blog</li>
              <li>Análisis estadístico del uso del sitio</li>
            </ul>
            <p className="mt-4 text-sm text-gray-600">
              <strong>Negativa de Tratamiento Secundario:</strong> Si no deseas que tus datos se usen para finalidades secundarias,
              deberás indicarlo explícitamente al momento de proporcionarnos tus datos o enviando un correo a mi.consultor.pensiones@gmail.com
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Datos Personales que Recabamos</h2>
            <p>El sitio web recopila los siguientes datos personales:</p>
            <ul className="list-disc pl-6 space-y-2 my-4">
              <li><strong>Datos Básicos:</strong> Nombre completo, correo electrónico, teléfono (opcional)</li>
              <li><strong>Datos Laborales (para consultoría):</strong> Historia laboral, número de semanas cotizadas, Salario Diario Promedio</li>
              <li><strong>Datos de Análisis:</strong> Información de navegación en el sitio (Google Analytics - anónima)</li>
              <li><strong>Datos de Contacto:</strong> Registrados mediante formularios o WhatsApp</li>
            </ul>
            <div className="bg-red-50 p-4 rounded border-l-4 border-red-600 my-4">
              <p className="font-bold text-red-900 mb-2">⚠️ Datos que NO Solicitamos:</p>
              <p className="text-sm">
                Esta plataforma <strong>NO solicita</strong>: NSS, RFC, CURP, datos bancarios, ni información financiera sensible.
                <br/><strong>NUNCA</strong> proporciones estos datos a través de formularios públicos.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Transferencia de Datos a Terceros</h2>
            <p>
              Tus datos personales <strong>NO se ceden ni transfieren a terceros</strong> sin tu consentimiento expreso,
              excepto cuando sea requerido por ley.
            </p>
            <p className="mt-4">
              <strong>Proveedores de Servicios Técnicos (con protección de privacidad):</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li><strong>Vercel:</strong> Hosting y alojamiento con HTTPS/SSL encriptado</li>
              <li><strong>Firebase:</strong> Base de datos segura para almacenar datos (Google Cloud)</li>
              <li><strong>Google Analytics:</strong> Análisis agregado y anónimo de navegación</li>
              <li><strong>Resend:</strong> Envío de emails automáticos (comunicaciones)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Almacenamiento, Seguridad y Plazo de Conservación</h2>
            <p><strong>Medidas de Seguridad:</strong></p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Encriptación HTTPS:</strong> Todos los datos viajan encriptados entre tu navegador y nuestros servidores</li>
              <li><strong>Acceso Limitado:</strong> Solo personal autorizado puede acceder a tus datos</li>
              <li><strong>Sin Compartir:</strong> No se comparten con terceros para fines de marketing</li>
            </ul>
            <p className="mt-4">
              <strong>Plazo de Conservación:</strong> Los datos se guardan solo el tiempo necesario para cumplir sus finalidades.
              Una vez alcanzado ese plazo, serán eliminados de nuestras bases de datos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Cookies y Tecnologías de Rastreo</h2>
            <p>
              Este sitio utiliza <strong>cookies técnicas de sesión</strong> para funcionar correctamente.
              <strong>NO utilizamos cookies de publicidad o seguimiento invasivo.</strong>
            </p>
            <p className="mt-4">
              <strong>Cookies Utilizadas:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li>Cookies de sesión (para mantener tu usuario autenticado - no persistentes)</li>
              <li>Google Analytics (datos agregados y anónimos de navegación)</li>
            </ul>
            <p className="mt-4 text-sm">
              Puedes desactivar cookies en la configuración de tu navegador, aunque esto puede afectar la funcionalidad del sitio.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Derechos ARCO (Derechos Garantizados)</h2>
            <p>
              Conforme a los <strong>Artículos 16 de la Constitución Mexicana</strong> y la <strong>LFPDPPP (2025)</strong>,
              tienes los siguientes derechos sobre tus datos personales:
            </p>
            <div className="grid md:grid-cols-2 gap-4 my-6">
              <div className="bg-green-50 p-4 rounded border-l-4 border-green-600">
                <p className="font-bold text-green-900 mb-2">🔍 Acceso (A)</p>
                <p className="text-sm">Acceder a tus datos personales que tenemos en nuestro poder</p>
              </div>
              <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-600">
                <p className="font-bold text-blue-900 mb-2">✏️ Rectificación (R)</p>
                <p className="text-sm">Rectificar información incorrecta o incompleta</p>
              </div>
              <div className="bg-red-50 p-4 rounded border-l-4 border-red-600">
                <p className="font-bold text-red-900 mb-2">🗑️ Cancelación (C)</p>
                <p className="text-sm">Solicitar la eliminación de tus datos cuando ya no sean necesarios</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded border-l-4 border-yellow-600">
                <p className="font-bold text-yellow-900 mb-2">🚫 Oposición (O)</p>
                <p className="text-sm">Oponerte al tratamiento de tus datos para ciertos fines</p>
              </div>
            </div>

            <p className="font-bold mt-6">Procedimiento para Ejercer Derechos ARCO:</p>
            <ol className="list-decimal pl-6 space-y-3 mt-3 text-sm">
              <li><strong>Envía tu solicitud</strong> a mi.consultor.pensiones@gmail.com indicando:
                <ul className="list-disc pl-6 mt-2">
                  <li>Tu nombre completo</li>
                  <li>Derecho que deseas ejercer (Acceso, Rectificación, Cancelación u Oposición)</li>
                  <li>Información que permita identificarte</li>
                  <li>Copia de tu identificación oficial</li>
                </ul>
              </li>
              <li><strong>Plazo de Respuesta:</strong> Responderemos dentro de <strong>20 días hábiles</strong></li>
              <li><strong>Confirmación de Identidad:</strong> Podemos solicitar documentación adicional para verificarte</li>
            </ol>

            <div className="bg-blue-50 p-4 rounded mt-6 text-sm border-l-4 border-blue-600">
              <p className="font-bold text-blue-900 mb-2">Principios Fundamentales de Protección:</p>
              <p>El tratamiento de tus datos se rige por: <strong>licitud, finalidad, lealtad, consentimiento,
              calidad, proporcionalidad, información y responsabilidad</strong>.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cambios en Este Aviso de Privacidad</h2>
            <p>
              Este Aviso de Privacidad puede ser actualizado en cualquier momento para reflejar cambios en nuestras
              prácticas, tecnología, normativa legal o por otras razones operacionales.
            </p>
            <p className="mt-4">
              Los cambios significativos serán notificados en esta página y por correo electrónico si afectan tus derechos fundamentales.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Información de Contacto y Atención</h2>
            <div className="bg-gray-50 p-6 rounded border-l-4 border-gray-600">
              <p className="font-bold text-gray-900 mb-4">Si tienes preguntas sobre privacidad o deseas ejercer tus derechos ARCO:</p>
              <ul className="space-y-2 text-sm">
                <li><strong>📧 Email:</strong> mi.consultor.pensiones@gmail.com</li>
                <li><strong>💬 WhatsApp:</strong> +52 999 200 5550</li>
                <li><strong>📍 Domicilio:</strong> Mérida, Yucatán, México</li>
                <li><strong>⏱️ Tiempo de Respuesta:</strong> Dentro de 20 días hábiles</li>
              </ul>
            </div>
          </section>

          <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg mt-8">
            <p className="text-sm font-semibold text-yellow-900">
              Última actualización: Mayo 22, 2026
              <br/>
              Vigencia: A partir del 20 de marzo de 2025 (conforme a LFPDPPP)
            </p>
          </div>
        </div>
      </div>

      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">Consultoría</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/about" className="hover:text-white">Acerca de</Link></li>
                <li><Link href="/casos" className="hover:text-white">Casos de éxito</Link></li>
                <li><a href="https://wa.me/529992005550" className="hover:text-white">Agendar consulta</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Recursos</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
                <li><a href="#form" className="hover:text-white">Descargar guía</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/privacidad" className="hover:text-white">Privacidad</Link></li>
                <li><Link href="/terminos" className="hover:text-white">Términos</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contacto</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Email: mi.consultor.pensiones@gmail.com</li>
                <li>WhatsApp: +52 999 200 5550</li>
                <li>Mérida, Yucatán</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2026 Consultoría Integral de Pensiones. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
