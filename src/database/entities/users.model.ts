import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

import { Rank } from './ranks.model';
import { Store } from './stores.model';
import { UserStore } from './user-store.model';
import { Transaction } from './transactions.model';
import { Redemption } from './redemptions.model';

@Table({
  tableName: 'users',
  underscored: true, // change camelCase to snake_case
})
export class User extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  phone: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      len: [8, 255], // at least 8 characters
    },
  })
  password: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  points: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  otp: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 10 * 60 * 1000, // default: 10 minutes
  })
  otpExpireTime: number; // miliseconds

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isAdmin: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isVerify: boolean;

  @ForeignKey(() => Rank)
  @Column({ type: DataType.INTEGER })
  rankId: number;

  @BelongsTo(() => Rank)
  rank: Rank;

  @BelongsToMany(() => Store, () => UserStore)
  stores: Store[];

  @HasMany(() => Transaction)
  transactions: Transaction;

  @HasMany(() => Redemption)
  redemptions: Redemption;
}
