const express = require("express");
const axios = require("axios");

const { PORT } = process.env;

const app = express();

app.get("/", (req, res) => {
  const { url } = req.query;

  if (!url) return res.sendStatus(400);

  axios(url, { method: "GET" })
    .then((response) => {
      res.header(response.headers);
      res.status(response.status);
      res.send(response.data);
      return;
    })
    .catch((error) => {
      if (error.response?.status) return res.sendStatus(error.response.status);
      if (error.status) return res.sendStatus(error.status);
      return res.sendStatus(404);
    });
});

app.listen(PORT, () => {
  console.log(`Application is listening on port ${PORT}...`);
});
