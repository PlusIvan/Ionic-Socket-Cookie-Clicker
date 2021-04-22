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
const data = {
  cookieClicked: 0,
  usersOnline: 0
};

io.on("connection", socket => {

  data.usersOnline++;
  io.emit('click',data);

  socket.on("click", () => {
    data.cookieClicked++;
    io.emit('click',data);
  });

    socket.on('disconnect', (reason) => {
    data.usersOnline--;
    socket.leaveAll();
    io.emit('click',data);
  });

});

setInterval(() => {
  
  if(data.cookieClicked <= 0)
    return;

  data.cookieClicked--;
  io.emit('click',data);

}, 1000);

server.listen(80);