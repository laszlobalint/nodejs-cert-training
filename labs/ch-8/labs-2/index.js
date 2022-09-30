const express = require("express");
const axios = require("axios");

const app = express();

const PORT = 3000;

app.get("/todos/:id", (req, res) => {
  const { id } = req.params;

  if (!id) return res.sendStatus(400);

  const url = `https://jsonplaceholder.typicode.com/todos/${id}`;

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
