const http = require("http");
const app = http.createServer((req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8",
  });
  if (req.url === "/") {
    res.end("this is root page.");
  } else if (req.url === "/login") {
    res.end("this is login page.");
  }
});

app.listen(3001, () => {
  console.log("Running Server With http");
});

// const express = require('express')
// const app = express()

// app.get('/', (req, res) => {
//   res.send('this is root page.')
// })

// app.get('/login', (req, res) => {
//   res.send('this is login page.')
// })

// app.listen(3000, () => {
//   console.log('server start listening on port 3000')
// })
