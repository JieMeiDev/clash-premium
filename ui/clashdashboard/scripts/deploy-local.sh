#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEPLOY_DIR="$(cd "$ROOT/.." && pwd)"

cd "$ROOT"

if command -v pnpm >/dev/null 2>&1; then
  pnpm build
else
  npm run build
fi

rsync -av --delete --exclude='clash-dashboard' "$ROOT/dist/" "$DEPLOY_DIR/"

echo "Built and synced to: $DEPLOY_DIR"
echo "Deploy to router:"
echo "  scp -O -r $DEPLOY_DIR/* root@192.168.1.1:/root/.config/clash/ui/"
