// Calculadora Modalidad 40 IMSS - Ley 73
// Porteado de Python a TypeScript

interface TablaRango {
  rango_min: number;
  rango_max: number;
  cuantia_basica: number;
  incremento_anual: number;
}

interface CalculoResultado {
  pension_mensual: number;
  pension_anual: number;
  cuantia_basica_pct: number;
  incremento_anual_pct: number;
  gafes_total: number;
  pension_con_gafes: number;
  descripcion: string;
}

interface InversionResultado {
  desglose_anual: Record<number, {
    tasa_pct: number;
    costo_mensual: number;
    costo_anual: number;
  }>;
  total_5_años: number;
  promedio_mensual: number;
}

export class CalculadoraModalidad40 {
  private uma_diaria_2025 = 113.14;
  private uma_mensual_2025 = 3439.46;
  private tope_maximo_umas = 25;
  private minimo_garantizado_diario = 248.93;

  private uma_proyecciones: Record<number, number> = {
    2016: 73.04, 2017: 80.60, 2018: 84.39, 2019: 86.88,
    2020: 89.62, 2021: 92.97, 2022: 96.22, 2023: 103.74,
    2024: 108.57, 2025: 113.14, 2026: 117.47, 2027: 121.82,
    2028: 126.20, 2029: 130.62, 2030: 135.08
  };

  private tasas_modalidad40: Record<number, number> = {
    2021: 10.08, 2022: 10.08, 2023: 11.17, 2024: 12.26,
    2025: 13.347, 2026: 14.438, 2027: 15.528, 2028: 16.619,
    2029: 17.709, 2030: 18.800
  };

  private tabla_porcentajes_ley73: TablaRango[] = [
    { rango_min: 0.00, rango_max: 1.00, cuantia_basica: 80.00, incremento_anual: 0.56 },
    { rango_min: 1.01, rango_max: 1.25, cuantia_basica: 77.11, incremento_anual: 0.81 },
    { rango_min: 1.26, rango_max: 1.50, cuantia_basica: 55.18, incremento_anual: 1.18 },
    { rango_min: 1.51, rango_max: 1.75, cuantia_basica: 49.23, incremento_anual: 1.43 },
    { rango_min: 1.76, rango_max: 2.00, cuantia_basica: 42.67, incremento_anual: 1.62 },
    { rango_min: 2.01, rango_max: 2.25, cuantia_basica: 37.65, incremento_anual: 1.76 },
    { rango_min: 2.26, rango_max: 2.50, cuantia_basica: 33.68, incremento_anual: 1.87 },
    { rango_min: 2.51, rango_max: 2.75, cuantia_basica: 30.48, incremento_anual: 1.96 },
    { rango_min: 2.76, rango_max: 3.00, cuantia_basica: 27.83, incremento_anual: 2.03 },
    { rango_min: 3.01, rango_max: 3.25, cuantia_basica: 25.60, incremento_anual: 2.10 },
    { rango_min: 3.26, rango_max: 3.50, cuantia_basica: 23.70, incremento_anual: 2.15 },
    { rango_min: 3.51, rango_max: 3.75, cuantia_basica: 22.07, incremento_anual: 2.20 },
    { rango_min: 3.76, rango_max: 4.00, cuantia_basica: 20.65, incremento_anual: 2.24 },
    { rango_min: 4.01, rango_max: 4.25, cuantia_basica: 19.39, incremento_anual: 2.27 },
    { rango_min: 4.26, rango_max: 4.50, cuantia_basica: 18.29, incremento_anual: 2.30 },
    { rango_min: 4.51, rango_max: 4.75, cuantia_basica: 17.30, incremento_anual: 2.33 },
    { rango_min: 4.76, rango_max: 5.00, cuantia_basica: 16.41, incremento_anual: 2.36 },
    { rango_min: 5.01, rango_max: 5.25, cuantia_basica: 15.61, incremento_anual: 2.38 },
    { rango_min: 5.26, rango_max: 5.50, cuantia_basica: 14.88, incremento_anual: 2.40 },
    { rango_min: 5.51, rango_max: 5.75, cuantia_basica: 14.22, incremento_anual: 2.42 },
    { rango_min: 5.76, rango_max: 6.00, cuantia_basica: 13.62, incremento_anual: 2.43 },
    { rango_min: 6.01, rango_max: Infinity, cuantia_basica: 13.00, incremento_anual: 2.45 }
  ];

