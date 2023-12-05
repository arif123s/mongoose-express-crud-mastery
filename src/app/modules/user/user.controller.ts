import { Request, Response } from 'express';
import { UserServices } from './user.service';
// import Joi from 'joi';

const createUser = async (req: Request, res: Response) => {
  try {

// creating a schema validation using joi
//  const JoivalidationSchema = Joi.object({
//   userId : Joi.number(),
//   username: Joi.string(),
//   password:Joi.string(),
// fullName:{
//   firstName:Joi.string(),
//   lastName:Joi.string(),
//    age: Joi.number,
//   email: Joi.string(),
//   isActive: Joi.boolean,
// }
// })


    const { user: userData } = req.body;
    const result = await UserServices.createUserIntoDB(userData);

    res.status(200).json({
      success: true,
      message: 'User is created successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      data: err,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersfromDB();

    res.status(200).json({
      success: true,
      message: 'Users are retrieved successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getSingleUserfromDB(userId);

    res.status(200).json({
      success: true,
      message: 'User is retrieved successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.updateSingleUserfromDB(userId);

    res.status(200).json({
      success: true,
      message: 'User is updated successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateSingleUser,
};
