const express= require('express');
const app = express();
const bodyParser =require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))
app.set("view engine", "ejs");
app.get('/submit', (req, res) => {
  res.render('form');
})
app.post('/result', (req, res) => {
  res.render('result',{text:req.body.text});
})

app.listen(9000);
