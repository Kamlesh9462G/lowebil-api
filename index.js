const app = require("./app");
const PORT = 8080;
const connectDB = require("./src/db/connectDatabase");
connectDB();

const server = app.listen(PORT, () => {
  console.log(`App Listening on ${PORT}`);
});
var io = require("socket.io")(server);
app.set("socketio", io);
let Allusers = [];
io.on("connection", (socket) => {
  let authDetails = socket.handshake.auth;
  authDetails.socketId = socket.id;
  Allusers.push(authDetails);
  socket.on("receiveMessage", (chatDetails) => {
    const senderData = Allusers.find(
      (val) => val.email == chatDetails.receiverEmail
    );
    io.to(senderData.socketId).emit("receiveMessage", chatDetails);
  });
  socket.on("sendMessage", (chatDetails) => {
    const receiverData = Allusers.find(
      (val) => val.email == chatDetails.receiverEmail
    );
    io.to(receiverData.socketId).emit("receiveMessage", chatDetails);
  });
});
