#!/usr/bin/env bash
# Installs every spec-spine producer the catalog needs into .bin/:
# .bin/spec-spine-<version> for each release, plus .bin/spec-spine as the
# release this repository itself pins (spec-spine.toml). Each engine refuses a
# corpus pinned to another release, so the exporter runs the exact one a source
# declares. Checksums are the published release sidecars (.tar.gz.sha256).
set -euo pipefail
own_version=0.32.0
case "$(uname -s)/$(uname -m)" in
  Linux/x86_64) platform=x86_64-unknown-linux-gnu
    checksum_0_31_0=739c5c35cf84e4ec95996fd728c56383bf4ccb69fe57f09bea3c439e1e850a7c
    checksum_0_32_0=548c8728e6e60d68140dcc4d121023acfdac4266d990faeef0ee4c5e518e80a3 ;;
  Darwin/arm64) platform=aarch64-apple-darwin
    checksum_0_31_0=4e2e67d178fe9b77db0c4c8e75173988b53aa8fc2d2deacc34f75ce01f34ce4a
    checksum_0_32_0=0c6cc7db31571f570762876294cd22b4a9d8602ad9754b42603ec4c5da0a3445 ;;
  *) echo 'Unsupported producer platform' >&2; exit 1 ;;
esac
scratch=.statecraft/state/tool-install
mkdir -p "$scratch" .bin
for version in 0.31.0 0.32.0; do
  checksum_var="checksum_${version//./_}"
  checksum="${!checksum_var}"
  archive="spec-spine-v${version}-${platform}.tar.gz"
  extract="$scratch/extract-$version"
  rm -rf "$extract"
  mkdir -p "$extract"
  curl --fail --location --proto '=https' --tlsv1.2 "https://github.com/statecrafting/spec-spine/releases/download/v${version}/$archive" --output "$scratch/$archive"
  printf '%s  %s\n' "$checksum" "$scratch/$archive" > "$scratch/checksums-$version"
  if command -v sha256sum >/dev/null; then sha256sum -c "$scratch/checksums-$version"; else shasum -a 256 -c "$scratch/checksums-$version"; fi
  tar -xzf "$scratch/$archive" -C "$extract"
  install -m 0755 "$extract/spec-spine" ".bin/spec-spine-$version"
  [ "$(".bin/spec-spine-$version" --version)" = "spec-spine $version" ]
done
install -m 0755 ".bin/spec-spine-$own_version" .bin/spec-spine
[ "$(.bin/spec-spine --version)" = "spec-spine $own_version" ]
