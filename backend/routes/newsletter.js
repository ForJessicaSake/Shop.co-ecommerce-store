import express from "express";
import { subscribeToNewsLetter } from "../controllers/newsletter.js";

const newsLetterRouter = express.Router();

newsLetterRouter.post("/newsletter", subscribeToNewsLetter);

export default newsLetterRouter;
