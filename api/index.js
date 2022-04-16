const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const postsRouter = require("./routes/posts");

app.get('/', (req,res) => {
  res.header("Access-Control-Allow-Origin", "*");
})

app.use(
  cors({
    origin: "http://localhost:3000", // 출처 허용 옵션
    credential: true, // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
  })
);
dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log("DB connect 성공!!!!");
    },
    (err) => {
      console.log(err, "DB connect 실패!!!!");
    }
  );

app.use("/images", express.static(path.join(__dirname, "public/images")));

//미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(morgan("dev"));

//storage multer config
const _storage = multer.diskStorage({
  //*경로 잘못되어 있어서 diskStorage에 저장 안됐었음!
  //* destination: (req, file, cb) => cb(null, public/images"),
  destination: (req, file, cb) => cb(null, __dirname + "/public/images"),
  filename: (req, file, cb) => {
    console.log("사진", req.body, file);
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: _storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    console.log("test", req.file);
    console.log("test2", req.body);
    return res.status(200).json("File uploaded successfully");
  } catch (error) {
    console.log(error);
  }
});
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postsRouter);

app.listen(8080, () => {
  console.log("서버 실행 됨!!!!");
});
