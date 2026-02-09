#!/bin/bash

# 1. Pull latest changes
echo "⬇️ Pulling latest changes..."
git pull origin main

# 2. Update dependencies (optional, if using specific non-docker tools)
# npm install

# 3. Restart Docker Containers
echo "🚀 Restarting containers..."
docker compose down
docker compose up -d --build

# 4. Prune unused images (save space)
echo "🧹 Cleaning up..."
docker image prune -f

echo "✅ App Deployed Successfully!"
docker compose ps
