1;
const db = require("../models/database");

function submitOrder(body, res) {
  try {
    const data = JSON.parse(body);
    const {
      items,
      total,
      customerName,
      phone,
      method,
      address,
      preferredTime,
    } = data;

    if (
      !items ||
      total === undefined ||
      !customerName ||
      !phone ||
      !method ||
      !preferredTime
    ) {
      res.writeHead(400);
      return res.end(JSON.stringify({ error: "Missing required fields" }));
    }

    if (method === "delivery" && !address) {
      res.writeHead(400);
      return res.end(
        JSON.stringify({ error: "Address required for delivery" }),
      );
    }

    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length < 9) {
      res.writeHead(400);
      return res.end(JSON.stringify({ error: "Invalid phone number" }));
    }

    db.db.run(
      `INSERT INTO orders (items, total, customer_name, phone, method, address, preferred_time) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        JSON.stringify(items),
        total,
        customerName,
        phone,
        method,
        address || null,
        preferredTime,
      ],
      function (err) {
        if (err) {
          console.error("Order insert error:", err);
          res.writeHead(500);
          return res.end(JSON.stringify({ error: "Failed to save order" }));
        }

        console.log(
          `✓ Order #${this.lastID} placed by ${customerName} (${method})`,
        );

        res.writeHead(200);
        res.end(
          JSON.stringify({
            success: true,
            orderId: this.lastID,
            message: "Order placed successfully!",
          }),
        );
      },
    );
  } catch (e) {
    console.error("Parse error:", e);
    res.writeHead(400);
    res.end(JSON.stringify({ error: "Invalid JSON" }));
  }
}

function getOrders(res) {
  db.db.all(
    "SELECT * FROM orders ORDER BY created_at DESC LIMIT 50",
    (err, rows) => {
      if (err) {
        console.error("Get orders error:", err);
        res.writeHead(500);
        return res.end(JSON.stringify({ error: "Failed to fetch orders" }));
      }

      res.writeHead(200);
      res.end(
        JSON.stringify({
          success: true,
          orders: rows || [],
        }),
      );
    },
  );
}

module.exports = { submitOrder, getOrders };
