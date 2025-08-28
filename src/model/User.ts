import {Schema,Document,model} from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'

const User=new Schema<any>({
    firstname:{
        type:String
    },
    lastname:{
        type:String
    },
    email:{
        type:String
    }
},{
    timestamps:true
});

User.plugin(passportLocalMongoose);
export default model<any>("user",User);
