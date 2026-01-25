const http = require("http");
const url = require("url");
const path = require("path");
const initDatabase = require("./models/database");
const contactRoutes = require("./routes/contact");
const menuRoutes = require("./routes/menu");
const ordersRoutes = require("./routes/orders");

const PORT = 7880;

initDatabase();

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Content-Type", "application/json");

  if (method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  let body = "";
  if (method === "POST" || method === "PUT") {
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      handleRoutes(pathname, method, body, res);
    });
  } else {
    handleRoutes(pathname, method, body, res);
  }
});

function handleRoutes(pathname, method, body, res) {
  // Contact endpoints
  if (pathname === "/api/contact" && method === "POST") {
    return contactRoutes.submitContact(body, res);
  }

  // Menu endpoints
  if (pathname === "/api/menu" && method === "GET") {
    return menuRoutes.getMenu(res);
  }

  // Orders endpoints
  if (pathname === "/api/orders" && method === "POST") {
    return ordersRoutes.submitOrder(body, res);
  }
  if (pathname === "/api/orders" && method === "GET") {
    return ordersRoutes.getOrders(res);
  }

  res.writeHead(404);
  res.end(JSON.stringify({ error: "Not found" }));
}

server.listen(PORT, () => {
  console.log(`\n✓ Server running at http://localhost:${PORT}`);
  console.log(`✓ Frontend should call: http://localhost:${PORT}/api/...\n`);
});
