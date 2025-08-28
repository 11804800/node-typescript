import express from 'express'
import { ChangePassword, ResetPassword, UserGetController, UserLogin, UserSignUp } from '../controller/UserController';


const UserRouter=express.Router()

UserRouter.get("/",UserGetController)
UserRouter.post("/signup",UserSignUp)
UserRouter.post("/login",UserLogin)
UserRouter.post("/reset-password",ResetPassword)
UserRouter.post("/Change-password",ChangePassword)

export default UserRouter;