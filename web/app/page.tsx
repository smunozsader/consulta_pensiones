'use client';

import Link from 'next/link';
import { useState } from 'react';
import Hero from './components/Hero';
import ConsentCheckboxes from './components/ConsentCheckboxes';

export default function Home() {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [nss, setNss] = useState('');
  const [semanas, setSemanas] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [marketingAccepted, setMarketingAccepted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validar que privacidad sea aceptada
    if (!privacyAccepted) {
      setError('Debes aceptar los Términos y Condiciones y el Aviso de Privacidad para continuar.');
      return;
    }

    // Validar campos requeridos
    if (!nombre.trim() || !telefono.trim() || !correo.trim()) {
      setError('Por favor completa todos los campos requeridos');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: nombre.trim(),
          telefono: telefono.trim(),
          correo: correo.trim(),
          nss: nss.trim() || undefined,
          semanas_cotizadas: semanas ? parseInt(semanas) : undefined,
          privacyAccepted,
          marketingAccepted
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setNombre('');
        setTelefono('');
        setCorreo('');
        setNss('');
        setSemanas('');
        setPrivacyAccepted(false);
        setMarketingAccepted(false);
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError(data.error || 'Hubo un error al procesar tu solicitud');
      }
    } catch (err) {
      console.error(err);
      setError('Error de conexión. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 sticky top-0 z-50 bg-white/90 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">Consultoría de Pensiones</div>
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

      {/* Hero Section - Figma Design */}
      <Hero />

      {/* Social Proof */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Por qué elegir nuestra asesoría
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="text-blue-600 text-3xl font-bold mb-3">15+</div>
              <h3 className="font-semibold text-gray-900 mb-2">Años de experiencia</h3>
              <p className="text-gray-600">Especializado en normativa IMSS e ISSSTE</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="text-blue-600 text-3xl font-bold mb-3">+$5M</div>
              <h3 className="font-semibold text-gray-900 mb-2">En pensiones optimizadas</h3>
              <p className="text-gray-600">Nuestros clientes han mejorado en promedio</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="text-blue-600 text-3xl font-bold mb-3">98%</div>
              <h3 className="font-semibold text-gray-900 mb-2">Satisfacción</h3>
              <p className="text-gray-600">Clientes que recomiendan nuestro servicio</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Form Section */}
      <section id="form" className="bg-gradient-to-r from-blue-600 to-blue-800 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg p-8 md:p-12 shadow-xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Accede a Contenido Educativo Completo
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Registra tus datos para acceder a artículos, calculadora de pensiones y casos de éxito.
              Te enviaremos un link de acceso a tu correo electrónico.
            </p>

            <form onSubmit={handleSubmit}>
              {/* Nombre */}
              <div className="mb-6">
                <label className="block text-gray-900 text-sm font-semibold mb-2">
                  Nombre completo <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Tu nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Teléfono */}
              <div className="mb-6">
                <label className="block text-gray-900 text-sm font-semibold mb-2">
                  WhatsApp <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="+52 999 200 5550"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Correo */}
              <div className="mb-6">
                <label className="block text-gray-900 text-sm font-semibold mb-2">
                  Correo electrónico <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="tu@correo.com"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* NSS y Semanas en dos columnas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-gray-900 text-sm font-semibold mb-2">
                    NSS <span className="text-gray-500 font-normal">(opcional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="00000000000"
                    value={nss}
                    onChange={(e) => setNss(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-gray-900 text-sm font-semibold mb-2">
                    Semanas cotizadas <span className="text-gray-500 font-normal">(opcional)</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="750"
                    placeholder="500"
                    value={semanas}
                    onChange={(e) => setSemanas(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Consent Checkboxes */}
              <div className="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
                <ConsentCheckboxes
                  privacyAccepted={privacyAccepted}
                  setPrivacyAccepted={setPrivacyAccepted}
                  marketingAccepted={marketingAccepted}
                  setMarketingAccepted={setMarketingAccepted}
                  darkMode={false}
                />
              </div>

              {/* Error message */}
              {error && (
                <div className="mb-6 bg-red-50 border border-red-300 rounded-lg p-4">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !privacyAccepted}
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Procesando...' : 'Recibir Acceso'}
              </button>
            </form>

            {submitted && (
              <div className="mt-4 bg-green-50 border border-green-300 rounded-lg p-4">
                <p className="text-green-800 text-center">
                  ✓ Revisa tu correo. Te enviaremos el link de acceso en los próximos minutos.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            Recursos educativos gratuitos
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Elegibilidad Ley 73', desc: 'Requisitos y modalidades de pensión', href: '/blog/elegibilidad-ley73' },
              { title: 'Modalidad 40', desc: 'Cómo cotizar voluntariamente después de los 55', href: '/blog/modalidad-40' },
              { title: 'Casos Prácticos', desc: 'Historias reales de cómo optimizar tu pensión', href: '/blog/casos-ley73' },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition"
              >
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/blog" className="text-blue-600 hover:text-blue-800 font-semibold">
              Ver todos los recursos →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
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
