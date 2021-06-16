import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'user@mail.com',
    description: 'Почтовый адрес',
  })
  readonly email: string;

  @ApiProperty({
    example: 'FDSFdsfsdFFE',
    description: 'Пароль пользователя',
  })
  readonly password: string;
}
