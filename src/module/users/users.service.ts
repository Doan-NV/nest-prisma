import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Prisma, User } from '@prisma/client';

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

  // async remove(id: string): Promise<void> {
  //   try {
  //     await this.usersRepository.delete(id);
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // public async create(user: UserDto): Promise<any> {
  //   try {
  //     let { password } = user;
  //     password = await BcryptHelper.hash(password);
  //     const newUser = await this.usersRepository.save({ ...user, password });
  //     return newUser;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

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

  // public async update(id: string, data = {}) {
  //   try {
  //     return await this.usersRepository.update(id, data);
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // private buildUser(user: User) {
  //   const data = {
  //     id: user.id,
  //     firstName: user.firstName,
  //     email: user.email,
  //     lastName: user.lastName,
  //   };
  //   return data;
  // }
}
