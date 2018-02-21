
const express    = require('express'),
      bodyParser = require('body-parser'),
      app        = express(),
      operator   = require('./crawler_mdl.js'),
      port       = process.env.PORT || 3000;
      

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('port',port);
app.use('/', express.static('./public'));//for API
app.use(
(req,res,next) => {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers",
"Origin, X-Requested-With, Content-Type, Accept");
res.set("Content-Type", "application/json");
next();
});

app.post('/city',
  (req,res) => {      
    let succ = new Promise((resolve,reject)=>{
        if(req.body.city)
        {
            
            resolve(operator.getCity(req.body.city));
        }else{
            //the reject here handle with string 
            reject('error receiving post parameter');
        }
    });

    succ.then((fromResolve)=>{
      res.status(200).json(fromResolve);
    }).catch((fromReject)=>{
      res.status(200).json(fromReject);
    });
});
app.listen(port,
    ()=>{
        console.log(`listen to port ${port}`);
});


