'use client';
import Link from 'next/link';
import Footer from '@/app/components/Footer';
import GatedContent from '@/app/components/GatedContent';

export default function CasosLey97() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Consultoría de Pensiones
          </Link>
        </div>
      </header>

      <GatedContent><main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/blog" className="text-blue-600 hover:text-blue-800 mb-6 inline-block">
          ← Volver al blog
        </Link>

        <article className="prose prose-lg max-w-none" style={{color: '#1f2937'}}>
          <h1>Comparativa: Ley 73 vs Ley 97 (AFORES)</h1>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded my-6">
            <p className="text-sm text-yellow-800">
              <strong>⚠️ Estimativo legal:</strong> Esta información se basa en la Ley del Seguro Social vigente (Mayo 2026).
              Los casos mostrados son ilustrativos. Tu situación específica puede variar.
            </p>
          </div>

          <h2>Introducción: Dos Sistemas, Dos Resultados</h2>
          <p>
            México tiene dos sistemas de pensión: <strong>Ley 73 (garantizado)</strong> y <strong>Ley 97 (AFORES, por contribución)</strong>.
            Trabajadores inscritos antes de 1997 pueden elegir Ley 73. Después de 1997, es obligatorio Ley 97.
          </p>
          <p>
            Esta diferencia determina directamente el monto de tu pensión.
          </p>

          <h2>Caso 1: Diego - Empleado Joven bajo Ley 97</h2>

          <h3>Situación</h3>
          <ul>
            <li>Edad: 28 años</li>
            <li>Trabajando desde los 22 años (6 años de contribución)</li>
            <li>Salario actual: $18,000 mensuales</li>
            <li>Inscrito en Ley 97 (AFORES)</li>
            <li>Saldo en Afore: $95,000</li>
          </ul>

          <h3>Proyección a los 65 años</h3>
          <p>
            Asumiendo crecimiento anual de 5% en el saldo de Afore y contribuciones continuas:
          </p>
          <ul>
            <li>Saldo estimado a los 65: ~$650,000</li>
            <li>Pensión mensual (anualidad): ~$3,250</li>
            <li>Problema: Insuficiente para vivir dignamente a los 65+ años</li>
          </ul>

          <h3>Análisis</h3>
          <p>
            Diego tiene 37 años más de trabajo. Si el mercado crece 5% anual (optimista), y sus contribuciones se mantienen,
            podría llegar a una pensión modesta. Pero:
          </p>
          <ul>
            <li>Depende del desempeño de la Afore (puede tener comisiones altas)</li>
            <li>Mercado puede bajar, reduciendo su saldo</li>
            <li>Si hay lagunas (desempleo), el saldo crece menos</li>
            <li>Inflación puede erosionar el poder de compra de $3,250</li>
          </ul>

          <hr className="my-8" />

          <h2>Caso 2: Sofía - Profesional Independiente bajo Ley 97</h2>

          <h3>Situación</h3>
          <ul>
            <li>Edad: 32 años</li>
            <li>Profesional independiente (diseñadora gráfica)</li>
            <li>Ingresos variables: $25,000-40,000 mensuales</li>
            <li>Ahorros en Afore: Solo contribuye 15% de lo máximo (ingresos irregulares)</li>
            <li>Saldo actual: $45,000 (bajo para su edad)</li>
          </ul>

          <h3>Proyección a los 65 años</h3>
          <ul>
            <li>Si mantiene aportaciones bajas: Saldo estimado ~$280,000</li>
            <li>Pensión mensual: ~$1,400</li>
            <li><strong>Realidad:</strong> Insuficiente para una persona que ganaba $30,000+ mensuales</li>
          </ul>

          <h3>Análisis</h3>
          <p>
            Sofía enfrenta el mayor riesgo de Ley 97: <strong>depende completamente de su capacidad de ahorrar</strong>.
            Como independiente con ingresos variables, ahorrar es difícil. Resultado: pensión muy baja.
          </p>
          <p>
            <strong>Comparación con Ley 73:</strong> Bajo Ley 73, habría una pensión garantizada calculada sobre su promedio salarial.
          </p>

          <hr className="my-8" />

          <h2>Caso 3: Roberto - Obrero Salario Mínimo bajo Ley 97</h2>

          <h3>Situación</h3>
          <ul>
            <li>Edad: 55 años</li>
            <li>Obrero en maquiladora (10 años)</li>
            <li>Salario: $248/día (salario mínimo 2026)</li>
            <li>Saldo en Afore: $18,000</li>
            <li>No puede ahorrar complementariamente (gastos de subsistencia)</li>
          </ul>

          <h3>Proyección a los 65 años</h3>
          <ul>
            <li>Saldo estimado (crecimiento modesto): ~$35,000</li>
            <li>Pensión mensual por anualidad: ~$175</li>
            <li><strong>Realidad: Pensión insuficiente para vivir</strong></li>
          </ul>

          <h3>Análisis</h3>
          <p>
            <strong>Esto es la injusticia de Ley 97.</strong>
          </p>
          <p>
            Roberto trabajó, contribuyó al sistema, pero recibe una pensión de $175/mes que no alcanza ni para comida.
            El problema: Ley 97 asume que todos pueden ahorrar complementariamente. Falso.
          </p>
          <p>
            <strong>Bajo Ley 73:</strong> Roberto habría recibido ~$2,500/mes (pensión garantizada basada en años de trabajo y salario promedio).
          </p>

          <h2>Comparación Directa: Ley 73 vs Ley 97</h2>

          <table className="w-full border border-gray-300 my-6">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-3 text-left">Aspecto</th>
                <th className="border border-gray-300 p-3 text-left">Ley 73 (Garantizado)</th>
                <th className="border border-gray-300 p-3 text-left">Ley 97 (AFORES)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-3"><strong>Pensión</strong></td>
                <td className="border border-gray-300 p-3">Garantizada por IMSS</td>
                <td className="border border-gray-300 p-3">Depende del saldo acumulado</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3"><strong>Cálculo</strong></td>
                <td className="border border-gray-300 p-3">Semanas × Salario Promedio</td>
                <td className="border border-gray-300 p-3">Saldo ÷ Expectativa de vida</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3"><strong>Riesgo de Mercado</strong></td>
                <td className="border border-gray-300 p-3">Cero (Estado garantiza)</td>
                <td className="border border-gray-300 p-3">Alto (depende de inversiones)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3"><strong>Mejor para</strong></td>
                <td className="border border-gray-300 p-3">Salarios bajos, empleados fijos</td>
                <td className="border border-gray-300 p-3">Profesionales con altos ingresos</td>
              </tr>
            </tbody>
          </table>

          <h2>Conclusión</h2>
          <p>
            Ley 73 fue un sistema más justo para salarios bajos. Ley 97 favorece a quienes pueden ahorrar mucho.
            Para trabajadores como Roberto, es injusto.
          </p>
          <p>
            <strong>Si eres menor a 55 años y estás en Ley 97:</strong> Comienza a ahorrar complementariamente ahora.
            No esperes a los 65 con un saldo insuficiente.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded my-6 text-center">
            <p className="text-gray-700 mb-4">¿Quieres proyectar tu pensión específica?</p>
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
      </main></GatedContent>

      <Footer />
    </div>
  );
}
