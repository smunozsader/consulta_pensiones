'use client';

import Link from 'next/link';
import { useState } from 'react';
import Hero from './components/Hero';

export default function Home() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSubmitted(true);
        setEmail('');
        setTimeout(() => setSubmitted(false), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 absolute top-0 left-0 right-0 z-10 bg-white/80 backdrop-blur">
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

      {/* Legal Disclaimer */}
      <section className="bg-yellow-50 py-8 mt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <div className="flex items-start">
              <span className="text-xl mr-3">⚠️</span>
              <div>
                <p className="text-sm text-yellow-800">
                  <strong>Estimativo legal:</strong> Esta información se basa en la Ley del Seguro Social vigente (Mayo 2026).
                  Valida cada caso con IMSS antes de tomar decisiones.{' '}
                  <a href="/privacidad" className="underline font-semibold hover:text-yellow-900">
                    Ver detalles legales
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

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
      <section id="form" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Descarga la guía: Cálculo de Semanas Cotizadas
          </h2>
          <p className="text-lg mb-8 text-blue-100">
            Entiende cómo el IMSS cuenta tus semanas y cómo esto afecta tu pensión.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md">
            <div className="mb-4">
              <label className="block text-white text-sm font-medium mb-2">Tu correo electrónico</label>
              <input
                type="email"
                placeholder="ejemplo@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-blue-600 font-bold py-3 rounded-lg hover:bg-blue-50 transition disabled:opacity-50"
            >
              {loading ? 'Enviando...' : 'Recibir Guía Gratis'}
            </button>
          </form>

          {submitted && (
            <p className="text-green-100 mt-4">
              ✓ Revisa tu correo. Te enviaremos la guía en los próximos minutos.
            </p>
          )}
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
