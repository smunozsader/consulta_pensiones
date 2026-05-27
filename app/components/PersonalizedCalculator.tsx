'use client';

import { useState, useEffect, useCallback } from 'react';
import { CalculadoraModalidad40 } from '@/lib/calculadora';
import { saveCalculation, updateCalculation } from '@/lib/firebase-service';
import { generateCalculationPDF } from '@/lib/pdf-service';
import EmailGateModal from './EmailGateModal';

interface CalculationResults {
  cuantiaBasica: number;
  incrementoExtra: number;
  pensionA60: number;
  pensionA65: number;
  gafes: number;
  pensionBase: number;
  edadActual: number;
  salarioDiario: number;
  semanasCotizadas: number;
  ley: string;
  annoInicio: number;
  tieneEsposa: boolean;
  numHijos: number;
  padresDependientes: boolean;
}

export default function PersonalizedCalculator() {
  // Form inputs
  const [edadActual, setEdadActual] = useState<number>(62);
  const [salarioDiario, setSalarioDiario] = useState<number>(500);
  const [semanasCotizadas, setSemanasCotizadas] = useState<number>(550);
  const [ley, setLey] = useState<string>('Modalidad 40');
  const [annoInicio, setAnnoInicio] = useState<number>(1998);
  const [tieneEsposa, setTieneEsposa] = useState<boolean>(false);
  const [numHijos, setNumHijos] = useState<number>(0);
  const [padresDependientes, setPadresDependientes] = useState<boolean>(false);

  // Results
  const [results, setResults] = useState<CalculationResults | null>(null);
  const [loading, setLoading] = useState(false);
  const [emailGateOpen, setEmailGateOpen] = useState(false);

  // Calculate pension with debounce
  const calculatePension = useCallback(() => {
    setLoading(true);

    setTimeout(() => {
      try {
        const calc = new CalculadoraModalidad40();

        // Calculate for Modalidad 40
        if (ley === 'Modalidad 40') {
          const resultado60 = calc.calcularPensionLey73(
            salarioDiario,
            semanasCotizadas,
            60,
            tieneEsposa,
            numHijos,
            padresDependientes
          );

          const resultado65 = calc.calcularPensionLey73(
            salarioDiario,
            semanasCotizadas,
            65,
            tieneEsposa,
            numHijos,
            padresDependientes
          );

          setResults({
            cuantiaBasica: resultado60.cuantia_basica_pct * 100,
            incrementoExtra: resultado60.incremento_anual_pct * 100,
            pensionA60: resultado60.pension_mensual,
            pensionA65: resultado65.pension_mensual,
            gafes: resultado60.gafes_total,
            pensionBase: resultado60.pension_mensual - resultado60.gafes_total,
            edadActual,
            salarioDiario,
            semanasCotizadas,
            ley,
            annoInicio,
            tieneEsposa,
            numHijos,
            padresDependientes,
          });
        }
      } catch (error) {
        console.error('Error calculating pension:', error);
      } finally {
        setLoading(false);
      }
    }, 300); // Debounce 300ms
  }, [edadActual, salarioDiario, semanasCotizadas, ley, annoInicio, tieneEsposa, numHijos, padresDependientes]);

  // Recalculate when inputs change
  useEffect(() => {
    calculatePension();
  }, [edadActual, salarioDiario, semanasCotizadas, ley, annoInicio, tieneEsposa, numHijos, padresDependientes]);

  const handleDownloadClick = () => {
    setEmailGateOpen(true);
  };

  const handleEmailGateSuccess = async (formData: any) => {
    if (!results) return;

    try {
      // 1. Save calculation to Firebase
      const calculationData = {
        nombre: formData.nombre,
        email: formData.email,
        telefono: formData.telefono || '',
        edadActual: results.edadActual,
        salarioDiario: results.salarioDiario,
        semanasCotizadas: results.semanasCotizadas,
        ley: results.ley,
        annoInicio: results.annoInicio,
        tieneEsposa: results.tieneEsposa,
        numHijos: results.numHijos,
        padresDependientes: results.padresDependientes,
        cuantiaBasica: results.cuantiaBasica,
        incrementoExtra: results.incrementoExtra,
        pensionA60: results.pensionA60,
        pensionA65: results.pensionA65,
        gafes: results.gafes,
        pdfGenerated: false,
        status: 'completed' as const,
      };

      const saveResult = await saveCalculation(calculationData);

      if (!saveResult.success) {
        throw new Error('Error saving calculation to database');
      }

      // 2. Generate PDF
      const pdfBlob = generateCalculationPDF(results, formData.nombre);

      // 3. Trigger download
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `calculo-pension-${formData.nombre.replace(/\s+/g, '-')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      // 4. Mark as downloaded in Firebase
      await updateCalculation(saveResult.calculationId, {
        downloadedAt: new Date().toISOString(),
        pdfGenerated: true,
      });

      // Close modal after brief delay
      setTimeout(() => {
        setEmailGateOpen(false);
      }, 1000);
    } catch (error) {
      console.error('Error during PDF download:', error);
      alert('Error al descargar el PDF. Por favor intenta nuevamente.');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Form Section */}
      <div className="bg-blue-50 rounded-lg p-8 mb-8 border border-blue-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Ingresa tus Datos</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Edad Actual */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Edad Actual
            </label>
            <input
              type="number"
              min="60"
              max="75"
              value={edadActual}
              onChange={(e) => setEdadActual(parseInt(e.target.value) || 60)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Salario Diario */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Salario Diario Promedio (MXN)
            </label>
            <input
              type="number"
              min="0"
              step="10"
              value={salarioDiario}
              onChange={(e) => setSalarioDiario(parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Semanas Cotizadas */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Semanas Cotizadas
            </label>
            <input
              type="number"
              min="0"
              max="3000"
              value={semanasCotizadas}
              onChange={(e) => setSemanasCotizadas(parseInt(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Ley/Modalidad */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Ley / Modalidad
            </label>
            <select
              value={ley}
              onChange={(e) => setLey(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Ley 73">Ley 73</option>
              <option value="Ley 97">Ley 97</option>
              <option value="Modalidad 40">Modalidad 40</option>
            </select>
          </div>

          {/* Año Inicio */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Año Inicio de Cotización
            </label>
            <input
              type="number"
              min="1980"
              max="2025"
              value={annoInicio}
              onChange={(e) => setAnnoInicio(parseInt(e.target.value) || 1995)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Hijos */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Número de Hijos Dependientes
            </label>
            <input
              type="number"
              min="0"
              max="10"
              value={numHijos}
              onChange={(e) => setNumHijos(parseInt(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Checkboxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={tieneEsposa}
              onChange={(e) => setTieneEsposa(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="ml-3 text-gray-700">¿Tiene esposa/pareja?</span>
          </label>

          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={padresDependientes}
              onChange={(e) => setPadresDependientes(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="ml-3 text-gray-700">Padres dependientes</span>
          </label>
        </div>
      </div>

      {/* Results Section */}
      {loading ? (
        <div className="bg-green-50 rounded-lg p-8 border border-green-200 text-center">
          <p className="text-gray-600">Calculando...</p>
        </div>
      ) : results ? (
        <div className="space-y-6">
          {/* Calculation Details */}
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Detalles del Cálculo</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">Cuantía Básica</p>
                <p className="text-xl font-bold text-blue-600">{results.cuantiaBasica.toFixed(2)}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Incremento Extra</p>
                <p className="text-xl font-bold text-blue-600">{results.incrementoExtra.toFixed(2)}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">GAFES</p>
                <p className="text-xl font-bold text-green-600">
                  ${results.gafes.toLocaleString('es-MX', { maximumFractionDigits: 0 })}
                </p>
              </div>
            </div>
          </div>

          {/* Main Results - Comparativo */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* A los 60 */}
            <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
              <p className="text-sm font-semibold text-gray-600 mb-2">Si solicitas a los 60 años</p>
              <div className="text-4xl font-bold text-yellow-600 mb-2">
                ${results.pensionA60.toLocaleString('es-MX', { maximumFractionDigits: 0 })}
              </div>
              <p className="text-sm text-gray-600">Pensión mensual (75% del cálculo)</p>
            </div>

            {/* A los 65 */}
            <div className="bg-green-50 rounded-lg p-6 border border-green-200">
              <p className="text-sm font-semibold text-gray-600 mb-2">Si esperas a los 65 años</p>
              <div className="text-4xl font-bold text-green-600 mb-2">
                ${results.pensionA65.toLocaleString('es-MX', { maximumFractionDigits: 0 })}
              </div>
              <p className="text-sm text-gray-600">Pensión mensual (100% del cálculo)</p>
            </div>
          </div>

          {/* Diferencia */}
          <div className="bg-purple-50 rounded-lg p-6 border border-purple-200 text-center">
            <p className="text-sm font-semibold text-gray-600 mb-2">Diferencia por esperar 5 años</p>
            <p className="text-3xl font-bold text-purple-600">
              ${(results.pensionA65 - results.pensionA60).toLocaleString('es-MX', { maximumFractionDigits: 0 })} MXN/mes
            </p>
            <p className="text-sm text-gray-600 mt-2">
              ≈ ${((results.pensionA65 - results.pensionA60) * 12).toLocaleString('es-MX', { maximumFractionDigits: 0 })} MXN/año
            </p>
          </div>

          {/* Download Button */}
          <div className="text-center">
            <button
              onClick={handleDownloadClick}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold transition"
            >
              📥 Descargar PDF con mis Resultados
            </button>
          </div>

          {/* Disclaimer */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-700">
              <strong>⚠️ Importante:</strong> Estos son cálculos estimativos basados en normativa vigente.
              Valida siempre con IMSS antes de solicitar tu pensión.
            </p>
          </div>
        </div>
      ) : null}

      {/* Email Gate Modal */}
      <EmailGateModal
        isOpen={emailGateOpen}
        onClose={() => setEmailGateOpen(false)}
        onSuccess={handleEmailGateSuccess}
        title="Descargar tu Cálculo Personalizado"
        description="Registra tus datos para recibir tu PDF personalizado. Los usaremos solo para contactarte con tus resultados."
        telefono={true}
        calculationData={results}
      />
    </div>
  );
}
