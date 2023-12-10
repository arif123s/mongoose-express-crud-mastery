import { UserModel } from '../user.model';
import { User } from './user.interface';

const createUserIntoDB = async (user: User) => {
  const result = await UserModel.create(user);
  return result;
};

const getAllUsersfromDB = async () => {
  const result = await UserModel.find();
  return result;
};

const getSingleUserfromDB = async (userId: string) => {
  const result = await UserModel.findOne({ userId });

  // const result = await UserModel.aggregate([{ $match: { userId:userId } }]);
    console.log(userId);

  return result;
};

// const updateSingleUserfromDB = async (userId: string) => {

//   const result = await UserModel.updateOne({userId})
//   const filter = { userId: userId };
//   const update = { $set: { user: 'VALUE' } };

//   UserModel.updateOne(
//     filter,
//     update,
//   );

// };

const deleteSingleUserfromDB = async (userId: string) => {
  const result = await UserModel.updateOne({ userId }, { isDeleted: true });

  return result;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const addOrderIntoDB = async (orderInfo: any) => {
 
  const result = await UserModel.updateOne(
    { userId: orderInfo.userId },
    {
      $addToSet: {
        orders: orderInfo.order,
      },
    },
  );

  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersfromDB,
  getSingleUserfromDB,
  deleteSingleUserfromDB,
  addOrderIntoDB,
};
