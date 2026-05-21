import Link from 'next/link';
import { getPostContent, getPostTitle } from '@/lib/markdown';

export default async function BlogPostPage({ params }: { params: { id: string } }) {
  const content = await getPostContent(params.id);
  const title = getPostTitle(params.id);

  if (!content) {
    return (
      <div className="min-h-screen bg-white">
        <header className="border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Consultoría de Pensiones
            </Link>
          </div>
        </header>
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <p className="text-gray-600">Artículo no encontrado</p>
          <Link href="/blog" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
            ← Volver al blog
          </Link>
        </section>
      </div>
    );
  }

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

      {/* Blog Post */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Link href="/blog" className="text-blue-600 hover:text-blue-800 mb-8 inline-block">
          ← Volver al blog
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mb-8 leading-tight">{title}</h1>

        <div className="prose prose-lg max-w-none">
          <div
            dangerouslySetInnerHTML={{ __html: content }}
            className="text-gray-700 leading-relaxed space-y-6"
          />
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            ¿Quieres una asesoría personalizada?
          </h3>
          <p className="text-gray-600 mb-6">
            Nuestros consultores especializados pueden analizar tu caso específico y recomendarte la mejor estrategia.
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
      </article>

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
