import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../roles/roles.guard';
import { ROLES } from '../names.list';
import { AddRoleToUserDto } from '../roles/dto/addRoleToUser.dto';
import { BanUserDto } from './dto/ban-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // Create user
  @ApiOperation({
    summary: 'Создание пользователя',
  })
  @ApiResponse({
    status: 200,
    type: User,
  })
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  // Get all users
  @ApiOperation({
    summary: 'Получить всех пользователей',
  })
  @ApiResponse({
    status: 200,
    type: [User],
  })
  @Roles(ROLES.admin, ROLES.publisher)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

  // Add role
  @ApiOperation({ summary: 'Добавить роль пользователю' })
  @ApiResponse({ status: 200 })
  @Roles(ROLES.admin, ROLES.owner)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/addRole')
  addRole(@Body() addRoleDto: AddRoleToUserDto) {
    return this.usersService.addRole(addRoleDto);
  }

  // Ban user
  @ApiOperation({ summary: 'Забанить пользователя' })
  @ApiResponse({ status: 200 })
  @Roles(ROLES.admin, ROLES.owner)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/ban')
  ban(@Body() banUserDto: BanUserDto) {
    return this.usersService.ban(banUserDto);
  }
}
