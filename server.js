var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Url = require('./app/model/url.js');
mongoose.connect('mongodb://tobee:balabak69@ds129402.mlab.com:29402/url_shortener')

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();
var longHash = "123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
function hash(){
	var new_list = "";
	for(i=0; i<5; i++){
		new_list += longHash[Math.floor((Math.random() * 58) + 1)]
	}
	return new_list
}

router.route('/url')
	.post(function(req, res){
		var url = new Url();
		url.long_url = req.body.url;
		url.shortCode = hash()
		url.save(function(err, url){
			if(err){
				resa.send(err)
			}
			res.json("Your Shorten Url: " + url.shortCode)
		})
	})

router.route('/:short_code')
	.get(function(req,res){
		Url.find()
		.where('shortCode').equals(req.params.short_code)
		.exec(function(err, url){
			if(err){
				res.send(err)
			}
			res.redirect(301, url.long_url);
		})
	})


app.use('/api', router);
app.listen(port);
console.log('Magic happens on port ' + port);