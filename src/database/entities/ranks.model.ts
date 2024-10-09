import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';

import { User } from './users.model';

@Table({
  tableName: 'ranks',
  underscored: true,
})
export class Rank extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  pointsThreshold: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  amount: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  fixedPoint: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  percentage: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  maxPercentagePoints: number;

  @HasMany(() => User)
  users: User[];
}
