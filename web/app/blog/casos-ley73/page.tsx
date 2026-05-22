import Link from 'next/link';

export default function CasosLey73() {
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

        <article className="prose prose-lg max-w-none">
          <h1>Casos Prácticos: Historias Reales de Optimización de Pensión</h1>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded my-6">
            <p className="text-sm text-yellow-800">
              <strong>⚠️ Estimativo legal:</strong> Esta información se basa en la Ley del Seguro Social vigente (Mayo 2026).
              Valida cada caso con IMSS antes de tomar decisiones.
            </p>
          </div>

          <h2>Introducción</h2>
          <p>
            Cada caso de pensión es único. Estos tres ejemplos muestran cómo diferentes personas en diferentes situaciones
            encontraron estrategias para mejorar su pensión bajo Ley 73.
          </p>

          <h2>Caso 1: Carlos - De Empleado a Independiente con Modalidad 40</h2>

          <h3>Situación Inicial</h3>
          <ul>
            <li>Edad: 58 años</li>
            <li>Trabajó 28 años como empleado en una empresa constructora</li>
            <li>Semanas cotizadas: 480</li>
            <li>Salario promedio histórico: $12,500 mensuales</li>
            <li>Dejó de trabajar hace 3 años para independizarse en consultoría</li>
          </ul>

          <h3>El Problema</h3>
          <p>
            Carlos está a 20 semanas de los 500 requeridos. Si se jubila ahora, su pensión sería ~$5,600/mes.
            Además, sus últimos 3 años sin cotizar bajaron su promedio salarial.
          </p>

          <h3>La Estrategia</h3>
          <p>
            Opción 1: <strong>Modalidad 40 por 12 meses</strong> (una aportación anual de $22,000)
          </p>
          <ul>
            <li>Aportación declarada: $15,000 mensuales (salario actual de consultoría)</li>
            <li>Resultado: +52 semanas cotizadas, salario promedio sube a $13,200</li>
            <li>Pensión proyectada: $6,500/mes (+$900/mes)</li>
            <li>ROI: Recupera su inversión en 25 meses</li>
          </ul>

          <h3>Resultado</h3>
          <p>
            Carlos cotizó 12 meses con Modalidad 40, llegó a 532 semanas, y su pensión pasó de $5,600 a $6,500.
            <strong>Ganancia: +$10,800 anuales.</strong>
          </p>

          <hr className="my-8" />

          <h2>Caso 2: Laura - Profesional Independiente sin Registro</h2>

          <h3>Situación Inicial</h3>
          <ul>
            <li>Edad: 52 años</li>
            <li>Trabajó 20 años como contadora independiente</li>
            <li>Cotizó irregularmente (Modalidad 10): solo 350 semanas registradas</li>
            <li>No tiene documentación de muchos años de trabajo</li>
            <li>Salario promedio: $9,800 mensuales</li>
          </ul>

          <h3>El Problema</h3>
          <p>
            Laura está muy alejada de 500 semanas. Sin acreditación de períodos faltantes, tendría que cotizar
            13+ años más para jubilarse. A los 52 años, esto no es realista.
          </p>

          <h3>La Estrategia</h3>
          <p>
            Paso 1: <strong>Acreditación de períodos</strong>
          </p>
          <ul>
            <li>Recolectó recibos, facturas y cartas de clientes que comprobaban su actividad</li>
            <li>El IMSS acreditó 100 semanas adicionales de años previos</li>
            <li>Nuevo saldo: 450 semanas</li>
          </ul>
          <p>
            Paso 2: <strong>Modalidad 40 por 6 meses</strong>
          </p>
          <ul>
            <li>Aportación: $12,000 mensuales</li>
            <li>Costo total: $72,000</li>
            <li>Resultado: +26 semanas, total 476 semanas</li>
          </ul>
          <p>
            Paso 3: <strong>Trabajar 2 años más con Modalidad 10</strong>
          </p>
          <ul>
            <li>Completar las 24 semanas faltantes cotizando como independiente</li>
            <li>Edad de jubilación: 54 años</li>
          </ul>

          <h3>Resultado</h3>
          <p>
            Laura combinó acreditación, Modalidad 40 y cotización sostenida. Ahora puede jubilarse a los 54 años
            con pensión de ~$4,800/mes, en lugar de trabajar hasta los 65+.
            <strong>Ganancia: 11 años de retiro anticipado.</strong>
          </p>

          <hr className="my-8" />

          <h2>Caso 3: Javier - Agricultor Mixto (Modalidad 13)</h2>

          <h3>Situación Inicial</h3>
          <ul>
            <li>Edad: 60 años</li>
            <li>Trabajó 25 años como agricultor (ganadería + cultivos)</li>
            <li>Cotizó erraticamente en Modalidad 13: 600 semanas (pero hubo brechas)</li>
            <li>Salario promedio: $8,200 mensuales</li>
            <li>Algunos años sin cotización por sequía, mercado bajo</li>
          </ul>

          <h3>El Problema</h3>
          <p>
            Modalidad 13 requiere 750 semanas (no 500). Javier tiene 600 y necesita 150 más (~3 años adicionales).
            A los 60 años, seguir cotizando es difícil por volatilidad de ingresos agrícolas.
          </p>

          <h3>La Estrategia</h3>
          <p>
            Opción: <strong>Cambiar a Modalidad 40</strong> (urbana, más flexible)
          </p>
          <ul>
            <li>Las 600 semanas de Modalidad 13 son reconocidas en Modalidad 40</li>
            <li>Solo necesita 500 semanas para jubilarse en Modalidad 40</li>
            <li>Falta: 0 semanas (ya cumple requisito)</li>
          </ul>

          <h3>Resultado</h3>
          <p>
            Javier <strong>cambió de modalidad</strong> y pudo jubilarse inmediatamente a los 60 años.
            Su pensión en Modalidad 40: ~$4,100/mes.
            <strong>Ganancia: Jubilación inmediata sin esperar 3 años más.</strong>
          </p>

          <hr className="my-8" />

          <h2>Lecciones Generales</h2>

          <h3>1. Acreditación de Períodos</h3>
          <p>
            Si tienes años de trabajo sin registro claro, no desistas. La acreditación es posible con documentación.
            Puede recuperarte cientos de semanas.
          </p>

          <h3>2. Modalidad 40 es Flexible</h3>
          <p>
            No necesitas cotizar años completos. Cotizar 6-12 meses puede significar la diferencia entre esperar 5 años
            o jubilarse hoy.
          </p>

          <h3>3. Cada Caso es Único</h3>
          <p>
            No hay solución "de catálogo". Tu edad, semanas, salario y capacidad financiera definen tu estrategia óptima.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded my-6 text-center">
            <p className="text-gray-700 mb-4">¿Tu caso se parece al de Carlos, Laura o Javier?</p>
            <a
              href="https://wa.me/529992005550"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Contactar por WhatsApp para Análisis
            </a>
          </div>
        </article>
      </main>
    </div>
  );
}
