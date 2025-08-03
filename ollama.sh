#!/bin/bash

# Optional: update and install curl
apt-get update && apt-get install -y curl

# Start Ollama server in the background
ollama serve &

# Wait for server to be ready
until curl -s http://localhost:11434 > /dev/null; do
  echo "Waiting for Ollama server..."
  sleep 1
done

# Pull your custom model
ollama serve

# Wait forever (so container doesn't exit)
wait
