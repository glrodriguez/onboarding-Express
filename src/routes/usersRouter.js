import { Router } from "express";
import { signUp, getUsers, getUser, updateUser, deleteUser, login } from "../controllers/user.controller.js";
import passport from "passport";

import User from "../models/userModel.js";


const userRouter = Router();


//userRouter.post("/register", signUp);

userRouter.post('/register', function (req, res) {
  User.register(
    new User({
      username: req.body.username 
    }), req.body.password, function (err, msg) {
      if (err) {
        res.send(err);
      } else {
        res.send({ message: "Successful" });
      }
    }
  )
})

userRouter.post('/login', passport.authenticate('local', { 
  failureRedirect: '/users/login-failure', 
  successRedirect: '/users/login-success'
}), (err, req, res, next) => {
  if (err) next(err);
});

userRouter.get('/login-failure', (req, res, next) => {
  console.log(req.session);
  res.send('Login Attempt Failed.');
});

userRouter.get('/login-success', (req, res, next) => {
  console.log(req.session);
  console.log(req.user);
  res.send('Login Attempt was successful.');
});

userRouter.get('/profile', function(req, res) {
  console.log(req.session)
  if (req.isAuthenticated()) {
    res.json({ message: 'You made it to the secured profie' })
  } else {
    res.json({ message: 'You are not authenticated' })
  }
});

userRouter.get("/", getUsers);
userRouter.get("/:id", getUser);

userRouter.put("/:id", updateUser);

userRouter.delete("/:id", deleteUser);


export default userRouter;
