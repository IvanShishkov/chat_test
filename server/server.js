const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/api/users", require("./routes/api/user.routes"));
app.use("/api/chats", require("./routes/api/chat.routes"));

io.on("connection", (socket) => {
  socket.on("CHAT:JOIN", (data) => {
    socket.join(data.chatId);
  });

  socket.on("CHAT:LEAVE", (data) => {
    socket.leave(data.chatId);
  });

  socket.on("CHAT:SEND_MESSAGE", (data) => {
    socket.to(data.inChatId).emit("CHAT:GET_MESSAGE", data);
  });

  socket.on("disconnect", () => {});
});

async function start() {
  try {
    await mongoose
      .connect("!!!CONNECT TO YOUR MONGO DB!!!", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      })
      .then((res) => console.log(`Mongo start success`))
      .catch((err) => console.log(`Mongo error: ${err}`));
    await server.listen(PORT, () =>
      console.log(`Server is running on port: ${PORT}`)
    );
  } catch (error) {
    console.log(`Server error: ${error}`);
    process.exit(1);
  }
}

start();
