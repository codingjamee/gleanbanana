import cors from "cors";
import express from "express";
import path from "path";
import { errorMiddleware } from "./middlewares/errorMiddleware";

// router import
import { userRouter } from "./routers/userRouter";
import { productRouter } from "./routers/productRouter";

const app = express();

// CORS 에러 방지
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET, POST, OPTIONS, PUT, PATCH, DELETE",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// 기본 페이지
app.get("/", (req, res) => {
  res.send("기본 페이지");
});
console.log("app.js - app.get");
app.use(userRouter);
console.log("app.js - app.use(userRouter)");
app.use(productRouter);
console.log("app.js - app.use(productRouter)");
// 에러 핸들링
app.use(errorMiddleware);
console.log("app.js - app.use(errorMiddleware)");
export { app };
