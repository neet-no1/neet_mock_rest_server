const fs = require('fs');
const path = require('path');

// ルートパスを設定
const root = path.resolve('./mock/', 'api');

const filenames = fs.readdirSync(root)

filenames.forEach(file => {

    const api = fs.readdirSync(root).reduce((api, file) => {
        const endpoint = path.basename(file, path.extname(file));
        api[endpoint] = JSON.parse(fs.readFileSync(root + '/' + file, 'utf-8'));
  
          return api;
    }, {});

    fs.writeFile(root + '/../mock.json', JSON.stringify(api), function(err) {
        if (err) throw err;
    }); 
})
console.log('mock file updated.');