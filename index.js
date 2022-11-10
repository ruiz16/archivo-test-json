const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();

app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));

app.get("/", function (req, res) {
  res.send("Saludos desde express");
});

app.post("/api/:name", function (req, res) {
  try {
    let data = JSON.stringify(req.body, null, 2);
    fs.writeFileSync(`${req.params.name}_${new Date().getTime()}.json`, data);
    res.json({ code: 200, StatusCode: 200 });
  } catch (error) {
    console.error("error " + error);
    res.status(400).send({ error: 'Timeout. Please try again' })
  }
});

app.listen(5000, () => {
  console.log("El servidor está inicializado en el puerto 5000");
});
