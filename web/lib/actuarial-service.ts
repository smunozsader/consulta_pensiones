/**
 * Actuarial Analysis Service
 * Generates pension projections based on IMSS 2026 regulations
 */

export interface ClientData {
  nombre: string;
  email: string;
  curp: string;
  nss: string;
  edadActual: number;
  semanasActuales: number;
  salarioDiarioPromedio: number;
  tieneEstadoCuenta: boolean;
  documentacionCompleta: boolean;
  historialPatrones: string;
  notas: string;
}

export interface ActuarialProjection {
  edad: number;
  porcentajePension: number;
  montoMensual: number;
  montoAnual: number;
  montoVidaEsperada: number; // 20 años de longevidad
}

export interface EquilibriumPoint {
  edadOptima: number;
  montoMensual: number;
  razonamiento: string;
}

export interface ActuarialAnalysis {
  clientName: string;
  generatedAt: string;
  situacionActual: {
    semanasActuales: number;
    salarioDiarioPromedio: number;
    edadActual: number;
    documentacionCompleta: boolean;
    observaciones: string;
  };
  calculos: {
    cuantiaBasica: number;
    incrementoAnual: number;
    montoBaseCalculado: number;
  };
  proyecciones: ActuarialProjection[];
  puntoEquilibrio: EquilibriumPoint;
  estrategiasRecomendadas: string[];
  recomendacionFinal: string;
  proximoPasos: string[];
}

// Tabla de Cuantía Básica según SDP (IMSS 2026)
function getCuantiaBasica(sdp: number): number {
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
}

// Incremento anual por semanas adicionales (sobre 500)
function getIncrementoAnual(weeksTotal: number, sdp: number): number {
  if (weeksTotal < 500) return 0;
  const semanasAdicionales = Math.floor((weeksTotal - 500) / 52);
  if (semanasAdicionales === 0) return 0;

  // Tabla de incremento según SDP (por cada 52 semanas = 1 año)
  if (sdp <= 200) return Math.min(semanasAdicionales * 0.028, 0.5); // Max 50%
  if (sdp <= 400) return Math.min(semanasAdicionales * 0.024, 0.45);
  if (sdp <= 600) return Math.min(semanasAdicionales * 0.020, 0.4);
  return Math.min(semanasAdicionales * 0.016, 0.35);
}

// Factor de edad: aumenta 5% cada año desde 60 hasta 65
function getAgeFactor(age: number): number {
  if (age < 60) return 0;
  if (age === 60) return 0.75;
  if (age === 61) return 0.8;
  if (age === 62) return 0.85;
  if (age === 63) return 0.9;
  if (age === 64) return 0.95;
  if (age >= 65) return 1.0;
  return 1.0;
}

// Factor Fox (permanente desde 2001)
const FACTOR_FOX = 1.11;

// Pensión mínima garantizada (IMSS 2026)
const PENSION_MINIMA = 10636;

