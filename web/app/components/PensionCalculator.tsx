'use client';

import { useState } from 'react';

interface PensionResult {
  age: number;
  weeks: number;
  sdp: number;
  ageFactor: number;
  baseAmount: number;
  pension60: number;
  pension65: number;
  pensionAtAge: number;
  minGuaranteed: number;
  finalPension: number;
}

export default function PensionCalculator() {
  const [age, setAge] = useState(62);
  const [weeks, setWeeks] = useState(600);
  const [sdp, setSdp] = useState(400); // Salario Diario Promedio
  const [result, setResult] = useState<PensionResult | null>(null);

  // Tabla de Cuantía Básica (CB) según SDP - simplificada
  const getCuantiaBasica = (salarioDiario: number): number => {
    // Basado en tabla IMSS 2026
    if (salarioDiario <= 100) return 0.8; // 80%
    if (salarioDiario <= 200) return 0.75;
    if (salarioDiario <= 300) return 0.65;
    if (salarioDiario <= 400) return 0.60;
    if (salarioDiario <= 500) return 0.55;
    if (salarioDiario <= 600) return 0.50;
    if (salarioDiario <= 750) return 0.45;
    if (salarioDiario <= 1000) return 0.42;
    return 0.40; // Mínimo
  };

  // Factor de Edad: 75% a 60, 80% a 61, ... 100% a 65
  const getAgeFactor = (currentAge: number): number => {
    if (currentAge < 60) return 0;
    if (currentAge === 60) return 0.75;
    if (currentAge === 61) return 0.8;
    if (currentAge === 62) return 0.85;
    if (currentAge === 63) return 0.9;
    if (currentAge === 64) return 0.95;
    return 1.0; // 65+
  };

  // Incremento Anual por semanas adicionales (sobre 500)
  const getIncrementoAnual = (weeksTotal: number, sdp: number): number => {
    if (weeksTotal < 500) return 0;
    const weeksAbove500 = Math.floor((weeksTotal - 500) / 52); // Cada 52 semanas
    if (weeksAbove500 === 0) return 0;

    // Tabla simplificada: incremento varía según SDP
    if (sdp <= 200) return weeksAbove500 * 0.028; // 2.8% por año
    if (sdp <= 400) return weeksAbove500 * 0.024; // 2.4% por año
    if (sdp <= 600) return weeksAbove500 * 0.020; // 2.0% por año
    return weeksAbove500 * 0.016; // 1.6% por año
  };

  const calculatePension = () => {
    if (weeks < 500) {
      alert('Necesitas al menos 500 semanas cotizadas para acceder a pensión');
      return;
    }

    const cb = getCuantiaBasica(sdp);
    const ageFactor = getAgeFactor(age);
    const increment = getIncrementoAnual(weeks, sdp);
    const foxFactor = 1.11; // Factor Fox - permanente desde 2001

    // Fórmula: (SDP × 365 × CB × (1 + incremento) × FA × Fox) ÷ 12
    const baseAmount = (sdp * 365 * cb * (1 + increment) * foxFactor) / 12;

    // Pensión proyectada a edad actual
    const pensionAtAge = Math.round(baseAmount * ageFactor);

    // Proyecciones: qué pasaría si espera
    const pension60 = Math.round(baseAmount * 0.75);
    const pension65 = Math.round(baseAmount * 1.0);

    // Pensión mínima garantizada (IMSS 2026)
    const minGuaranteed = 10636;

    // Final: tomar máximo entre calculada y mínima
    const finalPension = Math.max(pensionAtAge, minGuaranteed);

    setResult({
      age,
      weeks,
      sdp,
      ageFactor,
      baseAmount,
      pension60,
      pension65,
      pensionAtAge,
      minGuaranteed,
      finalPension,
    });
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    calculatePension();
  };

  return (
    <div className="py-12">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Left: Input Form */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Tus Datos</h3>
          <form onSubmit={handleCalculate} className="space-y-6">
            {/* Edad */}
            <div>
              <label className="block text-gray-900 font-semibold mb-2">Edad Actual</label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="60"
                  max="75"
                  value={age}
                  onChange={(e) => setAge(parseInt(e.target.value))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Math.max(60, Math.min(75, parseInt(e.target.value) || 60)))}
                  className="w-16 px-3 py-2 border border-gray-300 rounded-lg text-center"
                />
              </div>
              <p className="text-gray-500 text-xs mt-1">
                {age === 60 && 'Recibirás 75% de tu pensión'}
                {age === 65 && 'Recibirás 100% de tu pensión'}
                {age > 60 && age < 65 && `Recibirás ${Math.round((getAgeFactor(age) * 100))}% de tu pensión`}
              </p>
            </div>

            {/* Semanas Cotizadas */}
            <div>
              <label className="block text-gray-900 font-semibold mb-2">Semanas Cotizadas</label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="500"
                  max="900"
                  step="10"
                  value={weeks}
                  onChange={(e) => setWeeks(parseInt(e.target.value))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <input
                  type="number"
                  value={weeks}
                  onChange={(e) => setWeeks(Math.max(500, parseInt(e.target.value) || 500))}
                  className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center"
                />
              </div>
              <p className="text-gray-500 text-xs mt-1">
                {weeks < 500 && '❌ No cumples requisito mínimo'}
                {weeks >= 500 && weeks < 550 && '⚠️ Justo en el mínimo'}
                {weeks >= 550 && `✓ Cumples requisito + ${weeks - 500} semanas adicionales`}
              </p>
            </div>

            {/* Salario Diario Promedio */}
            <div>
              <label className="block text-gray-900 font-semibold mb-2">Salario Diario Promedio (SDP)</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-600">$</span>
                <input
                  type="number"
                  value={sdp}
                  onChange={(e) => setSdp(Math.max(0, parseFloat(e.target.value) || 0))}
                  placeholder="400.00"
                  step="10"
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <p className="text-gray-500 text-xs mt-1">
                Promedio de tus últimos años de trabajo. Revisa tu estado de cuenta IMSS.
              </p>
            </div>

            {/* Calculate Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Calcular Mi Pensión
            </button>
          </form>

          {/* Info Box */}
          <div className="mt-8 bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="text-gray-700 text-sm">
              <strong>💡 Consejo:</strong> Si no tienes estado de cuenta actualizado, podemos solicitarlo ante IMSS.
              Incluye revisar tu SDP exacto.
            </p>
          </div>
        </div>

        {/* Right: Results */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Tu Proyección</h3>

          {result ? (
            <div className="space-y-6">
              {/* Main Result */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-400 rounded-lg p-8">
                <p className="text-gray-700 text-sm mb-2">
                  Tu pensión proyectada <strong>a los {result.age} años</strong>:
                </p>
                <div className="text-5xl font-bold text-blue-600 mb-2">
                  ${result.finalPension.toLocaleString('es-MX')}
                </div>
                <p className="text-gray-600 text-sm">
                  {result.pensionAtAge === result.minGuaranteed ? (
                    <>
                      Tu cálculo resultaría en ${result.pensionAtAge.toLocaleString()}, pero IMSS garantiza mínimo
                      ${result.minGuaranteed.toLocaleString()}
                    </>
                  ) : (
                    <>Según tu SDP, semanas y edad actual</>
                  )}
                </p>
              </div>

              {/* Scenario Comparison */}
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-4">Comparar Escenarios</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-white rounded border border-gray-200">
                    <div>
                      <p className="font-semibold text-gray-900">A los 60 años</p>
                      <p className="text-xs text-gray-500">75% de pensión</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">${result.pension60.toLocaleString('es-MX')}</p>
                      {result.age < 60 && (
                        <p className="text-xs text-gray-500">
                          en {60 - result.age} año{60 - result.age !== 1 ? 's' : ''}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-white rounded border border-gray-200">
                    <div>
                      <p className="font-semibold text-gray-900">A los 65 años</p>
                      <p className="text-xs text-gray-500">100% de pensión</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">${result.pension65.toLocaleString('es-MX')}</p>
                      {result.age < 65 && (
                        <p className="text-xs text-gray-500">
                          en {65 - result.age} año{65 - result.age !== 1 ? 's' : ''}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Calculation Details */}
              <details className="bg-white border border-gray-200 rounded-lg p-4">
                <summary className="font-semibold text-gray-900 cursor-pointer">Ver detalles del cálculo</summary>
                <div className="mt-4 text-sm text-gray-600 space-y-2">
                  <p>
                    <strong>Cuantía Básica:</strong> {(getCuantiaBasica(result.sdp) * 100).toFixed(0)}% de tu SDP
                  </p>
                  <p>
                    <strong>Factor de Edad:</strong> {(result.ageFactor * 100).toFixed(0)}%
                  </p>
                  <p>
                    <strong>Factor Fox:</strong> 1.11x (multiplicador permanente)
                  </p>
                  <p>
                    <strong>Semanas adicionales:</strong> {Math.max(0, result.weeks - 500)} (incrementan cálculo)
                  </p>
                  <p className="text-xs text-gray-500 mt-4 pt-4 border-t">
                    Fórmula: (SDP × 365 × Cuantía × (1 + incremento) × Factor Edad × 1.11) ÷ 12
                  </p>
                </div>
              </details>

              {/* Next Steps CTA */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="font-semibold text-green-900 mb-3">¿Listo para solicitar tu pensión?</p>
                <p className="text-green-800 text-sm mb-4">
                  Podemos gestionar todo el proceso ante IMSS. Toma 4-8 semanas típicamente.
                </p>
                <a
                  href="/servicios"
                  className="inline-block bg-green-600 text-white px-4 py-2 rounded font-semibold hover:bg-green-700 transition text-sm"
                >
                  Ver Servicio de Gestoría
                </a>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <p className="text-gray-600 mb-4">Completa tus datos y haz click en "Calcular" para ver tu proyección.</p>
              <p className="text-gray-500 text-sm">
                Los cálculos se basan en normativa IMSS 2026 y fórmulas actualizadas.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
