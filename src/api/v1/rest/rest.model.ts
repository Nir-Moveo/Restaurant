import mongoose, { Schema } from "mongoose";
// import IRest from "./rest.interface";

const RestSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    chef: { type: String, required: true },
    createDate : {type: String, required: true},
    foodType : { type:String, required: true},
    dishes : [{type: mongoose.Schema.Types.ObjectId,ref: "Dish",index: true}]
  },
  {
    timestamps: true,
  }
);


export default mongoose.model("Rest", RestSchema);
