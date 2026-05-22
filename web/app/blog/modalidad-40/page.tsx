import Link from 'next/link';

export default function Modalidad40() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Consultoría de Pensiones
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/blog" className="text-blue-600 hover:text-blue-800 mb-6 inline-block">
          ← Volver al blog
        </Link>

        <article className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-800 prose-li:text-gray-800">
          <h1>Modalidad 40: La Estrategia de Cotización Voluntaria</h1>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded my-6">
            <p className="text-sm text-yellow-800">
              <strong>⚠️ Estimativo legal:</strong> Esta información se basa en la Ley del Seguro Social vigente (Mayo 2026).
              Valida cada caso con IMSS antes de tomar decisiones.
            </p>
          </div>

          <h2>Resumen Ejecutivo</h2>
          <p>
            Modalidad 40 permite cotizar voluntariamente al IMSS después de dejar de trabajar o después de los 55 años.
            Es <strong>la estrategia más efectiva</strong> para mejorar tu pensión en los últimos años antes de jubilarte.
          </p>

          <h2>¿Qué es Modalidad 40?</h2>
          <p>
            Es un régimen de cotización voluntaria que permite a personas que dejaron de cotizar (o mayores de 55 años)
            volver a contribuir al IMSS. Cada aportación que hagas aumenta:
          </p>
          <ul>
            <li><strong>Tu semanas cotizadas:</strong> Acelera llegar a 500 semanas</li>
            <li><strong>Tu salario promedio:</strong> Cotizaciones recientes (con mejor salario) suben el promedio histórico</li>
            <li><strong>Tu pensión final:</strong> Ambos factores impactan directamente tu pensión mensual</li>
          </ul>

          <h2>¿Para quién es Modalidad 40?</h2>
          <p>
            Es ideal para personas en esta situación:
          </p>
          <ul>
            <li>Edades 55-65 años</li>
            <li>Dejaron de trabajar antes de los 65 años</li>
            <li>Tienen 400-499 semanas cotizadas (cercanos a 500)</li>
            <li>Quieren mejorar su pensión antes de jubilarse</li>
          </ul>

          <h2>¿Cuánto Cuesta?</h2>
          <p>
            Depende del salario que declares. Cotizas como si fueras <strong>trabajador dependiente</strong> (eres
            tu propio patrón).
          </p>
          <p>
            <strong>Ejemplo:</strong> Si declares un salario de $15,000 mensuales:
          </p>
          <ul>
            <li>Tu aportación: ~$1,500-2,000 mensuales</li>
            <li>Válido por 12 meses (52 semanas)</li>
            <li>Costo anual: ~$18,000-24,000</li>
          </ul>

          <h2>El Desafío: Comisiones Ocultas</h2>
          <p>
            <strong>Atención:</strong> Hay intermediarios que cobran comisiones (hasta 15%) por gestionar tu Modalidad 40.
            Esto reduce efectivamente tu pensión final.
          </p>
          <p>
            Recomendación: Cotiza directamente en IMSS o con asesoría que no cobre comisiones sobre aportaciones.
          </p>

          <h2>Requisitos</h2>
          <ul>
            <li>Haber sido asegurado del IMSS en el pasado</li>
            <li>No estar trabajando en ese momento (o estar fuera del sistema)</li>
            <li>Mayor de 55 años (o cesante con 52 años cotizados)</li>
            <li>Comprobante de domicilio y RFC actualizado</li>
          </ul>

          <h2>Próximos Pasos</h2>
          <ol>
            <li><strong>Solicita tu estado de cuenta:</strong> Verifica semanas cotizadas y salario promedio</li>
            <li><strong>Calcula el impacto:</strong> ¿Cuántas semanas te faltan? ¿Cuánto mejoraría tu salario promedio?</li>
            <li><strong>Decide tu estrategia:</strong> ¿Cuántos meses de Modalidad 40 necesitas?</li>
            <li><strong>Cotiza:</strong> Directamente en IMSS o con asesor de confianza</li>
          </ol>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded my-6 text-center">
            <p className="text-gray-700 mb-4">¿Modalidad 40 es para ti? Déjame analizar tu caso</p>
            <a
              href="https://wa.me/529992005550"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Contactar por WhatsApp
            </a>
          </div>
        </article>
      </main>
    </div>
  );
}
