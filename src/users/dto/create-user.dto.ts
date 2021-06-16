import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'user@mail.com',
    description: 'Почтовый адрес',
  })
  @IsString({ message: 'email должен быть строкового типа' })
  @IsEmail({}, { message: 'Некорректный email' })
  readonly email: string;

  @ApiProperty({
    example: 'FDSFdsfsdFFE',
    description: 'Пароль пользователя',
  })
  @IsString({ message: 'email Должен быть строкового типа' })
  @Length(4, 16, {
    message: 'Пароль должен быть от 4 до 16 символов',
  })
  readonly password: string;
}
