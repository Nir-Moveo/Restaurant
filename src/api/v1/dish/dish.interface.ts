import { Document } from "mongoose";

export default interface IDish extends Document {
  name: string;
  price: number;
}
