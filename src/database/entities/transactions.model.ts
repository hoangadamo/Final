import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from './users.model';
import { Store } from './stores.model';

@Table({
  tableName: 'transactions',
  underscored: true,
})
export class Transaction extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Store)
  @Column({
    type: DataType.INTEGER,
  })
  storeId: number;

  @BelongsTo(() => Store)
  store: Store;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  amount: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  pointsEarned: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  transactionDate: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  pointType: string;
}
