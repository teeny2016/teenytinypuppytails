// Runs on Netlify at deploy time. Reads the CMS-managed site-content.json
// and regenerates data.js so the website shows the latest content.
const fs=require('fs');
const d=JSON.parse(fs.readFileSync('site-content.json','utf8'));
fs.writeFileSync('data.js','window.SITE_DATA = '+JSON.stringify(d,null,2)+';\n');
console.log('data.js regenerated from site-content.json');
