const mongoose = require('mongoose')
require('dotenv').config();
const dbUrl = process.env.DB_URL

const dbConnection = ()=>{
    mongoose.connect(dbUrl).then(()=>{
        console.log("DB Connection is successful")
    }).catch((err)=>{
        console.log("DB Connection failed due to some error")
        console.log(err)
    })
}

module.exports = dbConnection;