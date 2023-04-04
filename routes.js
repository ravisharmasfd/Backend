const fs = require('fs');

module.exports = (req, res) => {
  if (req.method === "GET" && req.url === "/") {
    let data =  "nothing to show";
    try {
        data = fs.readFileSync("message.txt", "utf-8");
    } catch (error) {
        
    }
    res.writeHead(200, { "Content-Type": "text/html" });
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
  }
  else if (req.method === "POST" && req.url === "/") {
    let body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      const message = Buffer.concat(body).toString().split("=")[1].split("+").join(" ");
      fs.writeFileSync("message.txt", message);
      res.writeHead(302, { Location: "/" });
      res.end();
    });
  }
  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.write("404 Not Found\n");
    res.end();
  }
};
