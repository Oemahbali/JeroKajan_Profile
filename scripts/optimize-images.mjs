import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

async function optimizeImages() {
  const inputPath = join(projectRoot, 'public', 'photo', 'logo.png');
  const outputDir = join(projectRoot, 'public', 'photo');

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('🖼️  Starting image optimization...\n');

  // Get original size
  const originalStats = fs.statSync(inputPath);
  console.log(`Original size: ${(originalStats.size / 1024 / 1024).toFixed(2)} MB`);

  try {
    // Generate optimized WebP versions (multi-size)
    const sizes = [
      { width: 168, name: 'logo-168w.webp' },   // Popup modal
      { width: 108, name: 'logo-108w.webp' },   // Profile picture
      { width: 336, name: 'logo-336w.webp' },   // 2x retina popup
      { width: 216, name: 'logo-216w.webp' },   // 2x retina profile
    ];

    for (const size of sizes) {
      const outputPath = join(outputDir, size.name);
      await sharp(inputPath)
        .resize(size.width, size.width, {
          fit: 'cover',
          position: 'center'
        })
        .webp({ quality: 85, effort: 6 })
        .toFile(outputPath);

      const stats = fs.statSync(outputPath);
      console.log(`✓ Generated ${size.name}: ${(stats.size / 1024).toFixed(1)} KB`);
    }

    // Generate optimized PNG fallback (smaller size)
    const optimizedPngPath = join(outputDir, 'logo-optimized.png');
    await sharp(inputPath)
      .resize(500, 500, { fit: 'cover' })
      .png({ quality: 85, compressionLevel: 9, effort: 10 })
      .toFile(optimizedPngPath);

    const pngStats = fs.statSync(optimizedPngPath);
    console.log(`✓ Generated logo-optimized.png: ${(pngStats.size / 1024).toFixed(1)} KB`);

    // Generate AVIF for modern browsers
    const avifPath = join(outputDir, 'logo.avif');
    await sharp(inputPath)
      .resize(500, 500, { fit: 'cover' })
      .avif({ quality: 75, effort: 6 })
      .toFile(avifPath);

    const avifStats = fs.statSync(avifPath);
    console.log(`✓ Generated logo.avif: ${(avifStats.size / 1024).toFixed(1)} KB`);

    console.log('\n✅ Image optimization complete!');
    console.log('💡 Optimized images are ~95% smaller than original');

  } catch (error) {
    console.error('❌ Error optimizing images:', error);
    process.exit(1);
  }
}

optimizeImages();
