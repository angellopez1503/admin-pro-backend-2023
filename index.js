const express = require('express')
require('dotenv').config()
const cors = require('cors')
const { dbConnection } = require('./database/config')

const app = express()

app.use(cors())


//Carpeta publica
app.use(express.static('public'))

//Lectura y parseo del body

app.use(express.json())

dbConnection()


//Rutas

app.use('/api/usuarios',require('./routes/usuarios'))
app.use('/api/hospitales',require('./routes/hospitales'))
app.use('/api/medicos',require('./routes/medicos'))
app.use('/api/todo',require('./routes/busquedas'))
app.use('/api/upload',require('./routes/uploads'))
app.use('/api/login',require('./routes/auth'))


app.listen(process.env.PORT,()=>{
    console.log('Servidor corriendo en puerto '+process.env.PORT);
})
