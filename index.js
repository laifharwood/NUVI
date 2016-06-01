var express = require('express')

var app = express()

var http = require('http')

app.use(express.static(__dirname + '/public'))

app.listen(process.env.PORT || 8080, function(){
  console.log('app is listening')
});
