
#!/usr/bin/env bash

set -u

cd ~/3b1b-web || exit 1

print_file() {
    local file="$1"

    echo
    echo "===== Printing file: $file ====="

    if [[ -f "$file" ]]; then
        cat "$file"
    else
        echo "[FILE NOT FOUND: $file]"
    fi

    echo
}

# Root configuration
print_file "vite.config.ts"

# All source files
while IFS= read -r -d '' file; do
    print_file "$file"
done < <(find src -type f -print0 | sort -z)

echo "===== Finished printing project files ======"
