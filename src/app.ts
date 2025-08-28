import dotenv from 'dotenv';
dotenv.config();
import express,{Request,Response} from 'express';
import cors from 'cors';
import path from 'path';


const app:any=express();
const port=process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const corsOptions={
    origin:'http://localhost:5000/',
    methods:['GET',"POST","PUT",'DELETE'],
    credentials:true
}

app.use(express.json())
app.use(cors(corsOptions))
app.use(express.static(path.join(__dirname, '../public')));

app.get("/",(req:Request,res:Response)=>{
    res.render('index')
})



app.listen(port,()=>{
    console.log("app is running at ",port)
})