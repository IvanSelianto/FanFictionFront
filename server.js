const express = require('express');
const app = express();
const path = require('path');
app.use(express.static(__dirname));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});
app.listen(process.env.PORT || 8080)


