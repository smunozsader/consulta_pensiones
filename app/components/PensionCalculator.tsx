'use client';

import { useState } from 'react';

interface ScenarioResult {
  yearsToWork: number;
  futureAge: number;
  totalWeeks: number;
  ages: {
    age: number;
    percentage: number;
    monthlyAmount: number;
    annualAmount: number;
  }[];
}

interface CalculatorData {
  currentAge: number;
  currentWeeks: number;
  currentSdp: number;
  yearsUntilRetirement: number;
}

const PENSION_MINIMA = 10636;
const FOX_FACTOR = 1.11;

export default function PensionCalculator() {
  const [currentAge, setCurrentAge] = useState(55);
  const [currentWeeks, setCurrentWeeks] = useState(500);
  const [currentSdp, setCurrentSdp] = useState(400);
  const [yearsUntilRetirement, setYearsUntilRetirement] = useState(5);
  const [results, setResults] = useState<ScenarioResult[] | null>(null);
  const [emailForDownload, setEmailForDownload] = useState('');
  const [showEmailGate, setShowEmailGate] = useState(false);

  const getCuantiaBasica = (sdp: number): number => {
    if (sdp <= 100) return 0.8;
    if (sdp <= 150) return 0.78;
    if (sdp <= 200) return 0.75;
    if (sdp <= 250) return 0.72;
    if (sdp <= 300) return 0.68;
    if (sdp <= 350) return 0.65;
    if (sdp <= 400) return 0.62;
    if (sdp <= 450) return 0.59;
    if (sdp <= 500) return 0.56;
    if (sdp <= 600) return 0.52;
    if (sdp <= 750) return 0.48;
    if (sdp <= 1000) return 0.44;
    if (sdp <= 1500) return 0.42;
    return 0.40;
  };

  const getAgeFactor = (age: number): number => {
    if (age < 60) return 0;
    if (age === 60) return 0.75;
    if (age === 61) return 0.8;
    if (age === 62) return 0.85;
    if (age === 63) return 0.9;
    if (age === 64) return 0.95;
    return 1.0;
  };

  const getIncrementoAnual = (weeksTotal: number, sdp: number): number => {
    if (weeksTotal < 500) return 0;
    const semanasAdicionales = Math.floor((weeksTotal - 500) / 52);
    if (semanasAdicionales === 0) return 0;

    if (sdp <= 200) return Math.min(semanasAdicionales * 0.028, 0.5);
    if (sdp <= 400) return Math.min(semanasAdicionales * 0.024, 0.45);
    if (sdp <= 600) return Math.min(semanasAdicionales * 0.020, 0.4);
    return Math.min(semanasAdicionales * 0.016, 0.35);
  };

  const calculatePensionForAge = (sdp: number, weeks: number, age: number): number => {
    const cb = getCuantiaBasica(sdp);
    const incremento = getIncrementoAnual(weeks, sdp);
    const ageFactor = getAgeFactor(age);

    const baseAmount = (sdp * 365 * cb * (1 + incremento) * FOX_FACTOR) / 12;
    const pensionAtAge = Math.round(baseAmount * ageFactor);

    return Math.max(pensionAtAge, PENSION_MINIMA);
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    if (currentAge < 45 || currentAge > 70) {
      alert('Tu edad debe estar entre 45 y 70 años');
      return;
    }

    if (currentWeeks < 250) {
      alert('Necesitas al menos 250 semanas para esta proyección');
      return;
    }

    const scenarios: ScenarioResult[] = [];

    // Generar 5 escenarios: si trabajas 0, 2, 5, 10, 15 años más
    const yearsScenarios = [0, 2, 5, 10, 15];

    yearsScenarios.forEach((years) => {
      const futureAge = currentAge + years;
      const totalWeeks = currentWeeks + years * 52; // Aproximación: 52 semanas/año

      const ages: ScenarioResult['ages'] = [];

      for (let age = 60; age <= 70; age += 2) {
        if (age >= currentAge) {
          const monthlyAmount = calculatePensionForAge(currentSdp, totalWeeks, age);
          ages.push({
            age,
            percentage: Math.round(getAgeFactor(age) * 100),
            monthlyAmount,
            annualAmount: monthlyAmount * 12,
          });
        }
      }

      scenarios.push({
        yearsToWork: years,
        futureAge,
        totalWeeks,
        ages,
      });
    });

    setResults(scenarios);
  };

  const handleDownloadClick = () => {
    if (!results) return;
    setShowEmailGate(true);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailForDownload.trim()) {
      alert('Por favor ingresa tu email');
      return;
    }
    // TODO: Save email to Firebase, generate PDF, trigger download
    alert(`Email registrado: ${emailForDownload}\n\nPróximamente: descarga de PDF con tu proyección`);
    setShowEmailGate(false);
  };

  return (
    <div className="py-12 space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left: Input Form */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Tu Situación Actual</h3>
          <form onSubmit={handleCalculate} className="space-y-6">
            {/* Edad Actual */}
            <div>
              <label className="block text-gray-900 font-semibold mb-2">¿Cuántos años tienes HOY?</label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="45"
                  max="70"
                  value={currentAge}
                  onChange={(e) => setCurrentAge(parseInt(e.target.value))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <input
                  type="number"
                  value={currentAge}
                  onChange={(e) => setCurrentAge(Math.max(45, Math.min(70, parseInt(e.target.value) || 55)))}
                  className="w-16 px-3 py-2 border border-gray-300 rounded-lg text-center font-semibold"
                />
              </div>
              <p className="text-gray-500 text-xs mt-1">Entre 45 y 70 años</p>
            </div>

            {/* Semanas Cotizadas */}
            <div>
              <label className="block text-gray-900 font-semibold mb-2">Semanas Cotizadas</label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="250"
                  max="1000"
                  step="10"
                  value={currentWeeks}
                  onChange={(e) => setCurrentWeeks(parseInt(e.target.value))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <input
                  type="number"
                  value={currentWeeks}
                  onChange={(e) => setCurrentWeeks(Math.max(250, parseInt(e.target.value) || 500))}
                  className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center font-semibold"
                />
              </div>
              <p className="text-gray-500 text-xs mt-1">
                {currentWeeks < 500 && '⚠️ Menos del mínimo (500)'} {currentWeeks >= 500 && '✓ Cumples requisito'}
              </p>
            </div>

            {/* Salario Diario Promedio */}
            <div>
              <label className="block text-gray-900 font-semibold mb-2">Salario Diario Promedio (SDP)</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-600">$</span>
                <input
                  type="number"
                  value={currentSdp}
                  onChange={(e) => setCurrentSdp(Math.max(0, parseFloat(e.target.value) || 0))}
                  placeholder="400.00"
                  step="50"
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg font-semibold"
                />
              </div>
              <p className="text-gray-500 text-xs mt-1">Revisa tu estado de cuenta IMSS para exactitud</p>
            </div>

            {/* Años hasta Retiro */}
            <div>
              <label className="block text-gray-900 font-semibold mb-2">¿Cuántos años más trabajarás?</label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="15"
                  value={yearsUntilRetirement}
                  onChange={(e) => setYearsUntilRetirement(parseInt(e.target.value))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-2xl font-bold text-blue-600 w-16 text-right">
                  {yearsUntilRetirement}
                </span>
              </div>
              <p className="text-gray-500 text-xs mt-1">
                Edad de retiro estimada: {currentAge + yearsUntilRetirement} años
              </p>
            </div>

            {/* Calculate Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition text-lg"
            >
              Ver Mi Proyección
            </button>
          </form>

          {/* Info Box */}
          <div className="mt-8 bg-blue-50 rounded-lg p-4 border border-blue-200">
            <p className="text-blue-900 text-sm font-semibold mb-2">💡 Consejo:</p>
            <p className="text-blue-800 text-sm">
              Esta calculadora te muestra escenarios si trabajas más años. Cada año adicional suma semanas y mejora tu pensión.
            </p>
          </div>
        </div>

        {/* Right: Results Summary */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Tu Proyección</h3>

          {results && results.length > 0 ? (
            <div className="space-y-6">
              {/* Key Insight Card */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-lg p-6">
                <p className="text-gray-700 text-sm mb-2">Si trabajas {yearsUntilRetirement} años más:</p>
                <p className="text-gray-600 text-xs mb-4">
                  Tendrías {currentWeeks + yearsUntilRetirement * 52} semanas totales al jubilarte
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 text-sm">A los 60:</span>
                    <span className="text-2xl font-bold text-blue-600">
                      ${results[yearsUntilRetirement === 0 ? 0 : Math.min(yearsUntilRetirement / 5, 4)]?.ages?.[0]?.monthlyAmount?.toLocaleString('es-MX') || '—'}/mes
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 text-sm">A los 65:</span>
                    <span className="text-2xl font-bold text-green-600">
                      ${results[yearsUntilRetirement === 0 ? 0 : Math.min(yearsUntilRetirement / 5, 4)]?.ages?.[2]?.monthlyAmount?.toLocaleString('es-MX') || '—'}/mes
                    </span>
                  </div>
                </div>
              </div>

              {/* Download Results Button */}
              <button
                onClick={handleDownloadClick}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2"
              >
                📥 Descargar Mis Proyecciones en PDF
              </button>

              <p className="text-center text-gray-500 text-xs">
                Incluye tabla completa de escenarios y próximos pasos
              </p>

              {/* More Info Button */}
              <button
                onClick={() => window.location.href = '/pension/analisis'}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition"
              >
                🎯 Análisis Actuarial Completo ($4,990)
              </button>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <p className="text-gray-600 mb-2">Completa tus datos al lado</p>
              <p className="text-gray-500 text-sm">
                Verás escenarios automáticamente según cuántos años más trabajes
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Full Scenario Table (if results exist) */}
      {results && results.length > 0 && (
        <div className="overflow-x-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Tabla de Escenarios</h3>
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 border-b border-gray-300">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-gray-900">Escenario</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-900">Tu Edad</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-900">Semanas</th>
                  <th colSpan={4} className="text-center px-4 py-3 font-semibold text-gray-900">
                    Pensión Mensual por Edad
                  </th>
                </tr>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th></th>
                  <th></th>
                  <th></th>
                  <th className="text-center px-2 py-2 text-xs font-semibold text-gray-600">60 años</th>
                  <th className="text-center px-2 py-2 text-xs font-semibold text-gray-600">62 años</th>
                  <th className="text-center px-2 py-2 text-xs font-semibold text-gray-600">65 años</th>
                  <th className="text-center px-2 py-2 text-xs font-semibold text-gray-600">70 años</th>
                </tr>
              </thead>
              <tbody>
                {results.map((scenario, idx) => (
                  <tr key={idx} className={`border-b border-gray-200 ${idx === yearsUntilRetirement / 5 ? 'bg-blue-50' : ''}`}>
                    <td className="px-4 py-3 font-semibold text-gray-900">
                      {scenario.yearsToWork === 0 ? 'Ahora' : `+${scenario.yearsToWork} años`}
                    </td>
                    <td className="px-4 py-3 text-gray-700">{scenario.futureAge}</td>
                    <td className="px-4 py-3 text-gray-600 text-sm">{scenario.totalWeeks}</td>
                    {scenario.ages.map((age, ageIdx) => (
                      <td key={ageIdx} className="text-center px-2 py-3 font-semibold text-gray-900">
                        ${age.monthlyAmount.toLocaleString('es-MX')}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Email Gate Modal */}
      {showEmailGate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Descargar Proyección</h3>
            <p className="text-gray-600 mb-6">
              Ingresa tu email para recibir un PDF con tus escenarios de pensión
            </p>

            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <input
                type="email"
                value={emailForDownload}
                onChange={(e) => setEmailForDownload(e.target.value)}
                placeholder="tu@email.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowEmailGate(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
                >
                  Descargar
                </button>
              </div>
            </form>

            <p className="text-gray-500 text-xs mt-4 text-center">
              🔒 Tu email está protegido bajo LFPDPPP
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
