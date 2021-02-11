var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var cors = require('cors');
var app = express();

var CONTACTS_COLLECTION = "memes";

var app = express();
app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI,{useNewUrlParser: true, useUnifiedTopology: true}, function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

app.use((req,res,next)=>{
  res.header("Access-Control-Allow-Origin","*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if(req.Method==='OPTIONS'){
    res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
})

function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
  }


  app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.Method==='OPTIONS'){
      res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
    }
    next();
  })
  app.get("/memes",function(req, res) {
    db.collection(CONTACTS_COLLECTION).find({}).toArray(function(err, docs) {
      if (err) {
        handleError(res, err.message, "Failed to get contacts.");
      } else {
        res.status(200).json(docs);
      }
    });
  });

  app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.Method==='OPTIONS'){
      res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
    }
    next();
  })
  app.post("/memes",function(req, res) {
    var newContact = req.body;
    //newContact.createDate = new Date();
  
    if (!req.body.name) {
      handleError(res, "Invalid user input", "Must provide a name.", 400);
    } else {
      db.collection(CONTACTS_COLLECTION).insertOne(newContact, function(err, doc) {
        if (err) {
          handleError(res, err.message, "Failed to create new contact.");
        } else {
          res.status(201).json({
            id:req.body.id,
          });
        }
      });
      db.collection(CONTACTS_COLLECTION).find({newContact}).toArray(function(err, docs) {
        if (err) {
          handleError(res, err.message, "Failed to get contacts.");
        } else {
          res.status(200).json(docs);
        }
      });
    }
  });
