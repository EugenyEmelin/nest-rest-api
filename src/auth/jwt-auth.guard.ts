import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { GetFromContext } from '../utils/getUserByToken';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  // Функция проверки доступа к ресурсу (authorization)
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const [bearer, token] = GetFromContext.token(context);
      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException('Пользователь не авторизован');
      }
      const user = this.jwtService.verify(token);
      // Если функция возвращает true, то доступ к эндпоинту разрешён
      return true;
    } catch (err) {
      console.log('Guard Error: ', err);
      throw new UnauthorizedException('Пользователь не авторизован');
    }
  }
}
