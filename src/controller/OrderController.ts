import { Request, Response } from "express";
import Order from "../model/Order";
import User from "../model/User";

export const GetOrder = ((req: Request, res: Response) => {
    Order.find({ user: req.user })
        .populate({ path: 'user', select: "username firstname lastname" })
        .populate({ path: "orderItem.product", select: "name price" })
        .then((order: any) => {
            res.status(200).json({ order: order })
        }).catch((err) => {
            res.status(500).json({ err: err.message })
        })
})

export const PostOrder = (async (req: Request, res: Response) => {
    try {
        const { user, orderItem } = req.body;
        const order: any = await Order.findOne({ user: req.user });
        if (order !== null) {
            orderItem.map((item: any) => {
                order.orderItem.push(item);
                order.save()
            });
            res.status(200).json({ message: "Order Posted", order: order })
        }
        else {
            const newOrder = await Order.create({
                user: user,
                orderItem: orderItem
            });
            res.status(200).json({ message: "Order Posted", order: newOrder })
        }
    }
    catch (err) {
        res.status(500).json({ err: err })
    }
})

export const DeleteOrder = (async (req: Request, res: Response) => {
    const { orderId } = req.params;
    Order.findOne({ user: req.user })
        .then((order: any) => {
            const Order=order.orderItem.filter((item:any)=>item._id!=orderId);
            order.orderItem=Order;
            order.save();
            res.status(200).json({message:`order deleted with order id ${orderId}`, order: order })
        }).catch((err) => {
            res.status(500).json({ err: err.message })
        })
});