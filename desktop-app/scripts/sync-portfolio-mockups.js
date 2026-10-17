'use strict';
const fs = require('fs');
const path = require('path');
const desktop = path.resolve(__dirname, '..');
const projectRoot = path.resolve(desktop, '..');
const sourceAssets = path.join(projectRoot, 'assets', 'mockups');
const targetAssets = path.join(desktop, 'assets', 'mockups');
const sourceManifest = path.join(projectRoot, 'js', 'mockups-data.js');
const targetManifest = path.join(desktop, 'js', 'mockups-data.js');

if (!fs.existsSync(sourceManifest) || !fs.existsSync(sourceAssets)) {
  console.error('Portfolio source files are missing. Expected ../js/mockups-data.js and ../assets/mockups/.');
  process.exit(1);
}
fs.mkdirSync(path.dirname(targetManifest), { recursive: true });
fs.mkdirSync(path.dirname(targetAssets), { recursive: true });
fs.copyFileSync(sourceManifest, targetManifest);
fs.cpSync(sourceAssets, targetAssets, { recursive: true });
console.log('Synced the 174 portfolio mockups for the Electron app.');
