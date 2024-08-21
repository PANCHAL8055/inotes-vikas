import express from "express";
import cors from "cors";

// Routes
import userRoutes from "./routes/user.routes.js";
import noteRoutes from "./routes/note.routes.js";

const app = express();

// for body parser
app.use(express.json({ limit: "50mb" }));

//for url params
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

//Server Working
app.get("/", (_, res) => {
  res.send("Welcome To Vikas Panchal and Kamal's Server");
});

app.use(cors());

//Routes+

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/note", noteRoutes);

export default app;
