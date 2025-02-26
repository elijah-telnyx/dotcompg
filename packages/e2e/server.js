/* eslint-disable @typescript-eslint/no-var-requires */
const http = require('http');
const fs = require('fs');

const OUTPUT_DIR = `./results/${process.env.RUNTIME_ENV}`;
const REPORT_FILE = require(`${OUTPUT_DIR}/reports/index.json`);

const metricsRegistry = require('./registerMetrics.js')(REPORT_FILE);

const requestListener = function (req, res) {
  req.on('error', (err) => {
    console.error(err);
    res.statusCode = 400;
    res.end('400: Bad Request');
    return;
  });

  res.on('error', (err) => {
    console.error(err);
    console.log(err.stack);
    res.end('');
  });

  function setAccessHeaders() {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type'
    );
  }

  if (req.method === 'OPTIONS') {
    setAccessHeaders();
    res.setHeader('Access-Control-Max-Age', 1728000);
    res.setHeader('Content-Type', 'text/plain charset=UTF-8');
    res.setHeader('Content-Length', 0);
    res.writeHead(204);
    res.end('');
  }

  if (req.url === '/health' && req.method === 'GET') {
    setAccessHeaders();
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    res.end('');
  }

  if (req.url === '/metrics' && req.method === 'GET') {
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Content-Type', metricsRegistry.contentType);

    metricsRegistry
      .metrics()
      .then((text) => {
        res.writeHead(200);
        res.end(text);
      })
      .catch((err) => {
        console.error(err);
        res.writeHead(500);
        res.end('Internal Server Error');
      });
  }

  fs.readFile(`${OUTPUT_DIR}/public/index.html`, (err, data) => {
    if (!err && req.url === '/' && req.method === 'GET') {
      setAccessHeaders();
      res.setHeader('Content-Type', 'text/html; charset=UTF-8');
      res.writeHead(200);
      res.end(data);
    } else {
      res.end('');
    }
  });
};

const server = http.createServer(requestListener);

server.listen(process.env.PORT, () => {
  console.log(`Running at ${process.env.PORT}: ${process.env.RUNTIME_ENV}`);
});
