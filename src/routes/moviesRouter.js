import { Router } from "express";
import { saveMovie, getMovies, getMovie, updateMovie, deleteMovie } from "../controllers/movies.controller.js";


const moviesRouter = Router();

moviesRouter.use((req, res, next) => {
  res.locals.curretUser = req.user;
  next();
});

moviesRouter.post("/", saveMovie);

moviesRouter.get("/", getMovies);
moviesRouter.get("/:id", getMovie);

moviesRouter.put("/:id", updateMovie);

moviesRouter.delete("/:id", deleteMovie);


export default moviesRouter;
