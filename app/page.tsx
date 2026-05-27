'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 sticky top-0 z-50 bg-white/90 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">Consultoría de Pensiones</div>
          <div className="flex gap-4">
            <Link
              href="/calculadora"
              className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
            >
              Calculadora
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
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              ¿Cuándo puedo retirarme?
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 font-light">
              Conoce exactamente cuánto recibirás de pensión y el momento óptimo para jubilarte
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/calculadora"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-50 transition shadow-lg"
              >
                Probar Calculadora Gratis
              </Link>
              <Link
                href="/pension"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition"
              >
                Análisis Completo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-blue-50 border-b border-blue-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-around items-center gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">15+</div>
            <p className="text-gray-700 text-sm">Años de experiencia en pensiones</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">IMSS 2026</div>
            <p className="text-gray-700 text-sm">Normativa actualizada</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">🔒 LFPDPPP</div>
            <p className="text-gray-700 text-sm">Tus datos protegidos</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Cómo funciona
          </h2>
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Explorar</h3>
              <p className="text-gray-600 text-sm">
                Usa la calculadora gratis para ver escenarios según cuándo te retires
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Aprender</h3>
              <p className="text-gray-600 text-sm">
                Lee sobre modalidades, estrategias y casos reales en nuestro blog
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Analizar</h3>
              <p className="text-gray-600 text-sm">
                Paga por análisis actuarial profesional ($4,990) si quieres profundizar
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
                <span className="text-2xl font-bold text-blue-600">4</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Gestionar</h3>
              <p className="text-gray-600 text-sm">
                Contrata para que manejemos tu solicitud ante IMSS ($1,490)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Cases */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Casos de éxito
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <p className="text-gray-600 mb-4 italic">
                "No sabía si podía jubilarse. El análisis le mostró que podía vivir cómodamente desde los 62 años"
              </p>
              <p className="font-semibold text-gray-900">Carlos</p>
              <p className="text-sm text-gray-500">Modalidad 40, mejoró su pensión</p>
              <p className="text-2xl font-bold text-green-600 mt-3">+$1,890/mes</p>
            </div>

            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <p className="text-gray-600 mb-4 italic">
                "Como independiente, creía que nunca alcanzaría 500 semanas. Logramos acreditar 100 más"
              </p>
              <p className="font-semibold text-gray-900">Laura</p>
              <p className="text-sm text-gray-500">Acreditación de períodos</p>
              <p className="text-2xl font-bold text-green-600 mt-3">+100 semanas</p>
            </div>

            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <p className="text-gray-600 mb-4 italic">
                "Entendí que trabajar 2 años más significaba $4,000/mes adicionales. Valió la pena"
              </p>
              <p className="font-semibold text-gray-900">Javier</p>
              <p className="text-sm text-gray-500">Estrategia de jubilación</p>
              <p className="text-2xl font-bold text-green-600 mt-3">+$4,000/mes</p>
            </div>
          </div>
          <div className="text-center mt-10">
            <Link href="/casos" className="text-blue-600 hover:text-blue-700 font-semibold">
              Ver más casos →
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Aprende sobre pensiones
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
              <h3 className="font-bold text-gray-900 mb-3">¿Quién puede jubilarse?</h3>
              <p className="text-gray-600 text-sm mb-4">
                Requisitos, modalidades y opciones bajo Ley 73
              </p>
              <Link href="/blog" className="text-blue-600 hover:text-blue-700 text-sm font-semibold">
                Leer más →
              </Link>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
              <h3 className="font-bold text-gray-900 mb-3">Modalidad 40</h3>
              <p className="text-gray-600 text-sm mb-4">
                Cómo cotizar voluntariamente después de los 55
              </p>
              <Link href="/blog" className="text-blue-600 hover:text-blue-700 text-sm font-semibold">
                Leer más →
              </Link>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
              <h3 className="font-bold text-gray-900 mb-3">Casos prácticos</h3>
              <p className="text-gray-600 text-sm mb-4">
                Historias reales de cómo optimizar tu pensión
              </p>
              <Link href="/blog" className="text-blue-600 hover:text-blue-700 text-sm font-semibold">
                Leer más →
              </Link>
            </div>
          </div>
          <div className="text-center mt-10">
            <Link href="/blog" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
              Ver todos los recursos
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-20 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Listo para tomar control de tu jubilación?</h2>
          <p className="text-xl text-blue-100 mb-8">
            La calculadora es gratis. El análisis profesional es $4,990. La gestión ante IMSS es $1,490.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/calculadora"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-50 transition"
            >
              Empezar Ahora
            </Link>
            <a
              href="https://wa.me/529992005550"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-700 transition"
            >
              Contactar por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">Herramientas</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/calculadora" className="hover:text-white">Calculadora</Link></li>
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
                <li><Link href="/casos" className="hover:text-white">Casos de éxito</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Servicios</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/pension" className="hover:text-white">Análisis Actuarial</Link></li>
                <li><Link href="/servicios" className="hover:text-white">Gestión IMSS</Link></li>
                <li><Link href="/about" className="hover:text-white">Acerca de Sergio</Link></li>
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
                <li>Email: sergio@asesor-pensiones.mx</li>
                <li>WhatsApp: +52 999 200 5550</li>
                <li>Mérida, Yucatán, México</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8">
            <div className="text-center text-gray-400 mb-4">
              <p className="text-sm">🔒 Protegido bajo LFPDPPP | Datos encriptados | Privacidad garantizada</p>
            </div>
            <p className="text-center text-gray-500 text-sm">&copy; 2026 Consultoría Integral de Pensiones. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
