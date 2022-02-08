import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from '@app/user/dto/createUser.dto';
import { LoginUserDto } from '@app/user/dto/login.dto';
import { UserResponseInterface } from './types/userResponce.interface';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  @UsePipes(new ValidationPipe())
  async createUser(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.createUser(createUserDto);
    return this.userService.buildUserResponce(user);
  }

  @Post('users/login')
  @UsePipes(new ValidationPipe())
  async login(
    @Body('user') loginUserDto: LoginUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.login(loginUserDto);
    return this.userService.buildUserResponce(user);
  }

  @Get('user')
  async currentUser(@Req() request: Request): Promise<UserResponseInterface> {
    console.log('current', request);
    return 'current' as any;
  }
}
