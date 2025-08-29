import { Request, Response } from "express";
import Dish from "../model/Dish";

enum FoodCategory {
  Pizza = 'Pizza',
  Pasta = 'Pasta',
  Coffee = 'Coffee',
  Burritto = 'Burritto',
  Brownies = 'Brownies',
  Salad = 'Salad',
  FastFood = "FastFood"
}


export const GetDish = ((req: Request, res: Response) => {
  console.log("authorization:",req.headers)
  res.json("Hello i am dish")
})

export const PostDish = ((req: Request, res: Response) => {
  const { category } = req.body;
  if (!Object.values(FoodCategory).includes(category)) {
    return res.status(400).json({ message: 'Invalid category.' });
  }
  res.status(200).json({ message: "i am posted" })
})

