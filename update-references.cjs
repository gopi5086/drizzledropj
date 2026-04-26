const fs = require('fs');
const path = require('path');

const directory = path.join(__dirname, 'src');

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

const files = getAllFiles(directory);
const codeExtensions = ['.tsx', '.ts', '.css', '.scss'];

files.forEach(file => {
  const ext = path.extname(file);
  if (codeExtensions.includes(ext)) {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;
    
    // Replace .jpg, .jpeg, .png with .webp if they are in an import or source path
    const newContent = content.replace(/\.(jpg|jpeg|png|JPG|JPEG|PNG)(["'])/g, (match, p1, p2) => {
      changed = true;
      return '.webp' + p2;
    });

    if (changed) {
      fs.writeFileSync(file, newContent, 'utf8');
      console.log(`Updated references in: ${file}`);
    }
  }
});
