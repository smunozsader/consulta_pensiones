'use client';

import { ActuarialAnalysis } from '@/lib/actuarial-service';

interface ActuarialAnalysisDisplayProps {
  analysis: ActuarialAnalysis;
  onDownloadPDF: () => void;
  onRequestGestoria: () => void;
}

export default function ActuarialAnalysisDisplay({
  analysis,
  onDownloadPDF,
  onRequestGestoria,
}: ActuarialAnalysisDisplayProps) {
  const formattedDate = new Date(analysis.generatedAt).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const pensionA60 = analysis.proyecciones.find((p) => p.edad === 60);
  const pensionA65 = analysis.proyecciones.find((p) => p.edad === 65);

  return (
    <div className="py-12 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">Tu Análisis Actuarial Completo</h2>
        <p className="text-blue-100">Generado para: {analysis.clientName}</p>
        <p className="text-blue-100 text-sm mt-2">{formattedDate}</p>
      </div>

      {/* Situación Actual */}
      <div className="bg-white border border-gray-200 rounded-lg p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Tu Situación Actual</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-600 text-sm mb-1">Semanas Cotizadas</p>
            <p className="text-3xl font-bold text-gray-900">{analysis.situacionActual.semanasActuales}</p>
            <p className="text-gray-500 text-xs mt-1">
              {analysis.situacionActual.semanasActuales - 500} semanas sobre el mínimo (500)
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-600 text-sm mb-1">Salario Diario Promedio (SDP)</p>
            <p className="text-3xl font-bold text-gray-900">
              ${analysis.situacionActual.salarioDiarioPromedio.toLocaleString('es-MX')}
            </p>
            <p className="text-gray-500 text-xs mt-1">Promedio de últimos años de trabajo</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-600 text-sm mb-1">Documentación</p>
            <p className={`text-lg font-bold ${
              analysis.situacionActual.documentacionCompleta ? 'text-green-600' : 'text-amber-600'
            }`}>
              {analysis.situacionActual.documentacionCompleta ? '✓ Completa' : '⚠️ Incompleta'}
            </p>
            <p className="text-gray-500 text-xs mt-1">
              {analysis.situacionActual.documentacionCompleta
                ? 'Lista para solicitar'
                : 'Necesita documentos adicionales'}
            </p>
          </div>

          {analysis.situacionActual.observaciones && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-gray-600 text-sm mb-1">Notas Adicionales</p>
              <p className="text-gray-900 text-sm">{analysis.situacionActual.observaciones}</p>
            </div>
          )}
        </div>
      </div>

      {/* Cálculos Actuariales */}
      <div className="bg-white border border-gray-200 rounded-lg p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Cálculos Actuariales</h3>
        <details className="bg-gray-50 rounded-lg p-4">
          <summary className="cursor-pointer font-semibold text-gray-900">
            Ver detalles técnicos de cálculos
          </summary>
          <div className="mt-4 space-y-3 text-sm text-gray-600">
            <p>
              <strong>Cuantía Básica (CB):</strong> {(analysis.calculos.cuantiaBasica * 100).toFixed(0)}% de tu SDP
            </p>
            <p>
              <strong>Incremento Anual:</strong> +{(analysis.calculos.incrementoAnual * 100).toFixed(1)}% por semanas
              adicionales
            </p>
            <p>
              <strong>Factor Fox:</strong> 1.11x (multiplicador permanente desde 2001)
            </p>
            <p className="text-xs text-gray-500 mt-4 pt-4 border-t">
              Fórmula: (SDP × 365 × CB × (1 + incremento) × 1.11) ÷ 12
            </p>
          </div>
        </details>
      </div>

      {/* Proyecciones */}
      <div className="bg-white border border-gray-200 rounded-lg p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Proyecciones de Pensión</h3>
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {/* A los 60 */}
          {pensionA60 && (
            <div className="bg-amber-50 border-2 border-amber-300 rounded-lg p-6">
              <p className="text-gray-600 text-sm mb-1">A los 60 años</p>
              <p className="text-3xl font-bold text-amber-600">${pensionA60.montoMensual.toLocaleString('es-MX')}</p>
              <p className="text-gray-600 text-xs mt-2">Mensual ({pensionA60.porcentajePension}% de pensión)</p>
              <p className="text-gray-500 text-xs mt-2">
                Anual: ${pensionA60.montoAnual.toLocaleString('es-MX')}
              </p>
            </div>
          )}

          {/* A los 65 */}
          {pensionA65 && (
            <div className="bg-green-50 border-2 border-green-300 rounded-lg p-6">
              <p className="text-gray-600 text-sm mb-1">A los 65 años</p>
              <p className="text-3xl font-bold text-green-600">${pensionA65.montoMensual.toLocaleString('es-MX')}</p>
              <p className="text-gray-600 text-xs mt-2">Mensual ({pensionA65.porcentajePension}% de pensión)</p>
              <p className="text-gray-500 text-xs mt-2">
                Anual: ${pensionA65.montoAnual.toLocaleString('es-MX')}
              </p>
            </div>
          )}

          {/* Punto de Equilibrio */}
          <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-6">
            <p className="text-gray-600 text-sm mb-1">Punto de Equilibrio Financiero</p>
            <p className="text-3xl font-bold text-blue-600">${analysis.puntoEquilibrio.montoMensual.toLocaleString('es-MX')}</p>
            <p className="text-gray-600 text-xs mt-2">A los {analysis.puntoEquilibrio.edadOptima} años</p>
            <p className="text-gray-500 text-xs mt-2">(Máximo valor esperado de vida)</p>
          </div>
        </div>

        {/* Tabla de proyecciones */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-300">
                <th className="text-left px-4 py-3 font-semibold text-gray-900">Edad</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-900">% Pensión</th>
                <th className="text-right px-4 py-3 font-semibold text-gray-900">Mensual</th>
                <th className="text-right px-4 py-3 font-semibold text-gray-900">Anual</th>
              </tr>
            </thead>
            <tbody>
              {analysis.proyecciones.map((proj, idx) => (
                <tr
                  key={idx}
                  className={`border-b border-gray-200 ${
                    proj.edad === analysis.puntoEquilibrio.edadOptima ? 'bg-blue-50' : ''
                  } hover:bg-gray-50`}
                >
                  <td className="px-4 py-3 text-gray-900 font-semibold">{proj.edad} años</td>
                  <td className="px-4 py-3 text-gray-600">{proj.porcentajePension}%</td>
                  <td className="px-4 py-3 text-right text-gray-900 font-semibold">
                    ${proj.montoMensual.toLocaleString('es-MX')}
                  </td>
                  <td className="px-4 py-3 text-right text-gray-600">
                    ${proj.montoAnual.toLocaleString('es-MX')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Estrategias Recomendadas */}
      <div className="bg-white border border-gray-200 rounded-lg p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Estrategias Recomendadas</h3>
        <div className="space-y-4">
          {analysis.estrategiasRecomendadas.map((estrategia, idx) => (
            <div key={idx} className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
              <p className="text-gray-900 text-sm leading-relaxed">{estrategia}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recomendación Final */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-lg p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Nuestra Recomendación</h3>
        <p className="text-gray-700 text-lg leading-relaxed mb-6">{analysis.recomendacionFinal}</p>

        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h4 className="font-bold text-gray-900 mb-3">Próximos Pasos:</h4>
          <ol className="space-y-2">
            {analysis.proximoPasos.map((paso, idx) => (
              <li key={idx} className="text-gray-700 text-sm flex items-start">
                <span className="text-blue-600 font-bold mr-3">{paso.split('.')[0]}.</span>
                <span>{paso.substring(paso.indexOf('.') + 2)}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* CTAs */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Download PDF */}
        <button
          onClick={onDownloadPDF}
          className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-700 transition text-center"
        >
          📥 Descargar Análisis en PDF
        </button>

        {/* Request Gestoria */}
        <button
          onClick={onRequestGestoria}
          className="bg-green-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-green-700 transition text-center"
        >
          ✓ Solicitar Gestoría de Pensión ($1,490)
        </button>
      </div>

      {/* Info Box */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h4 className="font-bold text-gray-900 mb-3">¿Qué es este análisis?</h4>
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          Este análisis actuarial profesional está basado en las fórmulas de pensión del IMSS 2026.
          Incluye cálculos detallados, proyecciones, estrategias personalizadas y recomendación
          final sobre cuándo solicitar tu pensión para maximizar tu beneficio.
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          <strong>Próximo paso recomendado:</strong> Si deseas que nos encarguemos de los trámites ante IMSS
          (presentación de solicitud, seguimiento, coordinación), solicita el servicio de Gestoría.
          Incluye todo lo necesario para que recibas tu primera pensión en 4-8 semanas.
        </p>
      </div>
    </div>
  );
}
