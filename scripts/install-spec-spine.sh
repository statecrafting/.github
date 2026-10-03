#!/usr/bin/env bash
set -euo pipefail
case "$(uname -s)/$(uname -m)" in
  Linux/x86_64) platform=x86_64-unknown-linux-gnu; checksum=2f528ac916206e34ddae7e0bd494905cf9030419fc9e3e3257e0245ce0f4b784 ;;
  Darwin/arm64) platform=aarch64-apple-darwin; checksum=84ef5f765c5e559e96c4900a35fd82c7c4172a35b17126af10d2643017721858 ;;
  *) echo 'Unsupported producer platform' >&2; exit 1 ;;
esac
archive="spec-spine-v0.28.0-${platform}.tar.gz"
scratch=.statecraft/state/tool-install
mkdir -p "$scratch" .bin
curl --fail --location --proto '=https' --tlsv1.2 "https://github.com/statecrafting/spec-spine/releases/download/v0.28.0/$archive" --output "$scratch/$archive"
printf '%s  %s\n' "$checksum" "$scratch/$archive" > "$scratch/checksums"
if command -v sha256sum >/dev/null; then sha256sum -c "$scratch/checksums"; else shasum -a 256 -c "$scratch/checksums"; fi
tar -xzf "$scratch/$archive" -C .bin
[ "$(.bin/spec-spine --version)" = 'spec-spine 0.28.0' ]
