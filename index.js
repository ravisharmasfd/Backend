const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  // If the client requests the root URL with a GET request, serve an HTML page with an input box and a submit button
  if (req.method === 'GET' && req.url === '/') {
    try {
      const data = fs.readFileSync('message.txt', 'utf-8')
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`
      <html>
        <head>
          <title>Node.js Server</title>
        </head>
        <body>
          <h1>Node.js Server</h1>
          <p>Current message:</p>
          <pre>${data}</pre>
          <form method="POST" action="/">
            <label for="message">New message:</label>
            <input type="text" id="message" name="message">
            <button type="submit">Submit</button>
          </form>
        </body>
      </html>
    `);
    res.end();
    } catch (error) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(`
      <html>
        <head>
          <title>Node.js Server</title>
        </head>
        <body>
          <h1>Node.js Server</h1>
          <p>Current message:</p>
          <pre>Nothing available right now</pre>
          <form method="POST" action="/">
            <label for="message">New message:</label>
            <input type="text" id="message" name="message">
            <button type="submit">Submit</button>
          </form>
        </body>
      </html>
    `);
    res.end();
    }
    
  }
  // If the client submits a POST request to the root URL, update the message in the text file and return the updated message
  else if (req.method === 'POST' && req.url === '/') {
    let body = []
    req.on('data', chunk => {
      body.push(chunk)
    });
    req.on('end', () => {
      const message = Buffer.concat(body).toString();
      fs.writeFileSync('message.txt', message);
      res.writeHead(302, { Location: '/' });
      res.end();
    });
  }
  // If the client requests any other URL, return a 404 error
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.write('404 Not Found\n');
    res.end();
  }
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
