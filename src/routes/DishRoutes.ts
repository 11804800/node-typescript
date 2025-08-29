import express from 'express'
import { GetDish, PostDish } from '../controller/DishController';
import { verifyUser } from '../middlewares/authenticate';
import Dish from '../model/Dish';

const DishRouter=express.Router();


DishRouter.get("/",GetDish)
DishRouter.post("/",PostDish);



export default DishRouter;