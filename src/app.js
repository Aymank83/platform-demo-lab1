const http = require("node:http");
const { version } = require("../package.json");

const PORT = Number(process.env.PORT || 8080);
const APP_NAME = "platform-demo";

function handler(req, res) {
  res.setHeader("Content-Type", "application/json");
  if (req.url === "/") {
    res.writeHead(200);
    res.end(JSON.stringify({ service: APP_NAME, message: "Hello from the platform demo!" }));
    return;
  }
  if (req.url === "/health") {
    res.writeHead(200);
    res.end(JSON.stringify({ status: "ok" }));
    return;
  }
  if (req.url === "/version") {
    res.writeHead(200);
    res.end(JSON.stringify({ service: APP_NAME, version }));
    return;
  }
  res.writeHead(404);
  res.end(JSON.stringify({ error: "not found" }));
}

function createServer() {
  return http.createServer(handler);
}

if (require.main === module) {
  createServer().listen(PORT, () => console.log(`${APP_NAME} listening on ${PORT}.`));
}

module.exports = { createServer, APP_NAME };
