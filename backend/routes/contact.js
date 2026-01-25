const db = require("../models/database");

function submitContact(body, res) {
  try {
    const data = JSON.parse(body);
    const { name, email, message } = data;

    if (!name || !email || !message) {
      res.writeHead(400);
      return res.end(JSON.stringify({ error: "Missing required fields" }));
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.writeHead(400);
      return res.end(JSON.stringify({ error: "Invalid email address" }));
    }

    db.db.run(
      "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)",
      [name, email, message],
      function (err) {
        if (err) {
          console.error("Contact insert error:", err);
          res.writeHead(500);
          return res.end(JSON.stringify({ error: "Failed to save contact" }));
        }

        console.log(`✓ Contact #${this.lastID} from ${name}`);

        res.writeHead(200);
        res.end(
          JSON.stringify({
            success: true,
            message: "Message saved successfully!",
            id: this.lastID,
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

module.exports = { submitContact };
