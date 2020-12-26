const functions = require('firebase-functions');
var admin = require("firebase-admin");

var serviceAccount = require("./permission.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

var sslRootCAs = require('ssl-root-cas/latest')
sslRootCAs.inject()

const request = require('request');

const express = require('express');
const app = express();
const db = admin.firestore();

const cors = require('cors');
app.use(cors({origin:true}))

//Route
app.get('/hello-world', (req,res) =>{
    return res.status(200).send("hello world!");
})

app.get('/products', (req,res) =>{
    (  async()=>{
        try{
            request({
                "rejectUnauthorized": false,
                "url": "https://localhost:44355/product/list",
                "method": "GET",
                
            }, function(err, response, body){
                //console.log(err);
                //console.log(response);
                console.log(body);
                return res.status(201).send(body)
            });
        }
        catch(error){
            return res.status(500).send(error)
        }
    })();
});
   
    
app.post('/rate', (req,res) =>{
    (async()=>{
        try{
            const ratingRef = db.collection('rating');
            const snapshot = await ratingRef.where('productID', '==', req.body.productID)
            .where('raterID', '==', req.body.raterID)
            .get();
            if (snapshot.empty) {
                  console.log('No matching documents.');
                  await ratingRef.add(
                    {
                        productID:req.body.productID,
                        rating:req.body.rating,
                        raterID:req.body.raterID 
                    }
                )     
            } 
            else {
                let id ='' ;
                snapshot.forEach(doc => {
                id = doc.id;
                console.log(id)
                });
                await ratingRef.doc(id)
                    .update(
                    {
                        rating:req.body.rating,  
                    }
                )                  
            } 
            const ratingdata = await ratingRef.where('productID', '==', req.body.productID)
            .get();
            var total_rating = 0;
            var avg_rating = 0;
            var productID = req.body.productID;
            ratingdata.forEach(doc => {
            console.log(doc.data().rating);
                total_rating = total_rating+doc.data().rating;
            });
            avg_rating = total_rating/ratingdata.size;
            //console.log(avg_rating);

            let response = [];
            const rating={
                productID:productID,
                numberOfRaters: ratingdata.size,
                avg_rating: avg_rating
            }
            response.push(rating)

            
            return res.status(201).send(response)     

        }
        catch(error){
            return res.status(500).send(error)
        }
    })();
});




app.get('/ratinginfo', (req,res) =>{
    (async()=>{
        try{
            const ratingRef =  db.collection('rating').doc(4)
            let response =[] ;
            await ratingRef.get().then(querySnapshot =>{
                let docs=querySnapshot.docs;
                for(let doc of docs){
                    const ratingList={
                        productid:doc.data().productID,
                        rating:doc.data().rating,
                    }
                    response.push(ratingList)
                }
                return response;
            }) 
            return res.status(201).send(response)

        }
        catch(error){
            return res.status(500).send(error)
        }
    })();
});


exports.app = functions.https.onRequest(app);