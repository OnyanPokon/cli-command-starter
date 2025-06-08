#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const [type, projectName] = args;

const repoMap = {
  backend: 'https://github.com/OnyanPokon/backend-starter.git',
  frontend: 'https://github.com/OnyanPokon/frontend-starter.git',
};

if (!type || !projectName) {
  console.log('❌ Penggunaan: create <backend|frontend> <nama-project>');
  process.exit(1);
}

const repoUrl = repoMap[type];

if (!repoUrl) {
  console.log(`❌ Tipe '${type}' tidak dikenali. Gunakan 'backend' atau 'frontend'.`);
  process.exit(1);
}

const tempFolder = '__temp_project_folder__';

try {
  console.log(`🔄 Cloning ${type} project dari ${repoUrl}...`);
  execSync(`git clone ${repoUrl} ${tempFolder}`, { stdio: 'inherit' });

  console.log(`🚚 Rename folder menjadi ${projectName}...`);
  fs.renameSync(tempFolder, projectName);

  console.log(`✅ Proyek '${projectName}' berhasil dibuat!`);
} catch (err) {
  console.error(`❌ Gagal membuat proyek: ${err.message}`);
  process.exit(1);
}