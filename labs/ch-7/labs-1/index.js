const express = require("express");
const axios = require("axios");

const { PORT, BOAT_SERVICE_PORT, BRAND_SERVICE_PORT } = process.env;

const app = express();

app.get("/:id", async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  const { id } = req.params;

  if (isNaN(id) || id > 999) return res.sendStatus(400);

  try {
    const boatServiceResponse = await axios(
      `http://localhost:${BOAT_SERVICE_PORT}/${+id}`,
      { method: "GET" }
    );

    const brandServiceResponse = await axios(
      `http://localhost:${BRAND_SERVICE_PORT}/${+boatServiceResponse.data
        .brand}`,
      { method: "GET" }
    );

    return res.send({
      id: +id,
      color: boatServiceResponse.data.color,
      brand: brandServiceResponse.data.name,
    });
  } catch (error) {
    if (error.code === "ERR_BAD_REQUEST") return res.sendStatus(404);
    return res.sendStatus(500);
  }
});

app.listen(PORT, () => {
  console.log(`Application is listening on port ${PORT}...`);
});
