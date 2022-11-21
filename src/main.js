const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

(async () => {
  app.get("/", (req, res) => {
    res.send("Hello world!");
  });

  app.listen(port, () => {
    console.log(`Application is running on: ${port}`);
  });
})();
