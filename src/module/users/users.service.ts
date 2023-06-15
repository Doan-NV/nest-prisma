import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Prisma, User } from '@prisma/client';
import { BcryptHelper } from 'src/helper/bcrypt';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    try {
      return this.prisma.user.findMany();
    } catch (error) {
      throw error;
    }
  }

  async findOneBy(params: Prisma.UserWhereUniqueInput): Promise<User | any> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          ...params,
        },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  public async create(user: UserDto): Promise<any> {
    try {
      let { password } = user;
      password = await BcryptHelper.hash(password);
      const newUser = await this.prisma.user.create({
        data: {
          ...user,
          password,
        },
      });
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  public async validateUser(params) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          ...params,
        },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }
}
