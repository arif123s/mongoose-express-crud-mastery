import { Schema, model } from 'mongoose';
import { Address, FullName, Orders, User } from './user/user.interface';
import bcrypt from 'bcrypt';
import config from '../config';
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
  password: {
    type: String,
    required: [true, 'Password is required'],
    maxlength: [20, 'Password cannot be more than 20 characters'],
  },
  fullName: {
    type: userNameSchema,
    required: [true, 'FullName is required'],
  },
  age: { type: Number, required: [true, 'Age is required'] },
  email: {
    type: String,
    required: [true, 'Email is required'],
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
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

//pre save middleware / hook : will work on create() save()
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

//post save middleware / hook
userSchema.post('save', function (doc,next) {
doc.password='';

next();
});


// Query midddleware
userSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});

userSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});

userSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });

  next();
});





export const UserModel = model<User>('User', userSchema);
