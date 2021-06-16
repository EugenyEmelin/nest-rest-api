import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';
import { AddRoleToUserDto } from '../roles/dto/addRoleToUser.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { ROLES } from '../names.list';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private rolesService: RolesService,
  ) {}

  async createUser(user: CreateUserDto) {
    const createdUser = await this.userModel.create(user);
    const role = await this.rolesService.getRoleByValue(ROLES.admin);
    await createdUser.$set('roles', [role.id]);
    createdUser.roles = [role];
    return createdUser;
  }

  async getAllUsers() {
    return await this.userModel.findAll({
      include: { all: true },
    });
  }

  async getUserByEmail(email: string) {
    return await this.userModel.findOne({
      where: { email },
      include: { all: true },
    });
  }

  async addRole(addRoleDto: AddRoleToUserDto) {
    const user = await this.userModel.findByPk(addRoleDto.userId);
    const role = await this.rolesService.getRoleByValue(addRoleDto.value);
    if (role && user) {
      await user.$add('role', role.id);
      return addRoleDto;
    } else {
      throw new HttpException(
        'Пользователь или роль не найдены',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async ban(banUserDto: BanUserDto) {
    const user = await this.userModel.findByPk(banUserDto.userId);
    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }
    user.banned = true;
    user.banReason = banUserDto.banReason;
    await user.save();
    return user;
  }
}
