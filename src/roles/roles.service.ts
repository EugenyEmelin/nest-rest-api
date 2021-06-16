import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './roles.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleModel: typeof Role) {}

  async createRole(role: CreateRoleDto) {
    const createdRole = await this.roleModel.create(role);
    return createdRole;
  }

  async getRoleByValue(value: string) {
    const role = await this.roleModel.findOne({
      where: { value },
    });
    return role;
  }

  async getAll() {
    const role = await this.roleModel.findAll();
    return role;
  }
}
