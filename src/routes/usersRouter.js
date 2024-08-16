import { Router } from "express";
import { register, getUsers, getUser, updateUser, deleteUser } from "../controllers/user.controller.js";
import validateAuth from "../auth/authentication.js"

import passport from "passport";


const userRouter = Router();

userRouter.post('/register', register);
userRouter.post('/login', passport.authenticate('local', { 
  failureRedirect: '/login-failure', 
  successRedirect: '/login-success'
}), (err, req, res, next) => {
  if (err) next(err);
});
userRouter.post('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/users');
  });
});

userRouter.get('/login-failure', res => res.send('Login Attempt Failed.'));
userRouter.get('/login-success', res => res.send('Login Attempt was successful.'));
userRouter.get("/", validateAuth, getUsers);
userRouter.get("/:id", getUser);

userRouter.put("/:id", updateUser);

userRouter.delete("/:id", deleteUser);


export default userRouter;
