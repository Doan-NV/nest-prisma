import { Module } from '@nestjs/common';
import { UsersModule } from './module/users/users.module';
import { AuthModule } from './module/auth/auth.module';
import {
  MYSQL_DATABASE,
  MYSQL_HOST,
  MYSQL_PASSWORD,
  MYSQL_PORT,
  MYSQL_USER,
} from './environments/index';
import { ConfigModule } from './share/config/config.module';
import { RedisModule } from './module/cache/redis.module';
import { PrismaModule } from './module/database/prisma.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, ConfigModule, RedisModule],
})
export class AppModule {}
