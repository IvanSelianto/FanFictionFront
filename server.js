const express = require('express');
const app = express();
const path = require('path');
app.use(express.static('fanfictionAngularFront' + "/src"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve('fanfictionAngularFront', "src", "index.html"));
});
app.listen(process.env.PORT || 8080)


