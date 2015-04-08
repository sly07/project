var express = require('express');
var app = express();
app.use('/', express.static('./html')).
    use('/images', express.static( '../images')).
    use('/lib', express.static( '../lib'));
app.get('/gettime', function (req, res) {
    console.log("in gettime route");
    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect("mongodb://localhost/project", function(err, db){
	if(err) throw err;
	db.collection("times",function(err, times){
	    if(err) throw err;
	    times.find(function(err,items){
		items.toArray(function(err, itemArr){
		    res.writeHead(200);
		    res.end(JSON.stringify(itemArr));
		});
	    });
	});
    }); 
});
app.listen(80);

