const fs = require('fs');

const content = fs.readFileSync('D:/WORK/Aimy/wetransfer_aimy-server-backup-files_2026-06-14_1923/db_extracted/aimy_db.sql', 'utf8');

// Find the line that starts with INSERT INTO `wp_posts`
const lines = content.split('\n');
let output = '';

for (const line of lines) {
  if (line.includes('INSERT INTO `wp_posts`')) {
    // The line has a lot of data. Let's just regex match all string literals containing 'About'
    const pages = line.match(/\(.*?'about'.*?\)/gi);
    if (pages) {
      pages.forEach(p => {
        if(p.toLowerCase().includes('mission') || p.toLowerCase().includes('vision')) {
            output += p + '\n\n';
        }
      })
    }
  }
}

fs.writeFileSync('D:/WORK/Aimy/wetransfer_aimy-server-backup-files_2026-06-14_1923/aimy-nextjs/about-us-extract.txt', output);
console.log('Done 2!');
