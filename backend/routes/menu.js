function getMenu(res) {
  res.writeHead(200);
  res.end(
    JSON.stringify({
      success: true,
      message: "Menu endpoint is ready",
      note: "Menu items are currently managed on frontend",
    }),
  );
}

module.exports = { getMenu };
