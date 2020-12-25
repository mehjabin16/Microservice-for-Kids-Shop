const functions = require('firebase-functions');
const admin = require('firebase-admin');

var serviceAccount = require("./permission.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const express = require('express');
const app = express();
const db = admin.firestore();

const cors = require('cors');
app.use(cors({origin:true}))


//Route
app.get('/hello-world', (req,res) =>{
    return res.status(201).send("hello world!");
}
)

//Create
app.post('/product/add', (req,res) =>{
    (async()=>{
        try{
            await db.collection('products')
            .doc('/'+req.body.id+'/')
            .create(
                {
                    name:req.body.name,
                    category:req.body.category   
                }
            )
            return res.status(201).send()

        }
        catch(error){
            return res.status(500).send(error)
        }
    })();
});

app.get('/product/:id', (req,res) =>{
    (async()=>{
        try{
            const document =  db.collection('products').doc(req.params.id)
            let product = await document.get();
            let response = product.data()
            
            return res.status(201).send(response)

        }
        catch(error){
            return res.status(500).send(error)
        }
    })();
});


//Read

app.get('/product/list', (req,res) =>{
    (async()=>{
        try{
            let query=db.collection('products');
            let response=[];
            await query.get().then(querySnapshot =>{
                let docs=querySnapshot.docs;
                for(let doc of docs){
                    const productList={
                        id:doc.id,
                        name:doc.data().name,
                        category:doc.data().category,
                    }
                    response.push(productList)
                }
                return response;
            })

            
            return res.status(201).send(response);

        }
        catch (error){
            return res.status(500).send(error);
        }

    })();
});


exports.app = functions.https.onRequest(app);