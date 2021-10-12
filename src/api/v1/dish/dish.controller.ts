import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Rest from "../rest/rest.model";
import Dish from "./dish.model";

const createDish = (req: Request, res: Response, next: NextFunction) => {
  let { name, price } = req.body;
  let {id } =req.params;
  const dish = new Dish({
    _id: new mongoose.Types.ObjectId(),
    name,
    price
  });

  dish.save();
      Rest.findByIdAndUpdate(id,{        
        $push:{
          dishes: mongoose.Types.ObjectId(dish._id)         
        }
      })  .then((result: any) => {
        return res.status(201).json({
          rest: result,
        });
      })
      .catch((error: { message: any; }) => {
        return res.status(500).json({
          message: error.message,
          error,
        });
      });
};

// const getAllDish = (req: Request, res: Response, next: NextFunction) => {
//   Dish.find()
//     .exec()
//     .then((dishes) => {
//       return res.status(200).json({
//         dishes: dishes,
//         count: dishes.length,
//       });
//     })
//     .catch((error) => {
//       return res.status(500).json({
//         message: error.message,
//         error,
//       });
//     });
// };

// const getDish = (req: Request, res: Response, next: NextFunction) => {
//   let { id } = req.params;
//   Dish.findById(id)
//     .exec()
//     .then((dish) => {
//       return res.status(200).json({
//         dish: dish,
//       });
//     })
//     .catch((error) => {
//       return res.status(500).json({
//         message: error.message,
//         error,
//       });
//     });
// };

const uptadeDish = (req: Request, res: Response, next: NextFunction) => {
  let {id} = req.params;
  let { name, price } = req.body;
  Dish.findByIdAndUpdate(id, {
    name:name,
    price:price
  }, {new:true}).then((dish)=>{
    res.status(200).json({
      dish:dish
    })
  })
  .catch((error) => {
    return res.status(500).json({
      message: error.message,
      error,
    });
  });
};
const deleteDish = (req: Request, res: Response, next: NextFunction) => {
  let {Did, Rid} = req.params;
  Dish.findById(Did).then((dish)=>{
    dish?.remove().then(()=>{
      Rest.findByIdAndUpdate(Rid, {
        $pull: {
          dishes: mongoose.Types.ObjectId(Did)
        }
      }).then(()=> {
       return res.status(200).json({
          message:"the dish was delete secssesfuly"
        })
      })
    })
  })
  .catch((error) => {
    return res.status(500).json({
      message: error.message,
      error,
    });
  });
};

export default { createDish, uptadeDish, deleteDish };
