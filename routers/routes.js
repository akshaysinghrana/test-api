import express from "express";
import { addNews, fetchAllNews } from "../controllers/newsController.js";

const router = express.Router();

router.get("/healthcheck", (req, res) => res.sendStatus(200));
router.get("/addNews", addNews)
router.get("/getAllNews", fetchAllNews)

export default router;