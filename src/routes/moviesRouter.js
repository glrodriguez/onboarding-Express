import { Router } from "express";
import { getMovies } from "../controllers/movies.controller.js";


const moviesRouter = Router();

moviesRouter.get("/", getMovies);


export default moviesRouter;
