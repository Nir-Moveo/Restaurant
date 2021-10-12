import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Rest from "./rest.model";

const createRest = (req: Request, res: Response, next: NextFunction) => {
  let { name, createDate, chef, foodType } = req.body;

  const rest = new Rest({
    _id: new mongoose.Types.ObjectId(),
    name,
    createDate,
    chef,
    foodType
  });

  return rest
    .save()
    .then((result) => {
      return res.status(201).json({
        rest: result,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

const getAllRest = (req: Request, res: Response, next: NextFunction) => {
  Rest.find().populate('dishes')
    .exec((err: any,docs: any)=>{
      if(err){
        return res.status(500).json({
          message: err.message,
          err,
        });
      }
      else{
        return res.status(200).json({
          rest:docs
        })
      }
    })
};

const getRest = (req: Request, res: Response, next: NextFunction) => {
  let { id } = req.params;
  Rest.findById(id).populate('dishes')
  .exec((err: any,docs: any)=>{
    if(err){
      return res.status(500).json({
        message: err.message,
        err,
      });
    }
    else{
      return res.status(200).json({
        rest:docs
      })
    }
  })
};

const uptadeRest = (req: Request, res: Response, next: NextFunction) => {
  let {id} = req.params;
  let { name, createDate, chef, foodType } = req.body;
  Rest.findByIdAndUpdate(id, {
    name:name,
    createDate:createDate,
    chef:chef,
    foodType:foodType
  }, {new:true}).then((rest: any)=>{
    res.status(200).json({
      rest:rest
    })
  })
  .catch((error: { message: any; }) => {
    return res.status(500).json({
      message: error.message,
      error,
    });
  });
};
const deleteRest = (req: Request, res: Response, next: NextFunction) => {
  let {id} = req.params;
  Rest.findById(id).then((rest: { remove: () => Promise<any>; })=>{
    rest?.remove().then(()=>{
      res.status(200).json({
        message:"the resaurant delet secssesfuly"
      })
    })
  })
  .catch((error: { message: any; }) => {
    return res.status(500).json({
      message: error.message,
      error,
    });
  });
};

export default { createRest, getAllRest, getRest, uptadeRest, deleteRest };
