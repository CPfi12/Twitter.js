const nunjucks = require('nunjucks');
const express = require('express');
const app = express();
const routes = require('./routes');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true })); //for HTML form submits
app.use(bodyParser.json());

app.use('/', routes);

app.engine('html', nunjucks.render)
//maps nunjucks to html, when giving html files to res.render, tell it to use nunjucks
app.set('view engine', 'html')
//have res.render work with html files
nunjucks.configure('views', { noCache: true })
// point nunjucks to the proper directory for templates

app.use(express.static('public'));

app.use('*', function (req, res, next) {
	res.on("finish", function () {
		console.log(req.method + " " + req.originalUrl + " " + res.statusCode);
	});
	next();
});

app.use('/special/*', function (req, res, next) {
	console.log("you reached the special area.");
	console.log('edit! 2');
	next();
});


// const people = [{name : 'Kaisin'}, {name : 'Claire'}, {name : 'Dan'}];

// app.get('/', function (req, res) {
// 	res.render('index.html', {title : "Grace Hopper", people: people})
// });

var server = app.listen(3000, function () {
	console.log('Running server!:)');
})