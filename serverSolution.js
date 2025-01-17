const http = require('http');

const server = http.createServer((req, res) => {
  // Simulate a delay to reproduce the bug
  setTimeout(() => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World!');
  }, 5000);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Add any custom error handling logic here
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});