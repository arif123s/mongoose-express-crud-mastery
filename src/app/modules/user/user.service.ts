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
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersfromDB,
  getSingleUserfromDB,
};
