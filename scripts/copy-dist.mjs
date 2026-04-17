import { rm, cp, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const sourceDir = resolve('x4tech', 'dist');
const targetDir = resolve('dist');

await rm(targetDir, { recursive: true, force: true });
await mkdir(targetDir, { recursive: true });
await cp(sourceDir, targetDir, { recursive: true });
