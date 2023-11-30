import { Schema, model } from 'mongoose';
import { Address, FullName, User } from './user/user.interface';

const userNameSchema=new Schema<FullName>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
})

const addressSchema = new Schema<Address>({
street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
});

const userSchema = new Schema<User>({
  userId: SVGAnimatedNumberList,
  username: { type: String, required: true },
  password: { type: String, required: true },
  fullName: userNameSchema,
  age: Number,
  email: { type: String, required: true },
  isActive: Boolean,
  hobbies: { type: [String], required: true },
  address: addressSchema,
});

const User = model<User>('User',userSchema)