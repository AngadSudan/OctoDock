#!/bin/bash
set -euo pipefail

git clone "$GIT_URL" /home/app/project/
cd /home/app/project/

echo "Installing bun globally..."
stdbuf -oL -eL npm install --progress=true

echo "Starting Docker daemon..."
dockerd &   # run in background

echo "Waiting for Docker to be ready..."
until docker info >/dev/null 2>&1; do
  sleep 1
done

echo "✅ Docker is ready!"
docker pull node:18-alpine
echo "Starting build process..."
exec node /home/app/build.js
