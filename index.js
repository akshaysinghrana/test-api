import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import routes from "./routers/routes.js";
import { swaggerUiSetup } from "./utils/swagger.js";

const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Database connected successfully")
}).catch((err) => {
    console.log("Error in database connection => ", err);
});

app.use("/api/v1", routes);
app.get("/", (req, res) => {
    return res.json({ message: "Hello from the server" });
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    swaggerUiSetup(app, PORT);
    console.log(`Swagger UI is available at http://localhost:${PORT}/api-docs`);
    console.log(`Swagger JSON is available at http://localhost:${PORT}/swagger.json`);
    console.log(`API is available at http://localhost:${PORT}/api/v1`);
    console.log(`API is available at http://localhost:${PORT}/api/v1/getAllNews`);
    console.log(`API is available at http://localhost:${PORT}/api/v1/addNews`);
    console.log(`API is available at http://localhost:${PORT}/api/v1/getAllNews`);
});