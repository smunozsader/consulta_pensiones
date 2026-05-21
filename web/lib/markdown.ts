import fs from 'fs';
import path from 'path';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

const fileMapping: Record<string, string> = {
  'elegibilidad-ley73': '01_ELEGIBILIDAD_LEY73.md',
  'modalidad-10': '03_MODALIDAD_10.md',
  'modalidad-40': '04_MODALIDAD_40.md',
  'modalidad-13': '05_MODALIDAD_13.md',
  'casos-ley73': '06_CASOS_PRACTICOS_LEY73.md',
  'casos-ley97': '07_CASOS_PRACTICOS_LEY97_AFORES.md',
};

function findContentDir(): string {
  const cwd = process.cwd();
  const possiblePaths = [
    path.join(cwd, 'content'),
    path.join(cwd, 'web', 'content'),
    path.join(cwd, '..', 'content'),
  ];

  for (const dirPath of possiblePaths) {
    if (fs.existsSync(dirPath)) {
      console.log(`✓ Found content directory at: ${dirPath}`);
      return dirPath;
    }
  }

  console.warn(`⚠ Content directory not found. Tried: ${possiblePaths.join(', ')}`);
  console.warn(`Current working directory: ${cwd}`);
  return path.join(cwd, 'content');
}

const docsDir = findContentDir();

export async function getPostContent(id: string): Promise<string | null> {
  const fileName = fileMapping[id];
  if (!fileName) {
    console.warn(`⚠ No file mapping for ID: ${id}`);
    return null;
  }

  try {
    const filePath = path.join(docsDir, fileName);
    console.log(`📖 Attempting to read: ${filePath}`);

    if (!fs.existsSync(filePath)) {
      console.error(`✗ File not found: ${filePath}`);
      return null;
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    return md.render(content);
  } catch (error) {
    console.error(`✗ Error reading file for post ${id}:`, error);
    return null;
  }
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
  return titles[id] || '';
}
