
const express= require("express")
const path= require("path")
const app= express()
const bodyParser = require("body-parser")
var urlencodedParser = bodyParser.urlencoded({extended:true})
app.use(express.urlencoded({ extended:true}))
let PORT  = process.env.PORT || 5000
 const server= require("http").Server(app)
 const io = require("socket.io")(server)
const { v4: uuidv4 } = require('uuid');
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
function call(){
	axios.get("https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple").then((res)=>{
		let question = res.data
		return question
	})
}
let rooms={}
	function ChooseRoom() {
let roomm=uuidv4()
return roomm.slice(0,6)
}
io.use((socket, next) => {
    const username = socket.handshake.auth.username;
    if (!username) {
      return next(new Error("not connected"));
    }
    socket.username = username;
    next();
  });
 io.on("connection", socket=>{


 	socket.on("remove-room",(room)=>{
         socket.leave(room)
         delete rooms[room]
     })
     socket.on("leave-room",(room)=>{
        socket.leave(room)
    })
 	

 	



socket.on("create-game",  nameuser=>{
let room=ChooseRoom()
socket.join(room)
socket.room= room
rooms[room]=true
socket.emit("connected-succed", room)
})
socket.on("message",(message)=>{
    io.to(message.room).emit("new-meesage",message)
})
socket.on("join-game",(room)=>{
    if(rooms[room]){
        socket.join(room)
  socket.emit("connected-succed-join",room)
    }else{
     socket.emit("join-connect-error")
    }
})
socket.on("new-score",(data)=>{
    io.to(data.room).emit("update-score",data)
})
socket.on("start-game",(room)=>{
io.to(room).emit("beginTheGame")
})

})

 server.listen(PORT)