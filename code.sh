#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="$HOME/3b1b-web"

cd "$PROJECT_DIR" || exit 1

print_file() {
    local file="$1"

    printf '\n'
    printf '%s\n' "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    printf 'FILE: %s\n' "$file"
    printf '\n\n'

    if [[ -f "$file" ]]; then
        cat -- "$file"
    else
        printf '[FILE NOT FOUND: %s]\n' "$file"
    fi

    printf '\n\n'
}

echo "============================================================"
echo "                 PROJECT SOURCE DUMP"
echo "============================================================"
echo "Project: $PROJECT_DIR"
echo "============================================================"

while IFS= read -r -d '' file; do
    print_file "$file"
done < <(
    find . \
        \( -type d \( \
            -name dist \
            -o -name node_modules \
            -o -name public \
            -o -name .git \
        \) -prune \) \
        -o \
        \( -type f ! -iname '*.md' -print0 \) |
    sort -z
)

echo "============================================================"
echo "              END OF PROJECT SOURCE DUMP"
echo "============================================================"
