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
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Política de Privacidad</h1>

        <div className="prose prose-lg max-w-none space-y-8 text-gray-700">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Información que Recopilamos</h2>
            <p>Este sitio recopila:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Emails:</strong> Cuando descargas la guía gratuita (almacenado localmente en JSON)</li>
              <li><strong>Analytics:</strong> Google Analytics para entender uso del sitio (IP anónima, navegador, ubicación)</li>
              <li><strong>Cookies:</strong> Cookies técnicas de sesión (no de seguimiento publicitario)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Datos Sensibles NO Recopilamos</h2>
            <p>
              <strong>Importante:</strong> Esta plataforma NO recopila:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>NSS (Número de Seguro Social)</li>
              <li>RFC o CURP</li>
              <li>Datos bancarios</li>
              <li>Información financiera detallada</li>
              <li>Números telefónicos</li>
              <li>Direcciones personales</li>
            </ul>
            <p className="text-red-600 font-semibold mt-4">
              ⚠️ ADVERTENCIA: Nunca proporcioneis datos sensibles en formularios públicos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Almacenamiento de Emails</h2>
            <p>
              Los emails proporcionados para descargar la guía se almacenan en:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Archivo JSON local en servidor (no base de datos)</li>
              <li>Acceso limitado al propietario de la consultoría</li>
              <li>Sin compartir con terceros</li>
              <li>Eliminable a solicitud del usuario</li>
            </ul>
            <p>
              Para solicitar eliminación de tu email, contáctanos: mi.consultor.pensiones@gmail.com
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Google Analytics</h2>
            <p>
              Utilizamos Google Analytics para entender:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Páginas más visitadas</li>
              <li>Tiempo en sitio</li>
              <li>Dispositivos utilizados</li>
              <li>Ubicación general (país/ciudad, no exacta)</li>
            </ul>
            <p>
              Puedes optar por no ser rastreado instalando <strong>Google Analytics Opt-out Browser Add-on</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Seguridad</h2>
            <p>
              Este sitio utiliza:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>HTTPS encriptado (certificado SSL)</li>
              <li>Servidor seguro (Vercel)</li>
              <li>Sin transmisión de datos sensibles</li>
            </ul>
            <p>
              Sin embargo, ningún sitio es 100% seguro. Si descubres una vulnerabilidad,
              contáctanos inmediatamente en mi.consultor.pensiones@gmail.com.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Derechos del Usuario (LGPD)</h2>
            <p>
              Bajo la Ley General de Protección de Datos Personales (LGPD), tienes derecho a:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Acceder</strong> a tus datos</li>
              <li><strong>Rectificar</strong> información incorrecta</li>
              <li><strong>Eliminar</strong> tu información ("derecho al olvido")</li>
              <li><strong>Portabilidad:</strong> Recibir tus datos en formato transferible</li>
              <li><strong>Oposición</strong> a ciertos usos</li>
            </ul>
            <p>
              Para ejercer estos derechos, escribe a: mi.consultor.pensiones@gmail.com
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cambios en Esta Política</h2>
            <p>
              Esta política puede cambiar en cualquier momento. Los cambios significativos serán
              notificados en el sitio.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Contacto</h2>
            <p>
              Para preguntas sobre privacidad:
              <br />
              <strong>Email:</strong> mi.consultor.pensiones@gmail.com
              <br />
              <strong>WhatsApp:</strong> +52 999 200 5550
            </p>
          </section>

          <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg mt-8">
            <p className="text-sm font-semibold text-blue-900">
              Última actualización: Mayo 22, 2026
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
