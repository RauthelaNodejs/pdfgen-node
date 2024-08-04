const express = require('express');
const {dbConnection} =require('./config/dbConfig');
const {userRoute} = require('./routes/userRoute');
const {pdfRoute} = require('./routes/pdfRoute');
const {basicAuthentication}= require('./middleware/authnticate')
const swaggerUi = require('swagger-ui-express')
require('dotenv').config();

const app = express();

dbConnection(); // here we connect database 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//here we use swaager for api testing
const swaggerDoc = require("./public/swagger.json");
app.use("/api/v1", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

//here we use basicauth
app.use(basicAuthentication);

//here we use route
app.use('/user',userRoute);
app.use('/product',pdfRoute)

const port =  process.env.PORT || 3000


app.listen(port, ()=>{
    console.log(`server is up at ${port}`)
})

