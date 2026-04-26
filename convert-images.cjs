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

const directories = [
  path.join(__dirname, 'src', 'assets'),
  path.join(__dirname, 'src', 'asset_images')
];

const imageExtensions = ['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG'];

directories.forEach(directory => {
  if (!fs.existsSync(directory)) return;
  const files = getAllFiles(directory);

  files.forEach(file => {
    const ext = path.extname(file);
    if (imageExtensions.includes(ext)) {
      const output = file.replace(ext, '.webp');
      if (!fs.existsSync(output)) {
        sharp(file)
          .webp({ quality: 80 })
          .toFile(output)
          .then(() => console.log(`Converted: ${file} -> ${output}`))
          .catch(err => console.error(`Error converting ${file}:`, err));
      } else {
        // console.log(`Skipping: ${output}`);
      }
    }
  });
});
