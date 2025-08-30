import { Schema, model, Document, Types } from "mongoose";

const OrderItem = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: "dish",
        required: true,
        unique: true
    },
    quantity: {
        type: Number,
        default: 1
    }
}, {
    timestamps: true
})

interface OrderInterface extends Document {
    orderItem: any[],
    user: Types.ObjectId,
    totalprice: Number
}

const Order = new Schema<OrderInterface>({
    orderItem: [OrderItem],
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    totalprice: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})





export default model("order", Order);