import dotenv from 'dotenv';
dotenv.config();
import express,{Request,Response} from 'express';
import cors from 'cors';
import path from 'path';
import UserRouter from './routes/UserRouter';
import passport from 'passport';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import session from 'express-session';
import DishRouter from './routes/DishRoutes';
import OrderRouter from './routes/OrderRoutes';

const app:any=express();
const port=process.env.PORT || 3000;


const secretKey: string | undefined = process.env.SECRET_KEY;
if (!secretKey) {
  throw new Error('SECRET_KEY environment variable is not set');
}

app.use(session({
  secret: secretKey,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  }
}));


const MongoDbURL:any=process.env.MONGODB_URI;
mongoose.connect(MongoDbURL).then((db)=>{
    console.log("Database connection is established")
}).catch((err)=>console.log(err));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


const corsOptions={
    origin:'http://localhost:5000/',
    methods:['GET',"POST","PUT",'DELETE'],
    credentials:true
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())
app.use(cors(corsOptions))
app.use(express.static(path.join(__dirname, '../public')));
app.use(passport.initialize())

app.use("/user",UserRouter);
app.use("/dish",DishRouter);
app.use("/order",OrderRouter)

app.get("/",(req:Request,res:Response)=>{
    res.render('index')
})



app.listen(port,()=>{
    console.log("app is running at ",port)
})