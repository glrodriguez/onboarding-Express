import { Router } from "express";
import { saveMovie, getMovies, getMovie, updateMovie, deleteMovie } from "../controllers/movies.controller.js";


const moviesRouter = Router();

moviesRouter.post("/", saveMovie);

moviesRouter.get("/", getMovies);
moviesRouter.get("/:id", getMovie);

moviesRouter.put("/:id", updateMovie);

moviesRouter.delete("/:id", deleteMovie);


export default moviesRouter;
