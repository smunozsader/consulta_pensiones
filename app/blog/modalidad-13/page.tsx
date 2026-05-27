'use client';
import Link from 'next/link';
import Footer from '@/app/components/Footer';
import GatedContentBoundary from '@/app/components/GatedContentBoundary';

export default function Modalidad13() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Consultoría de Pensiones
          </Link>
        </div>
      </header>

      <GatedContentBoundary><main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/blog" className="text-blue-600 hover:text-blue-800 mb-6 inline-block">
          ← Volver al blog
        </Link>

        <article className="prose prose-lg max-w-none" style={{color: '#1f2937'}}>
          <h1>Modalidad 13: Trabajadores del Campo</h1>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded my-6">
            <p className="text-sm text-yellow-800">
              <strong>⚠️ Estimativo legal:</strong> Esta información se basa en la Ley del Seguro Social vigente (Mayo 2026).
              Valida cada caso con IMSS antes de tomar decisiones. Art. 234-239 LSS.
            </p>
          </div>

          <h2>Resumen Ejecutivo</h2>
          <p>
            Modalidad 13 es el régimen especial para trabajadores del campo: agricultores, ganaderos, apicultores y productores rurales.
            Tiene <strong>requisitos más altos</strong> (750 semanas, no 500) pero aportaciones más bajas.
          </p>

          <h2>¿Quiénes Cotizan en Modalidad 13?</h2>
          <p>Trabajadores rurales en actividades agrícolas:</p>
          <ul>
            <li>Agricultores (maíz, trigo, frutas, hortalizas)</li>
            <li>Ganaderos (crianza de ganado bovino, porcino, caprino)</li>
            <li>Apicultores (producción de miel)</li>
            <li>Silvicultores (aprovechamiento forestal)</li>
            <li>Acuacultores (piscicultura)</li>
            <li>Otros productores rurales</li>
          </ul>

          <h2>Aportaciones Variables (Estacionalidad)</h2>
          <p>
            A diferencia de Modalidad 10 (aportación fija), Modalidad 13 permite aportaciones variables según ingresos estacionales.
          </p>
          <p>
            <strong>Ejemplo:</strong> Un ganadero puede cotizar más en temporada de venta de ganado, menos en temporada baja.
          </p>

          <h2>⚠️ El Requisito Crítico: 750 Semanas (Art. 234-239 LSS)</h2>
          <p>
            <strong>Esto es fundamental:</strong> Modalidad 13 requiere <strong>750 semanas cotizadas</strong>, no 500 como otras modalidades.
          </p>
          <p>
            750 semanas = 14.4 años de cotización continua.
          </p>
          <p>
            Si un trabajador agrícola tiene 600 semanas, le faltan 150 semanas (3 años) para jubilarse en Modalidad 13.
            <strong>Alternativa:</strong> Cambiar a Modalidad 40 (solo necesita 500 semanas totales).
          </p>

          <h2>¿Cuánto Cuesta Cotizar?</h2>
          <p>
            Las aportaciones están reguladas por tabla IMSS. Son generalmente más bajas que Modalidad 10,
            reconociendo la variabilidad de ingresos agrícolas.
          </p>
          <p>
            <strong>Rango aproximado:</strong> 10-12% de la base de cotización (menor que Modalidad 10).
          </p>

          <h2>El Desafío Real: Volatilidad de Ingresos</h2>
          <p>
            La agricultura es impredecible: sequía, plagas, mercado bajo, cambios climáticos.
          </p>
          <p>
            Muchos trabajadores agrícolas dejan de cotizar en años malos, generando brechas en su contribución.
            Esto afecta directamente su elegibilidad para pensión.
          </p>

          <h2>Requisitos</h2>
          <ul>
            <li>RFC actualizado</li>
            <li>Comprobante de domicilio</li>
            <li>Comprobante de actividad agrícola (certificado de tierra, factura de venta, etc.)</li>
            <li>Identificación oficial</li>
          </ul>

          <h2>Próximos Pasos</h2>
          <ol>
            <li><strong>Registrate en el IMSS:</strong> Como productor agrícola, Modalidad 13</li>
            <li><strong>Verifica tu saldo actual:</strong> ¿Cuántas semanas tienes?</li>
            <li><strong>Si te faltan más de 100 semanas:</strong> Considera cambiar a Modalidad 40</li>
            <li><strong>Cotiza regularmente:</strong> Evita brechas que compliquen tu elegibilidad</li>
          </ol>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded my-6 text-center">
            <p className="text-gray-700 mb-4">¿Eres productor agrícola? Analicemos tu mejor estrategia</p>
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
      </main></GatedContentBoundary>

      <Footer />
    </div>
  );
}
