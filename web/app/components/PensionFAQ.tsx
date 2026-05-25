'use client';

import { useState } from 'react';

export default function PensionFAQ() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const faqs = [
    {
      id: 'semanas',
      question: '¿Cuántas semanas cotizadas necesito?',
      answer:
        'El requisito mínimo es 500 semanas cotizadas ante IMSS. Esto equivale a aproximadamente 9.6 años de cotización continua. Si tienes menos, no puedes solicitar pensión todavía. Si tienes 500 en punto, recibirás la pensión mínima. Cada 52 semanas adicionales mejora tu pensión.',
    },
    {
      id: 'edades',
      question: '¿A qué edad puedo solicitar pensión?',
      answer:
        'A partir de los 60 años puedes solicitar pensión, pero recibirás solo 75% de lo que te corresponde. A los 65 años recibes 100%. Por cada año entre los 60 y 65, aumenta tu porcentaje: 60→75%, 61→80%, 62→85%, 63→90%, 64→95%, 65→100%. La mayoría espera a los 65 para recibir pensión completa.',
    },
    {
      id: 'sdp',
      question: '¿Qué es el Salario Diario Promedio (SDP)?',
      answer:
        'Es el promedio de tus salarios de los últimos años de trabajo. IMSS lo calcula automáticamente. Es uno de los factores más importantes de tu pensión. Un SDP más alto = pensión más alta. Lo encuentras en tu estado de cuenta IMSS. Si no tienes, podemos solicitarlo.',
    },
    {
      id: 'diferencia-60-65',
      question: '¿Cuál es la diferencia real entre solicitar a los 60 vs 65?',
      answer:
        'Si tu pensión proyectada es $10,000/mes: A los 60 años recibirías $7,500/mes. A los 65 años recibirías $10,000/mes. La diferencia es $2,500/mes. Si vives 10 años más, a los 60 recibirías $300,000 total (10×$30k/año = $300k en 10 años). A los 65, en 10 años recibirías $400,000 total (10×$40k/año). Por eso muchos esperan.',
    },
    {
      id: 'estado-cuenta',
      question: '¿Cómo obtengo mi estado de cuenta IMSS?',
      answer:
        'Hay 3 formas: 1) Online: www.imss.gob.mx → Mi Cuenta IMSS (requiere RFC y contraseña). 2) Presencialmente: acude a la subdelegación IMSS más cercana con ID. 3) Nosotros lo solicitamos: si tienes datos básicos (NSS o RFC), podemos tramitarlo ante IMSS. Toma 5-7 días típicamente.',
    },
    {
      id: 'documentos',
      question: '¿Qué documentos necesito para solicitar pensión?',
      answer:
        'Necesitas: 1) Identificación oficial (INE, pasaporte). 2) CURP original certificado (de RENAPO, no fotocopia). 3) Comprobante de domicilio reciente (menos de 3 meses). 4) Estado de cuenta IMSS actualizado. 5) Si tienes períodos sin documentación, pueden acreditarse con cartas patronales o declaraciones de testigos. Te entregamos checklist completo.',
    },
    {
      id: 'procedimiento',
      question: '¿Cuál es el procedimiento para solicitar pensión?',
      answer:
        'Paso 1: Validamos tu elegibilidad (500 semanas, edad 60+, documentación). Paso 2: Preparamos expediente con todos documentos. Paso 3: Presentamos solicitud oficial ante IMSS. Paso 4: IMSS revisa durante 12 días (plazo legal). Paso 5: Notificación de aprobación. Paso 6: Primeros depósitos de pensión. Total: 4-8 semanas típicamente.',
    },
    {
      id: 'timeline',
      question: '¿Cuánto tarda desde solicitud hasta primer depósito?',
      answer:
        'El timeline oficial de IMSS es: 12 días de revisión legal. Pero en la práctica: 3-4 días preparación, 5-7 días presentación, 12 días revisión IMSS, 7-14 días más para generar datos bancarios y transferencias. Total: 4-8 semanas es lo más común. Casos rápidos: 3 semanas. Casos complejos: 10+ semanas.',
    },
    {
      id: 'rechazo',
      question: '¿Qué pasa si IMSS rechaza mi solicitud?',
      answer:
        'Rechazos son raros si cumples 500 semanas. Las razones comunes son: 1) Documentación incompleta (se puede subsanar). 2) Lagunas en cotización sin acreditar (se intenta acreditar retroactivamente). 3) Datos inconsistentes (se corrigen). Con un análisis previo, identificamos problemas antes de presentar, así que rara vez hay rechazos.',
    },
    {
      id: 'pensión-mínima',
      question: '¿Existe pensión mínima garantizada?',
      answer:
        'Sí. En 2026, IMSS garantiza una pensión mínima de $10,636 pesos mensuales. Si tu cálculo resulta menor (muy pocas semanas o SDP muy bajo), recibes el mínimo. Esto protege a trabajadores con carreras laborales cortas o salarios muy bajos.',
    },
    {
      id: 'cambio-domicilio',
      question: '¿Qué hago si cambié de domicilio recientemente?',
      answer:
        'Necesitas comprobante de domicilio actual (menos de 3 meses). Puede ser: recibo de servicios (luz, agua, teléfono), contrato de alquiler, estado de cuenta bancario. Si acabas de cambiar y no tienes comprobante con tu nombre, una carta de la administración del edificio puede servir. Consúltanos si tienes dudas.',
    },
    {
      id: 'lagunas-trabajo',
      question: '¿Qué son las lagunas de cotización y afectan mi pensión?',
      answer:
        'Son períodos en los que no cotizaste (dejaste de trabajar, cambios de empleo). Si tienes lagunas, IMSS las contabiliza como "semanas no cotizadas". Pueden afectar tu total de semanas. Pero si tienes 500+ semanas cotizadas (sin contar lagunas), no afecta elegibilidad. Pueden acreditarse retroactivamente con documentación. Analizamos tu caso específicamente.',
    },
    {
      id: 'modalidad-40',
      question: '¿Puedo combinar Modalidad 40 con solicitud de pensión?',
      answer:
        'Sí. Algunos clientes completan semanas faltantes mediante Modalidad 40 (cotización voluntaria) ANTES de solicitar pensión. Ejemplo: tienes 480 semanas, cotizas voluntariamente 5 años más, llegas a 740 semanas, luego solicitas pensión. Esto mejora tu pensión significativamente. Es una estrategia común.',
    },
    {
      id: 'issste',
      question: '¿Funciona igual si trabajé en ISSSTE (empleado público)?',
      answer:
        'ISSSTE tiene reglas diferentes a IMSS. Los requisitos de semanas pueden variar, los porcentajes de edad son distintos. Si trabajaste en ambos sistemas, necesitas análisis especial de cuál sistema te da mejor pensión. Nos especializamos en IMSS, pero reconocemos procedimientos ISSSTE básicos. Para ISSSTE complejo, podemos derivarte a especialista.',
    },
    {
      id: 'costo-servicio',
      question: '¿Cuánto cuesta el servicio de gestoría?',
      answer:
        '$1,490 pesos mexicanos incluye: validación completa de elegibilidad, preparación de expediente, presentación ante IMSS, seguimiento durante revisión de 12 días, apoyo hasta primer depósito. Pagás una sola vez. El ROI es excelente: si mejora tu pensión en $500/mes, en 3 meses recuperas la inversión.',
    },
    {
      id: 'sin-documentación',
      question: '¿Puedo solicitar si perdí documentación de años anteriores?',
      answer:
        'Posiblemente sí. IMSS permite acreditar períodos retroactivamente con: cartas patronales (si las tienes), declaraciones de testigos supervisores, registros de AFP (si cotizaste), cambios de domicilio registrados. No es automático, pero hay caminos. Hacemos un análisis detallado de qué se puede acreditar en tu caso.',
    },
  ];

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="py-12">
      <div className="max-w-3xl">
        <h3 className="text-2xl font-bold text-gray-900 mb-8">Preguntas Frecuentes</h3>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleExpand(faq.id)}
                className="w-full px-6 py-4 bg-white hover:bg-gray-50 transition text-left flex justify-between items-center"
              >
                <span className="font-semibold text-gray-900">{faq.question}</span>
                <span className={`text-blue-600 transition ${expanded[faq.id] ? 'rotate-180' : ''}`}>▼</span>
              </button>

              {expanded[faq.id] && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-700 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
          <h4 className="font-bold text-gray-900 mb-2">¿Tienes otra pregunta?</h4>
          <p className="text-gray-600 mb-4">
            Estamos disponibles para resolver tus dudas específicas sobre tu caso.
          </p>
          <a
            href="https://wa.me/529992005550"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-500 text-white px-6 py-2 rounded font-semibold hover:bg-green-600 transition"
          >
            Contactar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
