import Joi from 'joi';

const PASS_RE = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

export const userJoiSchema = Joi.object({
  firstName: Joi.string().min(4).max(15).required(),
  lastName: Joi.string().min(4).max(15).required(),
  address: Joi.string().min(4).max(50).required(),
  phoneNumber: Joi.string().min(8).max(15).required(),
  avatar: Joi.string().min(10).max(500),
  email: Joi.string().email().required(),
  username: Joi.string().min(5).max(15).required(),
  password: Joi.string().regex(PASS_RE).required(),
});

export interface NewUserI {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}

export interface UserI {
  _id: string;
  address: string;
  avatar: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  phoneNumber: string;
}

export interface UserQuery {
  username?: string;
  email?: string;
}

export interface UserBaseClass {
  get(id?: string | undefined): Promise<UserI[]>;
  add(data: NewUserI): Promise<UserI>;
  update(id: string, newProductData: NewUserI): Promise<UserI>;
  delete(id: string): Promise<void>;
}
