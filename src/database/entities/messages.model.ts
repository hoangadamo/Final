import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'messages',
  underscored: true,
  timestamps: true,
  paranoid: true,
})
export class Message extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    comment: 'Twilio message SID',
  })
  sid: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: 'Recipient phone number',
  })
  to: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: 'Sender phone number',
  })
  from: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    comment: 'Message content',
  })
  body: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: 'Direction of the message (inbound or outbound)',
  })
  direction: 'inbound' | 'outbound';
}
