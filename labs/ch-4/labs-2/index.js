const express = require("express");
const stream = require("./stream");

const PORT = 3000;

const app = express();

app.get("/data", (_req, res) => {
  stream().pipe(res);
});

app.listen(PORT, () => {
  console.log(`Application is listening on port ${PORT}...`);
});
