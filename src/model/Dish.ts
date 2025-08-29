import { Schema,model,Document } from "mongoose";

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

export interface DishInterface extends Document{
    name:string,
    description:string,
    image:string,
    category:FoodCategory,
    label:string,
    price:number,
    featured:boolean
}

const Dish=new Schema<DishInterface>({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type:String,
        enum:Object.values(FoodCategory),
        required:true
    },
    label:{
        type:String
    },
    price:{
        type:Number,
        required:true
    },
    featured:{
        type:Boolean
    }
},{
    timestamps:true
})

export default model("dish",Dish)