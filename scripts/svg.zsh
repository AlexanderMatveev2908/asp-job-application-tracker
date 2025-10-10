ngcv() {

  if [[ $(basename "$PWD") == "client" ]]; then
    local base_dir="$PWD"
  else
    local base_dir="$(pwd)/apps/client"
  fi

  local input_dir="$base_dir/src/core/svgs"
  local output_dir="$base_dir/src/common/components/svgs"

  (
    cd "$base_dir/svg_ng_cli" || { echo "❌ svg_ng_cli not found"; return 1; }

    echo "🔍 scanning for SVGs in => $input_dir"
    setopt NULL_GLOB

    for svg_file in "$input_dir"/*.svg; do
      local name=$(basename "$svg_file")

      echo "⚙️ converting $name"
      poetry run python -m svg_ng_cli "$svg_file" "$output_dir" || {
        echo "❌ failed to convert => $name"
        continue
      }
    done

    echo "🧱 all SVGs processed to => $output_dir"
  )
}