  getUmaParaAño(año: number): number {
    if (año in this.uma_proyecciones) {
      return this.uma_proyecciones[año];
    }
    if (año < 2025) return this.uma_diaria_2025;

    const base_year = Math.max(...Object.keys(this.uma_proyecciones).map(Number).filter(y => y <= año));
    const years_ahead = año - base_year;
    return this.uma_proyecciones[base_year] * Math.pow(1.034, years_ahead);
  }

  buscarPorcentajesPorSDP(sdp_diario: number, uma_diaria?: number): [number, number] {
    if (!uma_diaria) uma_diaria = this.uma_diaria_2025;

    const multiple_uma = sdp_diario / uma_diaria;

    for (const rango of this.tabla_porcentajes_ley73) {
      if (multiple_uma >= rango.rango_min && multiple_uma <= rango.rango_max) {
        return [rango.cuantia_basica / 100, rango.incremento_anual / 100];
      }
    }

    return [0.13, 0.0245];
  }

  calcularCostoMensual(sbc_diario: number, año: number, dias_mes: number = 30): number {
    if (!(año in this.tasas_modalidad40)) {
      throw new Error(`Año ${año} no válido`);
    }

    const uma_año = this.getUmaParaAño(año);
    const uma_2025 = this.uma_proyecciones[2025];
    const multiple_uma = sbc_diario / uma_2025;
    const sbc_ajustado = multiple_uma * uma_año;
    const sbc_mensual = sbc_ajustado * dias_mes;
    const tasa = this.tasas_modalidad40[año] / 100;

    return sbc_mensual * tasa;
  }

  calcularInversionTotal(sbc_diario: number, año_inicio: number = 2025): InversionResultado {
    const resultado: InversionResultado = {
      desglose_anual: {},
      total_5_años: 0,
      promedio_mensual: 0
    };

    let total = 0;
    let años_calculados = 0;

    for (let i = 0; i < 6; i++) {
      const año = año_inicio + i;
      if (año > 2030) break;

      const costo_mensual = this.calcularCostoMensual(sbc_diario, año);
      const costo_anual = costo_mensual * 12;
      total += costo_anual;
      años_calculados++;

      resultado.desglose_anual[año] = {
        tasa_pct: this.tasas_modalidad40[año],
        costo_mensual,
        costo_anual
      };
    }

    resultado.total_5_años = total;
    resultado.promedio_mensual = total / (años_calculados * 12);

    return resultado;
  }

  calcularPensionLey73(
    semanas_cotizadas: number,
    sdp_diario: number,
    edad_pension: number = 65,
    tiene_esposa: boolean = false,
    num_hijos_dependientes: number = 0,
    tiene_padres_dependientes: boolean = false
  ): CalculoResultado {
    const [cuantia_basica_pct, incremento_anual_pct] = this.buscarPorcentajesPorSDP(sdp_diario);

    // Calcular porcentaje por edad
    const porcentaje_edad = edad_pension >= 65 ? 1.0 :
      edad_pension === 60 ? 0.75 :
      edad_pension === 61 ? 0.80 :
      edad_pension === 62 ? 0.85 :
      edad_pension === 63 ? 0.90 : 0.95;

    // Calcular cuantía básica
    const cuantia_base_diaria = sdp_diario * cuantia_basica_pct * porcentaje_edad;

    // Incrementos anuales (por semanas adicionales)
    const semanas_adicionales = Math.max(0, semanas_cotizadas - 500);
    const incremento_por_semanas = (sdp_diario * incremento_anual_pct * semanas_adicionales) / 52;

    // Pension mensual sin GAFES
    const pension_diaria = cuantia_base_diaria + incremento_por_semanas;
    const pension_mensual = pension_diaria * 30.4;
    const pension_anual = pension_mensual * 12;

    // Calcular GAFES (asignaciones familiares)
    let gafes_total = 0;
    if (tiene_esposa) gafes_total += pension_mensual * 0.15;
    gafes_total += pension_mensual * 0.10 * num_hijos_dependientes;
    if (tiene_padres_dependientes) gafes_total += pension_mensual * 0.20;
    if (!tiene_esposa && num_hijos_dependientes === 0) gafes_total += pension_mensual * 0.15;

    const pension_con_gafes = pension_mensual + gafes_total;

    return {
      pension_mensual: Math.max(pension_mensual, this.minimo_garantizado_diario * 30.4),
      pension_anual,
      cuantia_basica_pct,
      incremento_anual_pct,
      gafes_total,
      pension_con_gafes,
      descripcion: `${semanas_cotizadas} semanas a ${sdp_diario.toFixed(2)}/día = $${pension_con_gafes.toFixed(2)}/mes`
    };
  }
}
