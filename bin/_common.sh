#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

print_missing_tools() {
  cat <<'EOF'
Missing local prerequisites for Jekyll preview.

On Ubuntu 24.04, install them with:
  sudo apt update
  sudo apt install -y ruby-full build-essential zlib1g-dev bundler nodejs npm

If the `bundle` command is still unavailable after that, run:
  gem install bundler
EOF
}

require_ruby_tools() {
  local missing=0

  for cmd in ruby bundle; do
    if ! command -v "$cmd" >/dev/null 2>&1; then
      missing=1
    fi
  done

  if [[ "$missing" -ne 0 ]]; then
    print_missing_tools
    exit 1
  fi
}

require_node_tools() {
  local missing=0

  for cmd in node npm; do
    if ! command -v "$cmd" >/dev/null 2>&1; then
      missing=1
    fi
  done

  if [[ "$missing" -ne 0 ]]; then
    print_missing_tools
    exit 1
  fi
}

require_bundle_dependencies() {
  if ! (cd "$ROOT_DIR" && bundle check >/dev/null 2>&1); then
    echo "Ruby gems are not installed. Run bin/setup first."
    exit 1
  fi
}

require_node_dependencies() {
  if [[ ! -d "$ROOT_DIR/node_modules" ]]; then
    echo "Node dependencies are not installed. Run bin/setup first."
    exit 1
  fi
}
