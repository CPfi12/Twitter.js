const express = require( 'express' );
const app = express();

app.use('*',function(req,res,next){
	res.on("finish", function(){
  		console.log(req.method+" "+req.originalUrl+" "+res.statusCode);
  	});
	next();
});

app.use('/special/*',function(req,res,next){
	console.log("you reached the special area.");
	console.log('edit! 2');
	next();
});

app.get('/',function(req,res){
	res.send('Welcome!');
});

var server = app.listen(3000,function(){ 
	console.log('Running server!:)');})