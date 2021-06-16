import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({
    example: '',
    description: '',
  })
  readonly value: RoleValue;

  @ApiProperty({
    example: '',
    description: '',
  })
  readonly description: string;
}
