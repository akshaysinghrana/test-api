import express from "express";
import { addNews, fetchAllNews } from "../controllers/newsController.js";

const router = express.Router();

router.get("/addNews", addNews)
router.get("/getAllNews", fetchAllNews)

export default router;