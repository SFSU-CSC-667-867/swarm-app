const express = require('express');
const path = require('path');
const app = express();

// express is not good for production static files, use cdn, or dedicated file server like ngnix, appache
app.use(express.static(path.join(__dirname, '..', 'build')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

const port = process.env.PORT || 3000;

app.listen(port);

console.log(`Listening on port ${port}`);