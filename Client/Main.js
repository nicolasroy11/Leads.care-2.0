var express = require('express');
var app = express();

app.use(express.static('./dist'));
app.listen(4200, "0.0.0.0", null, console.log('Express running on 4200'));
