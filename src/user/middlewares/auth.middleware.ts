import { ExpressRequestInterface } from '@app/types/expressRequest.interface';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { NextFunction, Response } from 'express';
import { JWT_SECRET } from '@app/config';
import { UserService } from '../user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: ExpressRequestInterface, res: Response, next: NextFunction) {
    console.log('AuthMiddleware: ', req.headers);

    if (!req.headers.authorization) {
      req.user = null;
      next(); // после этой строчки попадаем в контроллер
      return;
    }

    const token = req.headers.authorization.split(' ')[1];
    console.log('token', token);

    try {
      const decode = verify(token, JWT_SECRET);
      console.log('decode', decode);

      const user = await this.userService.findById(decode.id);
      req.user = user;
      next();
    } catch (error) {
      req.user = null;
      next();
    }
  }
}
