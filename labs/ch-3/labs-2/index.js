const express = require("express");

const PORT = 3000;

const app = express();

app.get("/", (_req, res) => {
  res.send("OK");
});

app.post("/", (_req, res) => {
  res.sendStatus(405);
});

app.listen(PORT, () => {
  console.log(`Application is listening on port ${PORT}...`);
});
