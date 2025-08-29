import express from 'express'
import { GetDish, PostDish } from '../controller/DishController';
import { verifyUser } from '../middlewares/authenticate';

const DishRouter=express.Router();


DishRouter.get("/",verifyUser,GetDish)
DishRouter.post("/",PostDish);

export default DishRouter;