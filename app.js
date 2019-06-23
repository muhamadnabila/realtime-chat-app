const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const port = 3000

app.use(express.urlencoded({extended : false}))
app.use(express.json())

app.get('/',(req,res)=>{
  res.status(200).json({message : 'oke'})  
})

io.on('connection',(socket)=>{
    socket.on('sendMsg',(msg)=>{
        io.emit('sendBackMsg',msg)
    })
})

http.listen(port,() => {
  console.log(`listening on port: ${port}!`)
})