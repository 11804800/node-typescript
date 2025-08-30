import express from 'express'
import bodyParser from 'body-parser'
import { verifyUser } from '../middlewares/authenticate';
import { DeleteOrder, GetOrder, PostOrder } from '../controller/OrderController';


const OrderRouter=express.Router();

OrderRouter.use(bodyParser.json())

OrderRouter.get("/",verifyUser,GetOrder)
OrderRouter.post("/new-order",verifyUser,PostOrder)
OrderRouter.delete("/:orderId",verifyUser,DeleteOrder)

export default OrderRouter;