#!/usr/bin/env node
/**
 * Simple test server for local development
 * Usage: node server.js
 * Visit: http://localhost:3000
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3000;
const ROOT = __dirname;

// MIME types
const mimeTypes = {
  '.html': 'text/html; charset=UTF-8',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.css': 'text/css',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json',
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  let pathname = parsedUrl.pathname;

  // Normaliser le pathname
  if (pathname === '/') {
    pathname = '/index.html';
  }

  // Chercher le fichier
  let filePath = path.join(ROOT, pathname);

  // Sécurité: empêcher le traversal de répertoires
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden');
    return;
  }

  // Vérifier si le fichier existe
  if (!fs.existsSync(filePath)) {
    // Si c'est une route SPA et que le fichier n'existe pas, servir 404.html
    // Mais on simule le comportement GitHub Pages
    if (pathname !== '/' && !pathname.includes('.')) {
      // C'est une route SPA → servir index.html avec redirect
      res.writeHead(404, { 'Content-Type': 'text/html' });
      const notFoundPath = path.join(ROOT, '404.html');
      if (fs.existsSync(notFoundPath)) {
        res.end(fs.readFileSync(notFoundPath));
      } else {
        res.end('404 Not Found');
      }
      return;
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
    return;
  }

  // Déterminer le MIME type
  const ext = path.extname(filePath);
  const mimeType = mimeTypes[ext] || 'application/octet-stream';

  // Lire et servir le fichier
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Server Error');
      return;
    }

    res.writeHead(200, { 'Content-Type': mimeType });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`\n🚀 Serveur de test sur http://localhost:${PORT}`);
  console.log(`\n📝 URLs à tester:`);
  console.log(`  - http://localhost:${PORT}/ (accueil)`);
  console.log(`  - http://localhost:${PORT}/gamiz/ (gamiz)`);
  console.log(`  - http://localhost:${PORT}/autozen/ (autozen)`);
  console.log(`  - http://localhost:${PORT}/privacy/ (privacy)`);
  console.log(`  - http://localhost:${PORT}/terms/ (terms)`);
  console.log(`\n✅ Appuyez sur Ctrl+C pour arrêter\n`);
});
