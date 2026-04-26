const fs = require('fs');
const path = require('path');

function getAllFiles(dirPath, arrayOfFiles) {
  if (!fs.existsSync(dirPath)) return [];
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });

  return arrayOfFiles;
}

const directories = [
  path.join(__dirname, 'src', 'assets'),
  path.join(__dirname, 'src', 'asset_images'),
  path.join(__dirname, 'server', 'uploads')
];

const extensionsToDelete = ['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG'];

let deletedCount = 0;
let skippedCount = 0;

directories.forEach(directory => {
  const files = getAllFiles(directory);

  files.forEach(file => {
    const ext = path.extname(file);
    if (extensionsToDelete.includes(ext)) {
      const webpVersion = file.replace(ext, '.webp');
      
      // CRITICAL: Only delete if the WebP version exists!
      if (fs.existsSync(webpVersion)) {
        try {
          fs.unlinkSync(file);
          console.log(`Deleted: ${file}`);
          deletedCount++;
        } catch (err) {
          console.error(`Error deleting ${file}:`, err);
        }
      } else {
        console.log(`Skipping (No WebP version found): ${file}`);
        skippedCount++;
      }
    }
  });
});

console.log(`\nCleanup Complete!`);
console.log(`Total Deleted: ${deletedCount}`);
console.log(`Total Skipped: ${skippedCount}`);
