const fs = require('fs');
const path = require('path');

const walkSync = function(dir, filelist) {
  const files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      filelist = walkSync(path.join(dir, file), filelist);
    }
    else {
      if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css')) {
        filelist.push(path.join(dir, file));
      }
    }
  });
  return filelist;
};

const targetDir = path.join(__dirname, 'app');
const files = walkSync(targetDir);

const colorMap = {
  // Hex Colors
  '#00578a': '#116e41',  // Primary BGH Blue -> Rich MOPH Green
  '#003d63': '#0b4d2d',  // Hover Dark Blue -> Darker Green
  '#0f2e60': '#0d5934',  // Dark UI Blue -> Dark UI Green
  '#0a1e40': '#094025',  // Footer Main Blue -> Footer Main Green
  '#06142e': '#062917',  // Footer Darker Blue -> Footer Darker Green
  
  // Tailwind Text Colors
  'text-blue-50': 'text-green-50',
  'text-blue-100': 'text-green-100',
  'text-blue-200': 'text-green-200',
  'text-blue-500': 'text-green-500',
  'text-blue-600': 'text-green-600',
  'text-blue-700': 'text-green-700',
  'text-blue-900': 'text-green-900',
  
  // Tailwind BG Colors
  'bg-blue-50': 'bg-green-50',
  'bg-blue-100': 'bg-green-100',
  'bg-blue-500': 'bg-green-500',
  'bg-blue-600': 'bg-green-600',
  'bg-blue-700': 'bg-green-700',
  'bg-blue-900': 'bg-green-900',
  
  // Tailwind Border Colors
  'border-blue-100': 'border-green-100',
  'border-blue-500': 'border-green-500',
  'border-blue-600': 'border-green-600',
  
  // Tailwind Rings
  'focus:ring-[#00578a]': 'focus:ring-[#116e41]',
  
  // Tailwind Hover
  'hover:text-blue-200': 'hover:text-green-200',
  'hover:text-blue-600': 'hover:text-green-600',
  'hover:text-blue-700': 'hover:text-green-700',
  'hover:bg-blue-500': 'hover:bg-green-500',
  'hover:bg-blue-600': 'hover:bg-green-600',
  
  // Shadows
  'shadow-blue-900': 'shadow-green-900',
  'rgba(0,87,138': 'rgba(17,110,65' // Corresponding RGB shadow for #00578a -> #116e41
};

let totalReplacements = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  for (const [oldC, newC] of Object.entries(colorMap)) {
    content = content.split(oldC).join(newC);
  }
  
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated: ' + file);
    totalReplacements++;
  }
});

console.log(`Success: Swapped blue to green in ${totalReplacements} files.`);