export function generateActuarialAnalysis(clientData: ClientData): ActuarialAnalysis {
  const { nombre, edadActual, semanasActuales, salarioDiarioPromedio } = clientData;

  // Validaciones previas
  if (semanasActuales < 500) {
    throw new Error('El cliente no cumple el requisito mínimo de 500 semanas cotizadas');
  }

  // Cálculos actuariales
  const cuantiaBasica = getCuantiaBasica(salarioDiarioPromedio);
  const incrementoAnual = getIncrementoAnual(semanasActuales, salarioDiarioPromedio);

  // Fórmula: (SDP × 365 × CB × (1 + incremento) × Fox) ÷ 12
  const montoBaseCalculado =
    (salarioDiarioPromedio * 365 * cuantiaBasica * (1 + incrementoAnual) * FACTOR_FOX) / 12;

  // Proyecciones desde 60 hasta 75 años
  const proyecciones: ActuarialProjection[] = [];
  let mejorEquilibrio: EquilibriumPoint = {
    edadOptima: 65,
    montoMensual: montoBaseCalculado,
    razonamiento: 'Edad máxima con 100% de pensión',
  };
  let mejorValorVida = 0;

  for (let edad = 60; edad <= 75; edad++) {
    const ageFactor = getAgeFactor(edad);
    const montoMensual = Math.max(Math.round(montoBaseCalculado * ageFactor), PENSION_MINIMA);
    const montoAnual = montoMensual * 12;

    // Estimar longevidad: esperanza de vida típica para jubilados mexicanos ~20 años desde solicitud
    const aniosVida = Math.max(0, 20 - (edad - edadActual));
    const montoVidaEsperada = montoMensual * 12 * aniosVida;

    proyecciones.push({
      edad,
      porcentajePension: Math.round(ageFactor * 100),
      montoMensual,
      montoAnual,
      montoVidaEsperada,
    });

    // Encontrar punto de equilibrio (máximo valor esperado de vida)
    if (montoVidaEsperada > mejorValorVida) {
      mejorValorVida = montoVidaEsperada;
      mejorEquilibrio = {
        edadOptima: edad,
        montoMensual,
        razonamiento: `A los ${edad} años recibes $${montoMensual.toLocaleString('es-MX')}/mes. En 20 años de vida esperada: $${montoVidaEsperada.toLocaleString('es-MX')} total.`,
      };
    }
  }

  // Estrategias recomendadas
  const estrategias: string[] = [];

  const pensionA60 = proyecciones.find((p) => p.edad === 60)!.montoMensual;
  const pensionA65 = proyecciones.find((p) => p.edad === 65)!.montoMensual;
  const diferencia = pensionA65 - pensionA60;

  if (diferencia > 2000) {
    estrategias.push(
      `ESPERA A LOS 65: La diferencia entre 60 y 65 años es $${diferencia.toLocaleString('es-MX')}/mes. ` +
        `Si vives más de 10 años adicionales, la opción de 65 años es más rentable financieramente.`
    );
  } else if (diferencia < 1000) {
    estrategias.push(
      `SOLICITA A LOS 60: La diferencia es solo $${diferencia.toLocaleString('es-MX')}/mes. ` +
        `Comienza a recibir pensión 5 años antes vale la pena económicamente.`
    );
  } else {
    estrategias.push(
      `ANÁLISIS PERSONA A PERSONA: Diferencia de $${diferencia.toLocaleString('es-MX')}/mes entre 60 y 65. ` +
        `Depende de tu salud y expectativa de vida.`
    );
  }

  // Si tiene semanas adicionales
  if (semanasActuales > 500) {
    const semanasExtra = semanasActuales - 500;
    estrategias.push(
      `SEMANAS ADICIONALES: Tienes ${semanasExtra} semanas extra sobre el mínimo. ` +
        `Esto mejora tu pensión en aproximadamente ${(incrementoAnual * 100).toFixed(1)}%.`
    );
  }

  // Si documentación incompleta
  if (!clientData.documentacionCompleta) {
    estrategias.push(
      `RECOLECTA DOCUMENTACIÓN: Necesitas acta de nacimiento certificada, RFC, CURP, ` +
        `comprobante de domicilio reciente y estado de cuenta IMSS. Esto puede tomar 2-3 semanas.`
    );
  }

  // Recomendación final
  const recomendacionFinal =
    `Basado en tu análisis: tienes ${semanasActuales} semanas cotizadas ` +
    `(${semanasActuales - 500} semanas adicionales al mínimo), ` +
    `salario promedio de $${salarioDiarioPromedio.toLocaleString('es-MX')}/día. ` +
    `Tu punto de equilibrio es a los ${mejorEquilibrio.edadOptima} años ` +
    `con una pensión de $${mejorEquilibrio.montoMensual.toLocaleString('es-MX')}/mes.`;

  // Próximos pasos
  const proximoPasos: string[] = [
    '1. Obtén tu estado de cuenta actualizado del IMSS (si no lo tienes)',
    '2. Reúne documentación completa (acta de nacimiento, RFC, CURP, comprobante domicilio)',
    '3. Revisa este análisis y elige tu edad ideal para solicitar pensión',
    '4. Contacta con nosotros para gestión ante IMSS (incluye presentación y seguimiento)',
    '5. Recibe tu primera pensión en 4-8 semanas típicamente',
  ];

  return {
    clientName: nombre,
    generatedAt: new Date().toISOString(),
    situacionActual: {
      semanasActuales,
      salarioDiarioPromedio,
      edadActual,
      documentacionCompleta: clientData.documentacionCompleta,
      observaciones: clientData.notas,
    },
    calculos: {
      cuantiaBasica: Math.round(cuantiaBasica * 100) / 100,
      incrementoAnual: Math.round(incrementoAnual * 1000) / 1000,
      montoBaseCalculado: Math.round(montoBaseCalculado),
    },
    proyecciones,
    puntoEquilibrio: mejorEquilibrio,
    estrategiasRecomendadas: estrategias,
    recomendacionFinal,
    proximoPasos,
  };
}
