import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserGuard } from './user.guard'; // Adjust the import path as necessary
import { ErrorHelper } from '../helpers';

@Injectable()
export class AdminGuard extends UserGuard implements CanActivate {
  constructor(reflector: Reflector) {
    super(reflector);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const canActivate = await super.canActivate(context);
    if (!canActivate) {
      return false;
    }

    const req = context.switchToHttp().getRequest();
    const user = req.user;

    if (user && user.isAdmin) {
      return true;
    } else {
      ErrorHelper.BadRequestException('Only admin has the permission.');
    }
  }
}
