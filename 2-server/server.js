const http = require('http');

const server = http.createServer((req, res) => {
  // Log a message to the console whenever a request comes in
  console.log('request made');
});

// args are [port number, hostname]
server.listen(3000, 'localhost', () => {
  console.log('listening for requests on port 3000');
});