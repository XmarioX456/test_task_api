 const express = require('express')
 const app = express()
 //routes

 app.get('/', (req, res) =>{
     res.send('Hello test api')
 })

 app.listen(3000, () => {
     console.log("api worked on port 3000")
 })