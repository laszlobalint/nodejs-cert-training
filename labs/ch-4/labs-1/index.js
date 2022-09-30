const express = require("express");

const PORT = 3000;

const app = express();

app.set("views", "./views");
app.set("view engine", "hbs");

app.get("/me", (_req, res) => {
  res.status(200).render("layout");
});

app.listen(PORT, () => {
  console.log(`Application is listening on port ${PORT}...`);
});
