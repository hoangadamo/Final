import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { IsEmail } from 'class-validator';
import { UserStore } from './user-store.model';
import { User } from './users.model';
import { Reward } from './rewards.model';
import { Transaction } from './transactions.model';

@Table({
  tableName: 'stores',
  underscored: true,
})
export class Store extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @IsEmail({}, { message: 'Invalid email format' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      len: [8, 255], // at least 8 characters
    },
  })
  password: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isApproved: boolean;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    validate: {
      len: [4, 4], // OTP is 4 digits
    },
  })
  otp: number;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    defaultValue: 10 * 60 * 1000, // default: 10 minutes
  })
  otpExpireTime: number; // miliseconds

  @BelongsToMany(() => User, () => UserStore)
  users: User[];

  @HasMany(() => Reward)
  rewards: Reward[];

  @HasMany(() => Transaction)
  transactions: Transaction;
}
