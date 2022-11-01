const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('this is root page.')
})

app.get('/login', (req, res) => {
  res.send('this is login page.')
})

app.listen(3000, () => {
  console.log('server start listening on port 3000')
})
