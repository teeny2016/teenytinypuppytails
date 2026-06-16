// Runs on Netlify at deploy time. Reads the CMS-managed site-content.json,
// AND automatically pulls in every photo uploaded to images/uploads/,
// so anything you upload shows up in the gallery without placing it by hand.
const fs = require('fs');
const path = require('path');

const d = JSON.parse(fs.readFileSync('site-content.json', 'utf8'));
if (!Array.isArray(d.gallery)) d.gallery = [];

// Auto-include every image uploaded through the admin panel
try {
  const dir = 'images/uploads';
  const okExt = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif'];
  const uploaded = fs.readdirSync(dir)
    .filter(f => okExt.includes(path.extname(f).toLowerCase()))
    .sort()
    .map(f => '/images/uploads/' + f);
  // newest uploads first, no duplicates, keep any manually-added ones too
  d.gallery = Array.from(new Set(uploaded.concat(d.gallery)));
} catch (e) {
  // images/uploads doesn't exist yet — that's fine
}

fs.writeFileSync('data.js', 'window.SITE_DATA = ' + JSON.stringify(d, null, 2) + ';\n');
console.log('data.js regenerated. gallery photos:', d.gallery.length);
