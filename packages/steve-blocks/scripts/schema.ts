import { resolve } from 'path';
import * as TJS from 'typescript-json-schema';
import { existsSync, readdirSync, mkdirSync, writeFileSync } from 'fs';
import { compilerOptions } from '../tsconfig.json';

const componentsDir = resolve(__dirname, '../components');
const distDir = resolve(__dirname, '../dist');

const dirs = readdirSync(componentsDir);
const fulldirs = dirs.map((dir) => resolve(componentsDir, dir));
const files = fulldirs.map((dir) => require.resolve(dir));
const program = TJS.getProgramFromFiles(files, compilerOptions);
const generator = TJS.buildGenerator(program);
dirs.forEach((d) => {
  const schema = generator.getSchemaForSymbol(`${d}Props`);

  const dir = resolve(distDir, d);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  writeFileSync(resolve(dir, 'schema.json'), JSON.stringify(schema, null, 2));
});
