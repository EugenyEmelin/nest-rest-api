import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/users.model';
import { Role } from './roles.model';

@Table({ tableName: 'user_roles', createdAt: false, updatedAt: false })
export class UserRoles extends Model<UserRoles> {
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

  // User id
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  @ApiProperty({
    example: 'admin',
    description: 'Роль пользователя',
  })
  userId: string;

  // Role id
  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
  })
  @ApiProperty({
    example: 'Администратор',
    description: 'Описание роли',
  })
  roleId: string;
}
