#!/bin/bash

echo "⚠️  WARNING: This will delete ALL Docker containers, images, and volumes on this server."
read -p "Are you sure? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo "❌ Cleanup cancelled."
    exit 1
fi

echo "🛑 Stopping all containers..."
docker stop $(docker ps -aq) 2>/dev/null

echo "🧹 Removing containers..."
docker rm $(docker ps -aq) 2>/dev/null

echo "🗑️  Pruning system (Volumes, Networks, Images)..."
docker system prune -a --volumes -f

echo "✨ EC2 Docker environment is clean!"
docker ps -a
