import * as docgen from 'react-docgen-typescript';
import { readdirSync, existsSync, mkdirSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { componentsDir, distDir } from './paths';

const dirs = readdirSync(componentsDir);
const fulldirs = dirs.map((dir) => resolve(componentsDir, dir));
const files = fulldirs.map((dir) => require.resolve(dir));
const docs = docgen.parse(files);
docs.forEach((doc, index) => {
  const dir = resolve(distDir, dirs[index]);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  writeFileSync(resolve(dir, 'schema.json'), JSON.stringify(doc, null, 2));
});
