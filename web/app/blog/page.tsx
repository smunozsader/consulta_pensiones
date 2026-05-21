'use client';

import Link from 'next/link';
import LegalDisclaimer from '../components/LegalDisclaimer';

const blogPosts = [
  {
    id: 'elegibilidad-ley73',
    title: 'Elegibilidad Ley 73: ¿Quién tiene derecho a pensión?',
    excerpt: 'Comprende los requisitos completos para acceder a una pensión bajo la Ley 73 del IMSS y los diferentes tipos de pensión disponibles.',
    category: 'Ley 73',
    date: '2026-05-20',
  },
  {
    id: 'modalidad-10',
    title: 'Modalidad 10: Cómo funciona para independientes urbanos',
    excerpt: 'Guía completa sobre la Modalidad 10 de cotización, ideal para profesionales independientes y trabajadores por cuenta propia.',
    category: 'Modalidades',
    date: '2026-05-19',
  },
  {
    id: 'modalidad-40',
    title: 'Modalidad 40: Tu estrategia para optimizar pensión después de los 55',
    excerpt: 'Descubre cómo la Modalidad 40 te permite cotizar voluntariamente y mejorar significativamente tu pensión en los años previos a la jubilación.',
    category: 'Modalidades',
    date: '2026-05-18',
  },
  {
    id: 'modalidad-13',
    title: 'Modalidad 13: Especial para trabajadores del campo',
    excerpt: 'La Modalidad 13 está diseñada para agricultores, ganaderos y otros trabajadores rurales. Conoce sus características y beneficios.',
    category: 'Modalidades',
    date: '2026-05-17',
  },
  {
    id: 'casos-ley73',
    title: 'Casos Prácticos Ley 73: Historias reales de optimización',
    excerpt: 'Estudios de casos reales mostrando cómo diferentes estrategias resultan en pensiones significativamente mejores.',
    category: 'Casos Prácticos',
    date: '2026-05-16',
  },
  {
    id: 'casos-ley97',
    title: 'Ley 97 y AFORES: La realidad de las generaciones jóvenes',
    excerpt: 'Análisis completo de cómo funciona la Ley 97, sus limitaciones y la injusticia sistémica para trabajadores de bajos ingresos.',
    category: 'Ley 97',
    date: '2026-05-15',
  },
];

export default function BlogPage() {
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

      {/* Blog Content */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Recursos educativos sobre pensiones
          </h1>
          <p className="text-xl text-gray-600">
            Guías completas, casos prácticos y análisis normativo para ayudarte a entender tus opciones de pensión.
          </p>
        </div>

        <div className="mb-8">
          <LegalDisclaimer variant="compact" />
        </div>

        <div className="grid gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="border border-gray-200 rounded-lg p-8 hover:shadow-lg transition"
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded">
                  {post.category}
                </span>
                <time className="text-gray-500 text-sm">{post.date}</time>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">{post.title}</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">{post.excerpt}</p>
              <Link
                href={`/blog/${post.id}`}
                className="text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center gap-2"
              >
                Leer artículo completo
                <span>→</span>
              </Link>
            </article>
          ))}
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
