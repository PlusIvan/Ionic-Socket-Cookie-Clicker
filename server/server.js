const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server,{
    allowEIO3: true,
    cors:{
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true,  
    }
});

io.on("connection", socket => {


  socket.on("pingpong", () => {
    console.log("O frontend emitiu o event pinpong")
    socket.emit('pingpong', 'Ola seu boi');
  })

  socket.on('newMessage', (msg) => {
    console.log('Nova menssagem',msg)

    io.emit('newMessage',msg);
    
  })


});

server.listen(80);