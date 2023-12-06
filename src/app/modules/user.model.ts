import { Schema, model } from 'mongoose';
import { Address, FullName, Orders, User } from './user/user.interface';
// import validator from 'validator';

const userNameSchema = new Schema<FullName>({
  firstName: {
    type: String,
    required: [true, 'Username is required'],
    trim: true,
    maxlength: [20, 'Firstname can not ne more than 20 characters'],
    // validate: {
    //   validator: function (value: string) {
    //     const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
    //     console.log(value);
    //     return firstNameStr === value;
    //   },
    //   message: '{VALUE} is not in capitalize format',
    // },
  },
  lastName: {
    type: String,
    required: [true, 'LastName is required'],
    trim: true,
    maxlength: [20, 'LastName can not ne more than 20 characters'],
    // validate: {
    //   validator: (value: string) => validator.isAlpha(value),
    //   message: '{VALUE} is not valid',
    // },
  },
});

const addressSchema = new Schema<Address>({
  street: {
    type: String,
    required: [true, 'street is required'],
    trim: true,
    maxlength: [20, 'street can not ne more than 20 characters'],
  },
  city: {
    type: String,
    required: [true, 'city is required'],
    trim: true,
    maxlength: [20, 'city can not ne more than 20 characters'],
  },
  country: {
    type: String,
    required: [true, 'country is required'],
    trim: true,
    maxlength: [20, 'country can not ne more than 20 characters'],
  },
});

const ordersSchema = new Schema<Orders>({
  orderId: { type: Number, required: true },
  product: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const userSchema = new Schema<User>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: [true, 'Username is required'] },
  password: { type: String, required: [true, 'Password is required'] },
  fullName: {
    type: userNameSchema,
    required: [true, 'FullName is required'],
  },
  age: { type: Number, required: [true, 'Age is required'] },
  email: { 
    type: String, 
    required: [true, 'Email is required'] ,
  // validate:{
  //   validator:(value:string)=>validator.isEmail(value),
  //   message:'{VALUE} is not a valid email type'
  // }
  },
  isActive: {
    type: String,
    enum: {
      values: ['active', 'inActive'],
      message: 'Status must be either "active" or "inActive"',
    },
    required: [true, 'isActive is required'],
  },
  hobbies: { type: [String], required: [true, 'Hobbies is required'] },
  address: {
    type: addressSchema,
    required: [true, 'Address is required'],
  },
  orders: [ordersSchema],
});

export const UserModel = model<User>('User', userSchema);
