import fs from 'fs';
import path from 'path';

// 1. Client-side static chunks aliasing
const staticDirs = [
  '.next/static/chunks/app',
  '.next/standalone/.next/static/chunks/app'
];

for (const dir of staticDirs) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Create fallback stubs if files don't exist yet
  const errorFile = path.join(dir, 'error.js');
  const globalErrorFile = path.join(dir, 'global-error.js');
  if (!fs.existsSync(errorFile)) {
    fs.writeFileSync(errorFile, '(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[705],{},function(e){}]);\n');
  }
  if (!fs.existsSync(globalErrorFile)) {
    fs.writeFileSync(globalErrorFile, '(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[706],{},function(e){}]);\n');
  }

  // Link hashed production chunks to unhashed names
  try {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      if (file.includes('-') && file.endsWith('.js')) {
        const parts = file.split('-');
        const baseName = parts.slice(0, -1).join('-') + '.js';
        const target = path.join(dir, baseName);
        if (fs.existsSync(target)) {
          fs.unlinkSync(target);
        }
        fs.symlinkSync(file, target);
      }
    }
  } catch (e) {
    // ignore
  }
}

// 2. Server-side chunks aliasing (.next/server/chunks -> .next/server and .next/server/app)
const serverChunkSources = [
  { src: '.next/server/chunks', targets: ['.next/server', '.next/server/app'] },
  { src: '.next/standalone/.next/server/chunks', targets: ['.next/standalone/.next/server', '.next/standalone/.next/server/app'] }
];

for (const { src, targets } of serverChunkSources) {
  if (!fs.existsSync(src)) continue;
  try {
    const chunkFiles = fs.readdirSync(src).filter(f => f.endsWith('.js'));
    for (const targetDir of targets) {
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      for (const chunk of chunkFiles) {
        const srcFile = path.resolve(src, chunk);
        const destFile = path.resolve(targetDir, chunk);
        if (!fs.existsSync(destFile)) {
          try {
            fs.symlinkSync(srcFile, destFile);
          } catch {
            try {
              fs.copyFileSync(srcFile, destFile);
            } catch {
              // ignore
            }
          }
        }
      }
    }
  } catch (e) {
    // ignore
  }
}
