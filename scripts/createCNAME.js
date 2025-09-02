const fs = require('fs');
const path = require('path');

const outPath = path.join(__dirname, '../out', 'CNAME');
fs.writeFileSync(outPath, 'autumnfarris.com');

console.log('CNAME created in out/');
