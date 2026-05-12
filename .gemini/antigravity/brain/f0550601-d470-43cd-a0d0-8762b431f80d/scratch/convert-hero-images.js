import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const images = [
  'src/assets/CHennai_Front_Page_Website-3-001/CHennai_Front_Page_Website/Building_outer_002.jpg',
  'src/assets/CHennai_Front_Page_Website-3-001/CHennai_Front_Page_Website/_SPY0060.JPG',
  'src/assets/CHennai_Front_Page_Website-3-001/CHennai_Front_Page_Website/_SPY0055.JPG',
  'src/assets/CHennai_Front_Page_Website-3-001/CHennai_Front_Page_Website/Corridor_11.jpg',
  'src/assets/CHennai_Front_Page_Website-3-001/CHennai_Front_Page_Website/_SPY0127.JPG',
  'src/assets/CHennai_Front_Page_Website-3-001/CHennai_Front_Page_Website/IMG_20240815_184010_HDR.jpg',
  'src/assets/OOTY_FRONT_Page_Website-3-001/OOTY_FRONT_Page_Website/IMG_20251218_071327.jpg',
  'src/assets/OOTY_FRONT_Page_Website-3-001/OOTY_FRONT_Page_Website/DSC_0108.JPG',
  'src/assets/OOTY_FRONT_Page_Website-3-001/OOTY_FRONT_Page_Website/IMG20260421203017.jpg',
  'src/assets/OOTY_FRONT_Page_Website-3-001/OOTY_FRONT_Page_Website/IMG20260421192113.jpg',
  'src/assets/OOTY_FRONT_Page_Website-3-001/OOTY_FRONT_Page_Website/IMG20260421203836.jpg'
];

async function convert() {
  for (const imgPath of images) {
    const absolutePath = path.resolve(process.cwd(), imgPath);
    if (fs.existsSync(absolutePath)) {
      const outputPath = absolutePath.replace(/\.(jpg|JPG)$/, '.webp');
      console.log(`Converting ${imgPath} to webp...`);
      await sharp(absolutePath)
        .webp({ quality: 80 })
        .toFile(outputPath);
      console.log(`Done: ${outputPath}`);
    } else {
      console.warn(`File not found: ${absolutePath}`);
    }
  }
}

convert().catch(console.error);
