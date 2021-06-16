import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../auth/roles-auth.decorator';
import { GetFromContext } from '../utils/getUserByToken';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  // Функция проверки доступа к ресурсу (authorization)
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      if (!requiredRoles) {
        return true;
      }
      const token = GetFromContext.token(context)[1];
      const user = this.jwtService.verify(token);
      // Если функция возвращает true, то доступ к эндпоинту разрешён
      const permission = user.roles.some((role) => {
        return requiredRoles.includes(role.value);
      });
      if (!permission) {
        throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN);
      }
      return permission;
    } catch (err) {
      throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN);
    }
  }
}
