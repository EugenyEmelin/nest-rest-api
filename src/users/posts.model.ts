import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from './users.model';

interface PostCreationAttrs {
  title: string;
  content: string;
  userId: number;
  image: string;
}

@Table({ tableName: 'posts' })
export class Post extends Model<Post, PostCreationAttrs> {
  // Id
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  // Title
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  // Content
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  content: string;

  // Image
  @Column({
    type: DataType.STRING,
  })
  image: string;

  // User id (author)
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  // Связь many-to таблиц Role и UserRoles
  @BelongsTo(() => User)
  author: User;
}
