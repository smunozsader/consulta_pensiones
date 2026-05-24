'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { CalculadoraModalidad40 } from '@/lib/calculadora';
import LegalDisclaimer from '../components/LegalDisclaimer';
import Footer from '@/app/components/Footer';

interface CasoPractico {
  nombre: string;
  edad: number;
  semanas: number;
  sdp_diario: number;
  modalidad_anterior: string;
}

const casospracticos: Record<string, CasoPractico> = {
  carlos: {
    nombre: 'Carlos - Empleado a Independiente',
    edad: 60,
    semanas: 480,
    sdp_diario: 450,
    modalidad_anterior: 'Empleado formal 35 años'
  },
  laura: {
    nombre: 'Laura - Profesional Independiente',
    edad: 58,
    semanas: 550,
    sdp_diario: 520,
    modalidad_anterior: 'Independiente sin registro (acreditado)'
  },
  javier: {
    nombre: 'Javier - Agricultor Mixto',
    edad: 62,
    semanas: 510,
    sdp_diario: 380,
    modalidad_anterior: 'Modalidad 13 + empleos formales'
  }
};

export default function CalculadoraPage() {
  const [semanas, setSemanas] = useState(500);
  const [sdp, setSdp] = useState(400);
  const [edad, setEdad] = useState(65);
  const [tiene_esposa, setTieneEsposa] = useState(false);
  const [num_hijos, setNumHijos] = useState(0);
  const [caso_seleccionado, setCasoSeleccionado] = useState<string | null>(null);

  const calculadora = useMemo(() => new CalculadoraModalidad40(), []);

  const resultado = useMemo(() => {
    if (semanas < 500) return null;
    return calculadora.calcularPensionLey73(
      semanas,
      sdp,
      edad,
      tiene_esposa,
      num_hijos,
      false
    );
  }, [semanas, sdp, edad, tiene_esposa, num_hijos, calculadora]);

  const inversion = useMemo(() => {
    return calculadora.calcularInversionTotal(sdp);
  }, [sdp, calculadora]);

  const validacion = useMemo(() => {
    // Validar según tipo (asumimos Ley 73 por defecto en la calculadora)
    return calculadora.validarRequisitos(semanas, 'ley73');
  }, [semanas, calculadora]);

  const cargarCaso = (caso_id: string) => {
    const caso = casospracticos[caso_id];
    if (caso) {
      setSemanas(caso.semanas);
      setSdp(caso.sdp_diario);
      setEdad(caso.edad);
      setCasoSeleccionado(caso_id);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Consultoría de Pensiones
          </Link>
          <a
            href="https://wa.me/529992005550"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            Contactar
          </a>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Calculadora Modalidad 40 - Ley 73
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          Estima tu pensión bajo Ley 73 IMSS. Carga un caso práctico o ingresa tus datos.
        </p>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Input */}
          <div className="lg:col-span-2 space-y-8">
            {/* Casos Prácticos */}
            <div className="bg-blue-50 p-8 rounded-lg border-2 border-blue-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Casos Prácticos</h2>
              <p className="text-gray-600 mb-6">Carga un caso real para ver los números:</p>
              <div className="grid grid-cols-1 gap-3">
                {Object.entries(casospracticos).map(([id, caso]) => (
                  <button
                    key={id}
                    onClick={() => cargarCaso(id)}
                    className={`p-4 text-left rounded-lg border-2 transition font-semibold ${
                      caso_seleccionado === id
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-900 border-gray-200 hover:border-blue-400'
                    }`}
                  >
                    <div className="font-bold">{caso.nombre}</div>
                    <div className="text-sm opacity-75 mt-1">
                      {caso.semanas} semanas • ${caso.sdp_diario.toFixed(0)}/día
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Legal Disclaimer */}
            <div>
              <LegalDisclaimer variant="calculator" />
            </div>

            {/* Form */}
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Tus Datos</h2>

              <div className="space-y-6">
                {/* Semanas Cotizadas */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Semanas Cotizadas: {semanas}
                  </label>
                  <input
                    type="range"
                    min="500"
                    max="1000"
                    value={semanas}
                    onChange={(e) => setSemanas(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    {semanas < 500 && '❌ Mínimo 500 semanas'}
                    {semanas >= 500 && '✓ Elegible para pensión'}
                  </p>
                </div>

                {/* SDP Diario */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Salario Diario Promedio: ${sdp.toFixed(2)}
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="2000"
                    step="10"
                    value={sdp}
                    onChange={(e) => setSdp(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg"
                  />
                </div>

                {/* Edad */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Edad a Jubilarse: {edad}
                  </label>
                  <input
                    type="range"
                    min="60"
                    max="75"
                    value={edad}
                    onChange={(e) => setEdad(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg"
                  />
                </div>

                {/* Beneficiarios */}
                <div className="pt-4 border-t border-gray-200">
                  <label className="flex items-center gap-2 mb-3">
                    <input
                      type="checkbox"
                      checked={tiene_esposa}
                      onChange={(e) => setTieneEsposa(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <span className="font-medium text-gray-900">Tiene esposa</span>
                  </label>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Hijos dependientes: {num_hijos}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="5"
                      value={num_hijos}
                      onChange={(e) => setNumHijos(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">
            {resultado && (
              <>
                {/* Main Result */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-lg border-2 border-green-400">
                  <h3 className="text-sm font-semibold text-green-900 mb-2">PENSIÓN MENSUAL</h3>
                  <div className="text-4xl font-bold text-green-700 mb-2">
                    ${resultado.pension_con_gafes.toFixed(2)}
                  </div>
                  <p className="text-sm text-green-700 mb-4">
                    Incluye GAFES (asignaciones familiares)
                  </p>

                  <div className="bg-white p-4 rounded mt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pensión base:</span>
                      <span className="font-semibold">${resultado.pension_mensual.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">+ GAFES:</span>
                      <span className="font-semibold">${resultado.gafes_total.toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-2 mt-2 flex justify-between">
                      <span className="font-semibold">Anual:</span>
                      <span className="font-bold text-green-700">
                        ${(resultado.pension_con_gafes * 12).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Analysis */}
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <h4 className="font-bold text-gray-900 mb-3">Análisis</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <p className="text-gray-600">Porcentaje cuantía básica</p>
                      <p className="font-semibold text-gray-900">
                        {(resultado.cuantia_basica_pct * 100).toFixed(2)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Incremento por semanas extras</p>
                      <p className="font-semibold text-gray-900">
                        {(resultado.incremento_anual_pct * 100).toFixed(2)}% anual
                      </p>
                    </div>
                  </div>
                </div>

                {/* Inversion */}
                <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                  <h4 className="font-bold text-gray-900 mb-3">Inversión Modalidad 40</h4>
                  <div className="text-sm space-y-1">
                    <div>
                      <p className="text-gray-600">Costo mensual promedio</p>
                      <p className="font-bold text-lg">
                        ${inversion.promedio_mensual.toFixed(2)}
                      </p>
                    </div>
                    <div className="pt-2 mt-2 border-t">
                      <p className="text-gray-600">Total 5 años</p>
                      <p className="font-semibold">
                        ${inversion.total_5_años.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Validación Legal */}
                <div className={`p-6 rounded-lg border-2 ${
                  validacion.es_valido
                    ? 'bg-green-50 border-green-300'
                    : 'bg-red-50 border-red-300'
                }`}>
                  <h4 className={`font-bold mb-3 ${
                    validacion.es_valido ? 'text-green-900' : 'text-red-900'
                  }`}>
                    Validación Legal
                  </h4>
                  <div className="space-y-3 text-sm">
                    {validacion.advertencias.map((adv, idx) => (
                      <p key={idx} className={validacion.es_valido ? 'text-green-800' : 'text-red-800'}>
                        {adv}
                      </p>
                    ))}
                    {validacion.recomendaciones.length > 0 && (
                      <>
                        <div className="border-t pt-2 mt-2">
                          <p className="font-semibold text-gray-900 mb-2">💡 Recomendaciones:</p>
                          <ul className="space-y-1">
                            {validacion.recomendaciones.map((rec, idx) => (
                              <li key={idx} className="text-gray-700">
                                • {rec}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    )}
                    {validacion.requiere_validacion_imss && (
                      <p className="bg-yellow-100 text-yellow-900 p-2 rounded mt-2 font-semibold">
                        ⚠️ Requiere validación IMSS antes de actuar
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}

            {semanas < 500 && (
              <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                <h4 className="font-bold text-red-900 mb-2">No Elegible</h4>
                <p className="text-sm text-red-700">
                  Necesitas mínimo 500 semanas cotizadas para Ley 73.
                </p>
                <p className="text-sm text-red-700 mt-2">
                  Te faltan: <span className="font-bold">{500 - semanas} semanas</span>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Export Results */}
        {resultado && (
          <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Guarda tus resultados</h3>
            <p className="text-gray-600 mb-4">
              Registra tu email para descargar tus cálculos en PDF y guardar tu progreso.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  alert('Para descargar tu PDF, registra tu email. Esta función estará disponible pronto.');
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition"
              >
                📥 Descargar como PDF
              </button>
              <button
                onClick={() => {
                  alert('Para descargar tu CSV, registra tu email. Esta función estará disponible pronto.');
                }}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-semibold transition"
              >
                📊 Descargar como Excel
              </button>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 bg-blue-600 text-white p-12 rounded-lg text-center">
          <h3 className="text-2xl font-bold mb-4">¿Quieres un análisis personalizado?</h3>
          <p className="mb-6 text-lg">
            Esta calculadora es una estimación. Contáctame para una asesoría completa con proyecciones detalladas.
          </p>
          <a
            href="https://wa.me/529992005550"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-bold inline-block"
          >
            Contactar por WhatsApp
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
