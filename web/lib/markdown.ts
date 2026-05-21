export async function getPostContent(id: string): Promise<string | null> {
  // Blog posts coming soon - placeholder for MVP
  const placeholders: Record<string, string> = {
    'elegibilidad-ley73': '<p>Artículo completo sobre elegibilidad Ley 73 próximamente.</p>',
    'modalidad-10': '<p>Guía completa sobre Modalidad 10 próximamente.</p>',
    'modalidad-40': '<p>Estrategia de Modalidad 40 próximamente.</p>',
    'modalidad-13': '<p>Modalidad 13 para trabajadores del campo próximamente.</p>',
    'casos-ley73': '<p>Casos prácticos Ley 73 próximamente.</p>',
    'casos-ley97': '<p>Análisis Ley 97 próximamente.</p>',
  };

  return placeholders[id] || null;
}

export function getPostTitle(id: string): string {
  const titles: Record<string, string> = {
    'elegibilidad-ley73': 'Elegibilidad Ley 73: ¿Quién tiene derecho a pensión?',
    'modalidad-10': 'Modalidad 10: Cómo funciona para independientes urbanos',
    'modalidad-40': 'Modalidad 40: Tu estrategia para optimizar pensión después de los 55',
    'modalidad-13': 'Modalidad 13: Especial para trabajadores del campo',
    'casos-ley73': 'Casos Prácticos Ley 73: Historias reales de optimización',
    'casos-ley97': 'Ley 97 y AFORES: La realidad de las generaciones jóvenes',
  };
  return titles[id] || 'Artículo próximamente';
}
