import Link from 'next/link';

export default function Modalidad10() {
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

        <article className="prose prose-lg max-w-none" style={{color: '#1f2937'}}>
          <h1>Modalidad 10: Trabajadores Independientes Urbanos</h1>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded my-6">
            <p className="text-sm text-yellow-800">
              <strong>⚠️ Estimativo legal:</strong> Esta información se basa en la Ley del Seguro Social vigente (Mayo 2026).
              Valida cada caso con IMSS antes de tomar decisiones.
            </p>
          </div>

          <h2>Resumen Ejecutivo</h2>
          <p>
            Modalidad 10 es el régimen de cotización para trabajadores independientes urbanos: profesionales, comerciantes,
            artesanos y consultores sin patrón. Es <strong>obligatoria</strong> si tienes ingresos propios formalizados.
          </p>

          <h2>¿Quiénes Cotizan en Modalidad 10?</h2>
          <p>Cualquier persona que trabaje por cuenta propia en actividades urbanas:</p>
          <ul>
            <li>Contadores, abogados, ingenieros (profesionales independientes)</li>
            <li>Dueños de negocios (comercios, restaurantes, tiendas)</li>
            <li>Artesanos y maestros de oficios</li>
            <li>Consultores y asesores</li>
            <li>Cualquier actividad económica urbana sin relación laboral</li>
          </ul>

          <h2>¿Es Obligatoria?</h2>
          <p>
            <strong>Sí, es obligatoria</strong> si tienes ingresos propios de una actividad económica formal.
            El IMSS puede sancionar el incumplimiento con multas.
          </p>

          <h2>La Base de Cotización: Tu Salario Real</h2>
          <p>
            En Modalidad 10, <strong>declaras tus ingresos reales</strong> (o aquellos con que quieras cotizar).
            Esto es diferente de Modalidad 13, donde hay tablas fijas.
          </p>
          <p>
            <strong>Importante:</strong> La base de cotización impacta directamente tu pensión final.
            A mayor salario declarado, mayor pensión (pero mayor aportación).
          </p>

          <h2>¿Cuánto Cuesta Cotizar?</h2>
          <p>Cotizas como si fueras empleado y patrón a la vez:</p>
          <ul>
            <li><strong>Aportación aproximada:</strong> 15-16% de tu base de cotización</li>
            <li><strong>Ejemplo:</strong> Si cotizas $10,000 mensuales, tu aportación es ~$1,500-1,600</li>
          </ul>

          <h2>El Desafío: Honestidad en la Declaración</h2>
          <p>
            El gran reto de Modalidad 10 es que <strong>depende de lo que declares</strong>.
          </p>
          <p>
            Algunos independientes declaran salarios muy bajos para pagar menos aportaciones.
            El problema: terminan con pensiones muy bajas porque el IMSS calcula basado en lo que cotizaste.
          </p>
          <p>
            <strong>Recomendación:</strong> Declara ingresos cercanos a la realidad. Es inversión en tu jubilación.
          </p>

          <h2>Requisitos</h2>
          <ul>
            <li>RFC actualizado</li>
            <li>Comprobante de domicilio</li>
            <li>Identificación oficial</li>
            <li>Registro en el IMSS como independiente</li>
          </ul>

          <h2>Próximos Pasos</h2>
          <ol>
            <li><strong>Registrate en el IMSS:</strong> Como trabajador independiente, Modalidad 10</li>
            <li><strong>Define tu base de cotización:</strong> Considera tus ingresos reales y tu meta de pensión</li>
            <li><strong>Paga mensualmente:</strong> Directo en banco o en ventanilla IMSS</li>
            <li><strong>Monitorea tu estado de cuenta:</strong> Verifica que tus cotizaciones se registren</li>
          </ol>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded my-6 text-center">
            <p className="text-gray-700 mb-4">¿Necesitas ayuda con tu registro en Modalidad 10?</p>
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
