const {Server} = require("socket.io");

const io = new Server(8000,{
    cors:true
});

const emailToSocketIdMap=new Map();
const socketIdToEmailMap=new Map();


io.on('connection',(socket)=>{
    console.log("socket Connnected",socket.id);
    socket.on('room:join',data=>{
        const {email,roomId} =data;
        emailToSocketIdMap.set(email,socket.id);
        socketIdToEmailMap.set(socket.id,email);
        io.to(roomId).emit("user:Joind",{email,id:socket.id})
        socket.join(roomId);
        io.to(socket.id).emit("room:join",data);
    })
})