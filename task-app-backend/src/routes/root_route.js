const { Router } = require("express");

const root_router = Router();

root_router.get("/", (request, response) => {
  const date = new Date().toISOString().substring(0, 10);
  response.json({ info: "Node.js, Express, and Postgres API", date: date });
});

module.exports = root_router;
