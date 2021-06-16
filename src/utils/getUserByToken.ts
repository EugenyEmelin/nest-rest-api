import { ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class GetFromContext {
  static token(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    if (!authHeader) return;
    return authHeader.split(' ');
  }
}
