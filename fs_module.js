const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'hare.txt'); // Absolute path to hare.txt in the current directory
console.log(__dirname);

const b = fs.writeFileSync(filePath, "i am basically a text file");
console.log(b);

console.log("Finished file writing");