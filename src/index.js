const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const port = process.env.PORT || 3001;

const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const socketio = require("socket.io");

const userUtil = require("./utils/users.util");
const { addUser, getUser, removeUser } = userUtil;

const mp3Router = require("./routes/mp3.route");
const topSongRouter = require("./routes/topSongs.route");
const homeRouter = require("./routes/home.route");
const playListRoute = require("./routes/playList.route");
const chartRoute = require("./routes/chart.route");
const newReleaseRoute = require("./routes/new-release.route");
const mvRoute = require("./routes/mv.route");
const hubRoute = require("./routes/hub.route");
const usersRoute = require("./routes/users.route");
const commentsRoute = require("./routes/comments.route");

const io = socketio(server);

app.use(cors());
app.use(bodyParser.json());

const uri =
  "mongodb+srv://xuanminh4987:Minh1751010088@cluster0.hat8c.mongodb.net/mp3-app?retryWrites=true&w=majority";
mongoose.connect(
  uri,
  { useUnifiedTopology: true, useNewUrlParser: true },
  (err) => {
    if (err) throw err;

    console.log("MONGODB CONNECTED!");
  }
);

app.use(express.static(path.join(__dirname, "build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.use("/mp3", mp3Router);

app.use("/topSongs", topSongRouter);

app.use("/home", homeRouter);

app.use("/playList", playListRoute);

app.use("/chart", chartRoute);

app.use("/new-release", newReleaseRoute);

app.use("/mv", mvRoute);

app.use("/hub", hubRoute);

app.use("/users", usersRoute);

app.use("/comments", commentsRoute);

io.on("connect", (socket) => {
  socket.on("joinRoom", ({ userInfo, song_id }) => {
    addUser({
      ...userInfo,
      song_id,
      socketId: socket.id,
    });

    socket.join(song_id);

    socket.emit("message", {
      msg: `${userInfo.firstName} ${userInfo.lastName} đã tham gia.`,
    });
  });

  socket.on("comment", ({ userInfo, content }) => {
    const user = getUser(userInfo._id);
    io.to(user.song_id).emit("comment", { userInfo, content });
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.song_id).emit("message", {
        msg: `${user.firstName} ${user.lastName} đã rời khỏi.`,
      });
    }
  });
});

app.get("*", (req, res) => {
  res.send("404 NOT FOUND!");
});

server.listen(port, () => {
  console.log(this.address().port, app.settings.env);
});
