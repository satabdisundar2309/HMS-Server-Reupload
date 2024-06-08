const express = require('express')
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))


require('dotenv').config();
const port = process.env.PORT || 8000

const cors = require('cors')
app.use(cors());

const cookieParser = require('cookie-parser')
app.use(cookieParser());

const fileupload = require('express-fileupload')
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: "/temp/"
}))

// importing the router
const router = require('./routers/routes')
app.use('/api/v1', router);

//! importing and using the error middleware
const errorMiddleware = require('./middlewares/errorMiddleware')
app.use(errorMiddleware);

const dbConnection = require('./config/dbConnection')
dbConnection(); 
  
const cloudinaryConnection = require('./config/cloudinaryConnection')
cloudinaryConnection();

app.get('/', (req, res)=>{
    res.send("Hello HMS")
})

app.listen(port, ()=>{
    console.log(`App is listening at port ${port}`)
})

