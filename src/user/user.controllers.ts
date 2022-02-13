import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '@app/user/dto/createUser.dto';
import { LoginUserDto } from '@app/user/dto/login.dto';
import { UserResponseInterface } from './types/userResponse.interface';
import { ExpressRequestInterface } from '@app/types/expressRequest.interface';
import { User } from './decorators/user.decorators';
import { UserEntity } from './user.entity';
import { AuthGuard } from './guards/auth.guard';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  @UsePipes(new ValidationPipe())
  async createUser(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.createUser(createUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Post('users/login')
  @UsePipes(new ValidationPipe())
  async login(
    @Body('user') loginUserDto: LoginUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.login(loginUserDto);
    return this.userService.buildUserResponse(user);
  }

  // 1 вариант используя ExpressRequestInterface
  @Get('user')
  @UseGuards(AuthGuard)
  async currentUser(
    @Req() request: ExpressRequestInterface,
  ): Promise<UserResponseInterface> {
    console.log('current', request.user);
    return this.userService.buildUserResponse(request.user);
  }

  // 2 вариант используя decorator "@User"
  @Get('user_decorator')
  @UseGuards(AuthGuard)
  async currentUserUseDecorator(
    @User() user: UserEntity, // внутрь можно передать например 'id', чтобы получить поле id
    @User('id') currentUserId: number,
  ): Promise<UserResponseInterface> {
    console.log('user decorator: ', user);
    console.log('user decorator id: ', currentUserId);
    return this.userService.buildUserResponse(user);
  }

  @Put('user')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async updateCurrentUser(
    @User('id') currentUserId: number,
    @Body('user') updateUserDto: UpdateUserDto,
  ): Promise<UserResponseInterface> {
    console.log(
      '@Put [ currentUserId, updateUserDto ]: ',
      currentUserId,
      updateUserDto,
    );
    const user = await this.userService.updateUser(
      currentUserId,
      updateUserDto,
    );
    console.log('return updated user: ', user);
    return this.userService.buildUserResponse(user);
  }
}
