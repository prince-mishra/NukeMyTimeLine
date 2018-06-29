var url = "https://scontent.fjai1-1.fna.fbcdn.net/v/t31.0-8/20819333_10212863435796483_5908761603012322186_o.jpg?oh=32e99aeea60dee9130943809d3df23b7&oe=5A20D426";

var Tesseract = require('tesseract.js')
var request = require('request')
var fs = require('fs')
var filename = 'pic.png'
 
var writeFile = fs.createWriteStream(filename)
 
request(url).pipe(writeFile).on('close', function() {
  console.log(url, 'saved to', filename)
  Tesseract.recognize(filename)
    .progress(function  (p) { console.log('progress', p)  })
    .catch(err => console.error(err))
    .then(function (result) {
      console.log(result.text)
      process.exit(0)
    })
});
