require('dotenv').config() 

const express = require('express')
const app = express()

const path = require('path')
//const userRouter = require('./controllers/usuario')
//const tareaRouter = require('./controllers/actividad')


//const port= process.env.PORT ||3000


//conexion mongoDB
//const mongoose = require('mongoose')
//const tarea = require('./models/actividades')


//mongoose y mongodb comparte la conexion a mongo, por eso la documentacion, solo que la de mongoose es mas agradable
//y mejor explicada
//try{
  //  mongoose.connect(process.env.MONGO_URL)
   // console.log('estas conectado a la BD')
//}catch(error){
  //  console.log(error)
//}



//crear rutas de front end localhost
app.use('/',express.static(path.resolve('views','home')))
app.use('/tareas',express.static(path.resolve('views','tareas')))

//OJO aqui es muy importante/ esto es obligatorio para todo ya que el backend solo lee json

app.use(express.json())


//crear rutas de back end
//app.use('/api/users',userRouter)
//app.use('/api/tareas',tareaRouter)



module.exports = app