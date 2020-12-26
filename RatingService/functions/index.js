const apisauce = require('apisauce');

const functions = require('firebase-functions');
var admin = require("firebase-admin");

var serviceAccount = require("./permission.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
 
// define the api
const api = apisauce.create({
  baseURL: 'http://localhost:51349/',
  
})


const express = require('express');
const app = express();
const db = admin.firestore();

const cors = require('cors');
app.use(cors({origin:true}))

//Route
app.get('/hello-world', (req,res) =>{
    return res.status(200).send("hello world!");
})

    
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
            //console.log(doc.data().rating);
                total_rating = total_rating+doc.data().rating;
            });
            avg_rating = total_rating/ratingdata.size;
            //console.log(avg_rating);

            const alldata = await ratingRef.get();
            //console.log(alldata.size)
            sizemod = alldata.size%5

            if(sizemod==0)
            { 
                alldata.forEach(async(item) => {
                let update = await api.post('product/updateRating', {  

                    "ProductID": productID,
                    "AverageRating": avg_rating,
                    "NumberOfRaters":  ratingdata.size               
                
                }) 
                //console.log(avg_rating)
                res.status(200).send(update)
            })}
            else{
                console.log("Not updated");
                res.status(200).send()
            }
        }
        catch(error){
            return res.status(500).send(error)
        }
    })();
});


exports.app = functions.https.onRequest(app);