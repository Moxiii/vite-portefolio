#!/bin/bash

set -e  # Arrêter le script si une commande échoue

if [[ "$1" == "frontend" ]]; then
  echo "Installing dependencies"
  npm install -g npm@latest
  npm install -g esbuild@0.18.20
  npm install -g @rollup/rollup-linux-x64-gnu
  echo "Launching frontend"
  npm run dev --host 0.0.0.0
fi

if [[ "$1" == "backend" ]]; then
  echo "Starting api"
  npm install -g nodemon
  nodemon ./server.js
fi

echo "Invalid argument. Use 'frontend', or 'backend'."
exit 1
