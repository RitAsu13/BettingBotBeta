const express = require('express')
const app = express()

require ('./src/betting-bot.js')
 
app.get('/', function (req, res) {
  res.writehead(200, {'content-type' :'text/javascript' }) 
})
 
app.listen(3000) 