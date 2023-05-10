const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const readl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

readl.question('Enter a port number: ', (port) => {
  console.log('Starting server');
  const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;
    if (filePath == './') {
      filePath = './index.html';
    }

    const extname = path.extname(filePath);
    let contentType = 'text/html';
    switch (extname) {
      case '.js':
        contentType = 'text/javascript';
        break;
      case '.css':
        contentType = 'text/css';
        break;
    }

    if (req.url === '/api') {
      const apiUrl = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcodedate';
      https.get(apiUrl, (apiRes) => {
        
        let data = '';
        apiRes.on('data', (chunk) => {
          data += chunk;
        });

        apiRes.on('end', () => {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(data, 'utf-8');
        });
      }).on('error', (error) => {
        let i =0;
        while(i>3){
          let data = '';
        apiRes.on('data', (chunk) => {
          data += chunk;
        });

        apiRes.on('end', () => {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(data, 'utf-8');
        });
        i++
        }
      });

    } else {
      fs.readFile(filePath, (err, content) => {
        if (err) {
          if (err.code == 'ENOENT') {
            res.writeHead(404);
            res.end('File not found');
          } else {
            res.writeHead(500);
            res.end('Sorry, check with the site admin for error: ' + err.code);
          }
        } else {
          res.writeHead(200, { 'Content-Type': contentType });
          res.end(content, 'utf-8');
        }
      });
    }
  });

  server.listen(port, () => {
    console.log(`Your server: http://localhost:${port}/`);
    readl.close();
  });
});


