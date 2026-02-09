#!/bin/bash

echo "==========================================="
echo "💾 DISK USAGE (General)"
echo "==========================================="
df -h / | sed -n '1p;2p'

echo ""
echo "==========================================="
echo "🐳 DOCKER USAGE"
echo "==========================================="
docker system df

echo ""
echo "==========================================="
echo "🧠 MEMORY USAGE"
echo "==========================================="
free -h

echo ""
echo "==========================================="
echo "📂 LARGEST DIRECTORIES (Top 5)"
echo "==========================================="
sudo du -ah /var/lib/docker 2>/dev/null | sort -rh | head -n 5
