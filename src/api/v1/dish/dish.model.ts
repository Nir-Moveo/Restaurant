import mongoose, { Schema } from "mongoose";
import IDish from "./dish.interface";

const DishSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);


export default mongoose.model<IDish>("Dish", DishSchema);
