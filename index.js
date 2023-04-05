const express = require('express');
const bodyParser = require('body-parser')
const path = require('path')
const loginRouter = require('./routes/login.js')
const homeRouter = require('./routes/home.js');
const dirname = require('./utls/path.js');


const app = express();
const port = 3000;

app.use(express.static(path.join(dirname,"public")))
app.use(bodyParser.urlencoded({extended: false}));
app.use('/login',loginRouter);
app.use('/',homeRouter)
app.use((req,res)=>{
  res.status(404).sendFile(path.join(dirname,"view","404.html"))
})
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
