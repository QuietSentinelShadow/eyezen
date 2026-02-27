#!/bin/bash
# Generate PWA icons for EyeZen
# Run this script after adding a base icon.svg file

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
  echo "Installing ImageMagick for icon generation..."
  brew install imagemagick 2>/dev/null || echo "Please install ImageMagick: brew install imagemagick"
  exit 1
fi

cd ~/projects/eyezen/public/icons

# Create icon directory if it doesn't exist
mkdir -p icons

# Generate icons from base SVG (create if not exists)
if [ ! -f "icon-base.svg" ]; then
  echo "Creating base icon..."
  cat > icon-base.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea"/>
      <stop offset="100%" style="stop-color:#764ba2"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="100" fill="url(#bg)"/>
  <circle cx="256" cy="256" r="120" fill="none" stroke="white" stroke-width="20"/>
  <circle cx="256" cy="256" r="60" fill="white"/>
  <circle cx="256" cy="256" r="30" fill="#667eea"/>
</svg>
EOF
fi

# Generate all required sizes
sizes=(72 96 128 144 152 192 384 512)
for size in "${sizes[@]}"; do
  echo "Generating ${size}x${size}..."
  convert -background none icon-base.svg -resize ${size}x${size} icon-${size}.png
done

# Generate maskable icon (larger safe area)
convert -background none -gravity center -extent 512x512 icon-base.svg -resize 384x384 icon-maskable-512.png

# Generate notification badge
convert -background none icon-base.svg -resize 72x72 badge-72.png

# Generate Apple touch icon
convert -background none icon-base.svg -resize 180x180 apple-touch-icon.png

echo "Icons generated successfully!"
ls -la
