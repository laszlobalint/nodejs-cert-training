const express = require("express");
const data = require("./data");

const PORT = 3000;

const app = express();

app.get("/", (_req, res) => {
  data().then((data) => {
    res.send(data);
  });
});

app.listen(PORT, () => {
  console.log(`Application is listening on port ${PORT}...`);
});
