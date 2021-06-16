import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/users.model';
import { UserRoles } from './user-roles.model';

interface RoleCreationAttrs {
  value: 'user' | 'admin' | 'publisher' | 'owner';
  description: string;
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttrs> {
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

  // Value
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  @ApiProperty({
    example: 'admin',
    description: 'Роль пользователя',
  })
  value: RoleValue;

  // Description
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @ApiProperty({
    example: 'Администратор',
    description: 'Описание роли',
  })
  description: string;

  // Связь many to many таблиц Users и UserRoles
  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}
