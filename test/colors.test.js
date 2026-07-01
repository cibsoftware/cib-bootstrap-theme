import { describe, it, expect } from 'vitest';
import { compile } from 'sass';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const COLOR_VARIABLE_PATTERN = /^\$([\w-]+):\s*(#[0-9a-fA-F]{3,8})\s*!default;/gm;

function extractColors(scssSource) {
  const colors = [];
  for (const match of scssSource.matchAll(COLOR_VARIABLE_PATTERN)) {
    colors.push({ name: match[1], hex: match[2] });
  }
  return colors;
}

const colorsSource = readFileSync(path.join(rootDir, 'src/scss/_colors.scss'), 'utf-8');
const colors = extractColors(colorsSource);

const { css: compiledCss } = compile(path.join(rootDir, 'src/index.scss'), {
  loadPaths: [path.join(rootDir, 'node_modules')],
  quietDeps: true,
  logger: { warn() {} },
});

describe('colors', () => {
  it('finds color variables to verify', () => {
    expect(colors.length).toBeGreaterThan(0);
  });

  it.each(colors)('includes --bs-$name in the compiled CSS output', ({ name, hex }) => {
    const declaration = new RegExp(String.raw`--bs-${name}:\s*${hex}`, 'i');
    expect(compiledCss).toMatch(declaration);
  });
});
