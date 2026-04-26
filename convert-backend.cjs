const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

function getAllFiles(dirPath, arrayOfFiles) {
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

const directory = path.join(__dirname, 'server', 'uploads');
if (fs.existsSync(directory)) {
  const files = getAllFiles(directory);
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG'];

  files.forEach(file => {
    const ext = path.extname(file);
    if (imageExtensions.includes(ext)) {
      const output = file.replace(ext, '.webp');
      sharp(file)
        .webp({ quality: 80 })
        .toFile(output)
        .then(() => {
          console.log(`Converted backend image: ${file} -> ${output}`);
          // Delete original to save space if needed, but safer to keep for now
        })
        .catch(err => console.error(`Error converting ${file}:`, err));
    }
  });
}
