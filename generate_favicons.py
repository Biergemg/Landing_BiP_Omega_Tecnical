from PIL import Image
import os

# Path to the logo
logo_path = r"c:\Users\Bierge Ponce\Desktop\PROYECTO INDEPENDIENTE\SITIO WEB BIP OMEGA\public\logo.png"
output_dir = r"c:\Users\Bierge Ponce\Desktop\PROYECTO INDEPENDIENTE\SITIO WEB BIP OMEGA\public"

# Open the logo
logo = Image.open(logo_path)

# Convert to RGBA if not already
if logo.mode != 'RGBA':
    logo = logo.convert('RGBA')

# Generate different sizes
sizes = {
    'favicon-16x16.png': (16, 16),
    'favicon-32x32.png': (32, 32),
    'apple-touch-icon.png': (180, 180),
    'favicon.ico': (32, 32)  # ICO will be created separately
}

for filename, size in sizes.items():
    resized = logo.resize(size, Image.Resampling.LANCZOS)
    output_path = os.path.join(output_dir, filename)
    
    if filename.endswith('.ico'):
        # Save as ICO
        resized.save(output_path, format='ICO')
    else:
        # Save as PNG
        resized.save(output_path, format='PNG', optimize=True)
    
    print(f"Created: {filename}")

print("All favicon files generated successfully!")
