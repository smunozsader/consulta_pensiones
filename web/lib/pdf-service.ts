import { jsPDF } from 'jspdf';

export interface CalculationDataForPDF {
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

export function generateCalculationPDF(
  data: CalculationDataForPDF,
  nombreUsuario: string
): Blob {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - 2 * margin;

  let yPosition = margin;

  // Header
  doc.setFontSize(20);
  doc.setFont('Helvetica', 'bold');
  doc.text('Tu Cálculo de Pensión Personalizado', margin, yPosition);
  yPosition += 10;

  doc.setFontSize(10);
  doc.setFont('Helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text(`Generado: ${new Date().toLocaleDateString('es-MX')}`, margin, yPosition);
  yPosition += 5;

  // User name
  doc.setTextColor(0, 0, 0);
  doc.setFont('Helvetica', 'bold');
  doc.text(`Persona: ${nombreUsuario}`, margin, yPosition);
  yPosition += 10;

  // Input Summary Section
  doc.setFontSize(12);
  doc.setFont('Helvetica', 'bold');
  doc.text('Datos Ingresados', margin, yPosition);
  yPosition += 6;

  doc.setFontSize(10);
  doc.setFont('Helvetica', 'normal');
  const inputData = [
    [`Edad actual:`, `${data.edadActual} años`],
    [`Salario diario promedio:`, `$${data.salarioDiario.toLocaleString('es-MX', { maximumFractionDigits: 2 })}`],
    [`Semanas cotizadas:`, `${data.semanasCotizadas}`],
    [`Ley/Modalidad:`, `${data.ley}`],
    [`Año inicio de cotización:`, `${data.annoInicio}`],
    [`Tiene esposa/pareja:`, data.tieneEsposa ? 'Sí' : 'No'],
    [`Hijos dependientes:`, `${data.numHijos}`],
    [`Padres dependientes:`, data.padresDependientes ? 'Sí' : 'No'],
  ];

  inputData.forEach(([label, value]) => {
    doc.setFont('Helvetica', 'bold');
    doc.text(label, margin, yPosition);
    doc.setFont('Helvetica', 'normal');
    doc.text(value, margin + 70, yPosition);
    yPosition += 5;
  });

  yPosition += 5;

  // Calculation Details Section
  doc.setFontSize(12);
  doc.setFont('Helvetica', 'bold');
  doc.text('Detalles del Cálculo', margin, yPosition);
  yPosition += 6;

  doc.setFontSize(10);
  doc.setFont('Helvetica', 'normal');
  const calcDetails = [
    [`Cuantía Básica:`, `${data.cuantiaBasica.toFixed(2)}%`],
    [`Incremento por semanas extra:`, `${data.incrementoExtra.toFixed(2)}%`],
    [`Pensión Base:`, `$${data.pensionBase.toLocaleString('es-MX', { maximumFractionDigits: 0 })}/mes`],
    [`GAFES (asignaciones familiares):`, `$${data.gafes.toLocaleString('es-MX', { maximumFractionDigits: 0 })}`],
  ];

  calcDetails.forEach(([label, value]) => {
    doc.setFont('Helvetica', 'bold');
    doc.text(label, margin, yPosition);
    doc.setFont('Helvetica', 'normal');
    doc.text(value, margin + 70, yPosition);
    yPosition += 5;
  });

  yPosition += 5;

  // Results Section - Main findings
  doc.setFontSize(12);
  doc.setFont('Helvetica', 'bold');
  doc.setTextColor(22, 101, 52); // Green
  doc.text('Resultados', margin, yPosition);
  doc.setTextColor(0, 0, 0);
  yPosition += 6;

  // Box for A los 60
  doc.setDrawColor(180, 180, 180);
  doc.setFillColor(254, 252, 232); // Yellow-50
  doc.rect(margin, yPosition - 3, contentWidth, 20, 'F');

  doc.setFontSize(10);
  doc.setFont('Helvetica', 'bold');
  doc.text('Si solicitas pensión a los 60 años:', margin + 3, yPosition);
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(14);
  doc.text(
    `$${data.pensionA60.toLocaleString('es-MX', { maximumFractionDigits: 0 })}/mes`,
    margin + 3,
    yPosition + 6
  );
  doc.setFontSize(9);
  doc.text('(75% del cálculo base)', margin + 3, yPosition + 10);
  yPosition += 22;

  // Box for A los 65
  doc.setFillColor(220, 251, 235); // Green-50
  doc.rect(margin, yPosition - 3, contentWidth, 20, 'F');

  doc.setFontSize(10);
  doc.setFont('Helvetica', 'bold');
  doc.text('Si esperas a los 65 años:', margin + 3, yPosition);
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(14);
  doc.text(
    `$${data.pensionA65.toLocaleString('es-MX', { maximumFractionDigits: 0 })}/mes`,
    margin + 3,
    yPosition + 6
  );
  doc.setFontSize(9);
  doc.text('(100% del cálculo base)', margin + 3, yPosition + 10);
  yPosition += 22;

  // Difference
  const difference = data.pensionA65 - data.pensionA60;
  doc.setFontSize(10);
  doc.setFont('Helvetica', 'bold');
  doc.text('Diferencia por esperar 5 años:', margin, yPosition);
  doc.setFont('Helvetica', 'normal');
  doc.text(
    `$${difference.toLocaleString('es-MX', { maximumFractionDigits: 0 })}/mes`,
    margin + 70,
    yPosition
  );
  yPosition += 6;
  doc.setFontSize(9);
  doc.text(
    `(≈ $${(difference * 12).toLocaleString('es-MX', { maximumFractionDigits: 0 })}/año)`,
    margin + 70,
    yPosition
  );
  yPosition += 10;

  // Footer disclaimer
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  const disclaimer =
    '⚠️ IMPORTANTE: Esta es una estimación basada en información vigente (Mayo 2026). Los valores son informativos y pueden cambiar. Valida siempre con el IMSS antes de solicitar tu pensión.';

  const disclaimerLines = doc.splitTextToSize(disclaimer, contentWidth - 4);
  doc.text(disclaimerLines, margin + 2, yPosition);

  // Page footer
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.text(
      `Página ${i} de ${pageCount}`,
      pageWidth / 2,
      pageHeight - 5,
      { align: 'center' }
    );
  }

  return doc.output('blob');
}
