import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { BcryptHelper } from 'src/helper/bcrypt';
import { ErrorHelper } from 'src/helper/error';
import { UsersService } from '../users/users.service';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginDto, RegisterUserDto, VerifyEmailDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService
  ) {}
  @Post('/login')
  async login(
    @Body() data: LoginDto,
    @Res({ passthrough: true }) response: Response
  ): Promise<any> {
    try {
      const { token } = await this.authService.login(data);
      response.cookie('key', `Bearer ${token}`, { httpOnly: true });
      return { token };
    } catch (error) {
      ErrorHelper.UnauthorizedException(error);
    }
  }
  @Post('/register')
  async register(
    @Body() data: RegisterUserDto,
    @Res({ passthrough: true }) response: Response
  ): Promise<any> {
    try {
      const token = await this.authService.register(data);
      response.cookie('key', `Bearer ${token}`, { httpOnly: true });
      return { token };
    } catch (error) {
      ErrorHelper.BadGatewayException(error);
    }
  }
}
