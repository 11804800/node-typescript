import { Request, Response } from "express";
import Dish from "../model/Dish";

enum FoodCategory {
  Pizza = 'Pizza',
  Pasta = 'Pasta',
  Coffee = 'Coffee',
  Burritto = 'Burritto',
  Desserts = 'Desserts',
  Salad = 'Salad',
  FastFood="FastFood",
  Snacks="Snacks",
  Beverages="Beverages",
  MainCourse="Main Course",
  Sandwiches="Sandwiches"
}


export const GetDish = (async (req: Request, res: Response) => {
  try {
    const dishes=await Dish.find({})
    res.status(200).json({ category: Object.values(FoodCategory), dishes:dishes })
  }
  catch (err) {
    res.status(500).json({ err: err })
  }

})

interface PostRequestBody {
  name: string,
  description: string,
  image: string,
  category: string,
  label: string,
  price: number,
  featured: boolean
}


function isValidPostBody(body: any): body is PostRequestBody {
  return (
    typeof body === 'object' && body !== null &&
    typeof body.name === 'string' && typeof body.description === 'string' &&
    typeof body.image === 'string' &&
    typeof body.category === 'string' &&
    typeof body.price === 'number'
  )
}

export const PostDish = (async (req: Request, res: Response) => {
  try {
    if (!isValidPostBody(req.body)) {
      return res.status(400).json({ message: "Invalid post body" })
    }

    const { name, description, image, category, label, price, featured }: any = req.body;

    if (!Object.values(FoodCategory).includes(category)) {
      return res.status(400).json({ message: 'Invalid category.' });
    }

    const dish= await Dish.create({
      name:name,
      description:description,
      category:category,
      featured:featured,
      label:label,
      price:price,
      image:image
    });

    res.status(200).json({ dish:dish});
  }
  catch (err) {
    res.status(500).json({ err: err })
  }
})

