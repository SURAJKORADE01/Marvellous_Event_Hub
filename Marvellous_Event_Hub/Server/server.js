const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const path = require('path');

const jwt = require('jsonwebtoken');

const { MongoClient } = require('mongodb');
const URL = "mongodb://localhost:27017";
const client = new MongoClient(URL);

const api = require('./routes/api');
const port = 3000;

const app = express();
app.use(cors())
app.use(express.static(path.join(__dirname, 'dist')));

app.use(express.json()); 

app.use('/api', api);

app.listen(port, function(){
    console.log("Server running on localhost:" + port);
});

async function GetConnectionNew()
{
    let result = await client.connect();
    let db = result.db("Event");
    return db.collection("Admission");
}

async function TakeAdmission(req,res)
{
    try
    {    
        console.log("Requested data : ",req.body);

        const [first,last,email,mobile,batch] = req.body;

        let collection = await GetConnectionNew();
        let result = await collection.insertOne({first,last,email,mobile,batch});
        res.json(result);
    }

    catch(error)
    {
        console.error("Error inserting data",error);
        res.status(500).send("Error inserting data.");
    }
}
app.post('/takeadmission',TakeAdmission);

async function GetConnectionOld()
{
    let result = await client.connect();
    let db = result.db("Event");
    return db.collection("Old_Student");
}

async function TakeAdmission_Old(req,res)
{
    try
    {
        console.log("Requested data : ",req.body);

        const [first,last,email,mobile,rid,batch] = req.body;

        let collection = await GetConnectionOld();
        let result = await collection.insertOne({first,last,email,mobile,rid,batch});
        res.json(result);
    }

    catch(error)
    {
        console.error("Error inserting data",error);
        res.status(500).send("Error inserting data.");    
    }
}


app.post('/oldadmission',TakeAdmission_Old);

async function GetConnectionCredential()
{
    let result = await client.connect();
    let db = result.db("Event");
    return db.collection("Login");
}

async function GetCredentials(req,res)
{
    try 
    {
        const {email,password} = req.body;
        
        let collection = await GetConnectionCredential();
        let user = await collection.findOne({email : email,password : password});

        if(user)
        {
            let payload = {subject: 1}
            let token = jwt.sign(payload, 'secretKey');
            res.status(200).send({token});
        }

        else
        {
            res.status(401).send('Invalid email or password.');
        }
    }

    catch(error)
    {
        console.error("Error verifying credentials",error);
        res.status(500).send("Error verifying credentials.");
    }
}

app.post('/credential',GetCredentials);

async function GetConnectionWithAllEvents()
{
    let result = await client.connect();
    let db = result.db("Event");
    return db.collection("Events_for_all");
}

async function GetEventDetails(req,res)
{
    let collection = await GetConnectionWithAllEvents();
    let result = await collection.find().toArray();
    res.json(result);
}

app.get('/events',GetEventDetails)

function verifyToken(req, res, next) 
{
  if(!req.headers.authorization) 
  {
    return res.status(401).send('Unauthorized request')
  }

  let token = req.headers.authorization.split(' ')[1];

  if(token === 'null') 
  {
    return res.status(401).send('Unauthorized request')    
  }

  try
  {  
    let payload = jwt.verify(token, 'secretKey')
    if(!payload) 
    {
        return res.status(401).send('Unauthorized request')    
    }
    req.userId = payload.subject
    next();
  } catch(error)
  {
    return res.status(401).send('Unauthorized request');
  }
}

async function GetConnectionWithSpecialEvents()
{
    try
    {
        let result = await client.connect();
        let db = await result.db("Event");
        return db.collection("Events_for_family_members");
    }

    catch(error)
    {
        throw new Error('Failed to connect to the database: ' + error.message);
    }
}

async function GetSpecialEventDetails(req,res)
{
    try
    {
        let collection = await GetConnectionWithSpecialEvents();
        let result = await collection.find().toArray();
        res.json(result);
    }

    catch(error)
    {
        console.error('Error fetching special event details:', error);
        res.status(500).send('Internal Server Error');
    }
}

app.get('/special',verifyToken,GetSpecialEventDetails);