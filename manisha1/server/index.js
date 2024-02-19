const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const db = require('./config/dbConnection');
const routes = require('./routes/users');

require('dotenv').config();

const app = express();
app.use(cors());
const Port = 8080;
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res)=>{
    res.send("hello node");
})


app.use('/api/user', routes);


app.listen(Port, () => {
    console.log(`Server is up and running on port ${Port}`);
})
