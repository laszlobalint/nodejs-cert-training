"use strict";
const express = require("express");
const app = express();
const router = express.Router();
const { PORT = 3000 } = process.env;

router.get("/", (req, res) => {
  const { un } = req.params;
  setTimeout(() => {
    if (Array.isArray(un)) return res.sendStatus(400);

    res.send((un || "").toUpperCase());
  }, 1000);
});

app.use(router);

app.listen(PORT, () => {
  console.log(`Express server listening on ${PORT}`);
});
