import Link from 'next/link';

export default function ElegibilidadLey73() {
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
          <h1>Elegibilidad Ley 73: ¿Quién tiene derecho a pensión?</h1>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded my-6">
            <p className="text-sm text-yellow-800">
              <strong>⚠️ Estimativo legal:</strong> Esta información se basa en la Ley del Seguro Social vigente (Mayo 2026).
              Valida cada caso con IMSS antes de tomar decisiones.
            </p>
          </div>

          <h2>Resumen Ejecutivo</h2>
          <p>
            La elegibilidad para pensión bajo Ley 73 requiere cumplir requisitos claros: edad mínima, semanas cotizadas, y
            documentación de períodos laborales. Este documento explica cada requisito sin jerga legal, con ejemplos prácticos.
          </p>

          <h2>¿Quiénes pueden pensionarse?</h2>
          <p>
            Bajo Ley 73 pueden pensionarse personas que han cotizado al IMSS y cumplen requisitos según su modalidad de cobertura:
          </p>
          <ul>
            <li><strong>Trabajadores dependientes:</strong> Empleados en empresas privadas o públicas</li>
            <li><strong>Independientes (Modalidad 10):</strong> Profesionales, comerciantes, artesanos sin patrón</li>
            <li><strong>Voluntarios (Modalidad 40):</strong> Personas que cotizan voluntariamente después de los 55 años</li>
            <li><strong>Trabajadores del campo (Modalidad 13):</strong> Agricultores, ganaderos, apicultores</li>
          </ul>

          <h2>Requisitos Principales</h2>

          <h3>1. Semanas Cotizadas</h3>
          <p>
            El requisito fundamental es haber contribuido al IMSS durante el tiempo suficiente:
          </p>
          <ul>
            <li><strong>500 semanas mínimo</strong> para la mayoría de modalidades (Ley 73)</li>
            <li><strong>750 semanas</strong> para Modalidad 13 (trabajadores del campo) - Art. 234-239 LSS</li>
          </ul>

          <h3>2. Edad</h3>
          <ul>
            <li><strong>Vejez:</strong> 65 años cumplidos</li>
            <li><strong>Cesantía en edad avanzada:</strong> 60 años y 500 semanas cotizadas</li>
            <li><strong>Invalidez:</strong> Sin límite de edad</li>
          </ul>

          <h3>3. Documentación</h3>
          <p>
            <strong>Requisito crítico:</strong> Acreditación de períodos laborales. El IMSS no reconoce automáticamente
            el tiempo trabajado sin documentación.
          </p>
          <p>Necesitas:</p>
          <ul>
            <li>Estado de cuenta IMSS actualizado</li>
            <li>Cartas patronales de empleadores anteriores</li>
            <li>Recibos de nómina (últimos 3 años de empleo)</li>
            <li>Comprobante de domicilio</li>
          </ul>

          <h2>El Desafío: Acreditación de Períodos</h2>
          <p>
            Muchas personas creen que porque trabajaron formalmente durante 30 años, el IMSS automáticamente reconoce esos
            años. <strong>No es así.</strong>
          </p>
          <p>
            Si no tienes documentación de períodos anteriores, debes acreditar ante el IMSS. Esto toma tiempo y requiere
            gestión. Es uno de los servicios principales de esta consultoría.
          </p>

          <h2>Próximos Pasos</h2>
          <ol>
            <li><strong>Solicita tu estado de cuenta IMSS:</strong> En línea en www.imss.gob.mx o en una sucursal</li>
            <li><strong>Verifica tu saldo de semanas:</strong> ¿Tienes 500+ semanas?</li>
            <li><strong>Si hay lagunas:</strong> Reúne documentación para acreditación</li>
            <li><strong>Contacta para asesoría personalizada:</strong> Cada caso es único</li>
          </ol>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded my-6 text-center">
            <p className="text-gray-700 mb-4">¿Necesitas ayuda con tu caso específico?</p>
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
