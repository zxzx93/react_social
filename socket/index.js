const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];
const addUser = (userId, socketId) => {
  !users.some((user) => user.userId !== userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

io.on("connection", (socket) => {
  //연결 할때
  console.log("a user connected");
  //사용자로부터 사용자 ID와 소켓 ID를 가져옴
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //연결 끊을때
  socket.on("disconnect", () => {
    console.log("user disconnected");
    removeUser(socket.id);
  });
});
