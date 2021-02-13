const Express= require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const { request } = require("express");

const CONNECTION_URL = "mongodb+srv://sreevathsan:srivathsan1998@cluster0.fulnd.mongodb.net/memes?retryWrites=true&w=majority";
const DATABASE_NAME = "meme";

var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
	 res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
    if(req.Method==='OPTIONS'){
      res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
    }
    next();
  })

var database, collection;

app.listen(process.env.PORT|| 5000, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true,useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("memes");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});

app.post("/memes", (request, response) => {
    var contact=request.body;
    collection.insertOne(contact, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send({"id":request.body.id});
    });
});

app.get("/memes", (request, response) => {
    collection.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

app.get("/memes/:id",function(request,response){
    var query = { id:request.params.id };
    collection.find(query).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        if(result.length==0){
            response.send(404);
        }
        else{
        response.send(result);
        }
      })
    });

app.patch("/memes/:id",function(request,response){
    var query = { id:request.params.id };
    var updateObject = {$set: {"caption":request.body.caption,"url":request.body.url}};
    collection.updateOne(query,updateObject,function(err, result) {
        if (err) throw err;
        console.log(result);
        response.send(result);
      })
    })

app.delete("/memes/:id",function(request,response){
    var query = { id:request.params.id };
    //var updateObject = {$set: {"caption":request.body.caption,"url":request.body.url}};
    collection.deleteOne(query,function(err, result) {
        if (err) throw err;
        console.log(result);
        response.send(result);
      })
    })

    