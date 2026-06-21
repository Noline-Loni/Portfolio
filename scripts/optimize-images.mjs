// One-off image optimizer: converts every raster image under public/images to
// WebP (max 1920px wide, quality 80) and builds the social og-image from
// public/og-source.png. Run with `npm run optimize:images` after adding images.

import sharp from 'sharp'
import { readdirSync, statSync, existsSync } from 'node:fs'
import { join, extname } from 'node:path'

const RASTER = new Set(['.png', '.jpg', '.jpeg'])

function listFiles(dir) {
  const out = []
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    const s = statSync(p)
    if (s.isDirectory()) out.push(...listFiles(p))
    else if (RASTER.has(extname(name).toLowerCase())) out.push(p)
  }
  return out
}

const files = listFiles('public/images')
let converted = 0
for (const file of files) {
  const out = file.replace(/\.(png|jpe?g)$/i, '.webp')
  await sharp(file)
    .resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(out)
  converted++
}
console.log(`✓ ${converted} images → WebP (max 1920px, q80)`)

// Social share image (1200×630) from the generated source
if (existsSync('public/og-source.png')) {
  await sharp('public/og-source.png')
    .resize({ width: 1200, height: 630, fit: 'cover' })
    .jpeg({ quality: 85 })
    .toFile('public/og-image.jpg')
  console.log('✓ public/og-image.jpg (1200×630)')
}
