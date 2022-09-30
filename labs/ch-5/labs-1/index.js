const express = require("express");
const { boat } = require("./model");

const PORT = process.env.PORT || 3000;

const app = express();

app.get("/boat/:id", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const { id } = req.params;

  if (isNaN(id) || id > 999) return res.sendStatus(500);

  boat.read(id, (error, response) => {
    if (!response) return res.sendStatus(404);

    if (error) return res.sendStatus(500);

    res.status(200).send(response);
  });
});

app.listen(PORT, () => {
  console.log(`Application is listening on port ${PORT}...`);
});
