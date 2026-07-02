import mongoose from "mongoose";

const schema = mongoose.Schema;

const cartSchema = new schema({
    id: {
        type: Number,
        required: true
    },
    userId: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    products: [
        {
            productId: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ]
});

export default mongoose.model("cart", cartSchema);