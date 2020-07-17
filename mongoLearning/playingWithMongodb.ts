
const express = require('express')
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient
const app = express()
app.use(bodyParser());

const connectionString = "mongodb+srv://ubcsuperscraper:95Bl9LAYS29q2Xc7@course-scraper-api.vhytr.mongodb.net/course-scraper-api?retryWrites=true&w=majority";
const ObjectId = require('mongodb').ObjectID;


MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then((client: any) => {
    console.log('Connected to Database')
    const db = client.db('star-wars-quotes')
    const quotesCollection = db.collection('quotes');

    app.post('/quotes', (req: any, res: any) => {
      quotesCollection.insertOne(req.body)  
        .then((result: any) => {
          res.json(result);
        })
        .catch((error: Error) => console.error(error))
    })
    app.get('/quotes', (req: any, res: any ) => {
     quotesCollection.find().toArray()
        .then((results: any)=> {
          res.json(results);
        })
        .catch((error: any) => console.error(error))
    })

    // update multiple things
    app.put('/quotes', (req: any, res: any ) => {
      quotesCollection.findOneAndUpdate(/* ... */)
        .then((result: any) => {
          console.log(result)
        })
        .catch((error: any) => console.error(error))
    })

    // update one thing
    app.put('/quotes/:id', (req: any, res: any ) => {
      const id = req.params.id;
      
      console.log(id)
      console.log(req.body)
      quotesCollection.findOneAndUpdate({
        _id: ObjectId(id)
      }, {
        $set: {
          name: req.body.name,
          quote: req.body.quote
        }
      })
        .then((result: any) => {
          console.log(result)
          res.json(result)
        })
        .catch((error: any) => console.error(error))
    })
    
    app.delete('/quotes/:id', (req: any, res: any) => {
      const id = req.params.id; 
      quotesCollection.removeOne(
        { 
          _id: ObjectId(id) 
        },
        
      )
      .then((result : any )=> {
        console.log(result);
        res.json(result); 
      })
      .catch((error:any) => console.error(error)) 
    })
  })
    
 
  .catch((error: any) => console.error(error))

const server = app.listen(3000, () => console.log('Yo mama on port 3000!'));  