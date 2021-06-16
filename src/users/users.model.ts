import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface UserCreationAttrs {
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  // Id
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  @ApiProperty({
    example: '1',
    description: 'Уникальный идентиффикатор',
  })
  id: number;

  // Email
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  @ApiProperty({
    example: 'user@mail.com',
    description: 'Почтовый адрес',
  })
  email: string;

  // Пароль
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @ApiProperty({
    example: 'DFdf32@fdsFB3E03~',
    description: 'Пароль пользователя',
  })
  password: string;

  // Banned
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  @ApiProperty({
    example: 'false',
    default: 'false',
    description: 'Забанен пользователь или нет',
  })
  banned: boolean;

  // Ban reason
  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: '',
  })
  @ApiProperty({
    example: 'Спам, ругань',
    description: 'Причина бана пользователя',
  })
  banReason: string;
}
