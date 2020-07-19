const express = require('express');
const app = express();
const path = require('path');
app.use(express.static(__dirname + "dist/fanfictionAngularFront"));
app.get("*", (req, res) => {
  res.sendFile(path.join(dirname+'/dist/fanFictionAngularFront/index.html'));
});
app.listen(process.env.PORT || 8080)


