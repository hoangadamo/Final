import { Request } from 'express';
import { Store, User } from 'src/database';

export interface ICustomRequest extends Request {
  user?: User;
  store?: Store;
}
