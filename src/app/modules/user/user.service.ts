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
  // const result = await UserModel.findOne({ userId });

  const result = await UserModel.aggregate([{ $match: { id:userId } }]);
  return result;
};

const updateSingleUserfromDB = async (userId: string) => {
  const filter = { userId: userId };
  const update = { $set: { user: 'VALUE' } };

  UserModel.updateOne(
    filter,
    update,
    //  (err:string, result)=> {
    //   if (err) {
    //     console.error('Error updating document:', err);
    //   } else {
    //     console.log('Update result:', result);
    //   }
    // },
  );
};

const deleteSingleUserfromDB = async (userId: string) => {
  const result = await UserModel.updateOne({ userId }, { isDeleted: true });
  return result;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const addOrderIntoDB = async (orderInfo: any) => {
  const result = await UserModel.updateOne(
    { userId: orderInfo.userId },
    { orders: orderInfo.order },
  );

  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersfromDB,
  getSingleUserfromDB,
  updateSingleUserfromDB,
  deleteSingleUserfromDB,
  addOrderIntoDB,
};
