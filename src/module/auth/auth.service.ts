import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { TokenHelper } from 'src/helper/token';
import { ConfigService } from 'src/share/config/config.service';
import { RedisService } from '../cache/redis.service';
import { UsersService } from '../users/users.service';
import { LoginDto, RegisterUserDto } from './dto/auth.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    @Inject('REDIS') private readonly redisService: RedisService
  ) {}
  async verifyToken(token: string): Promise<any> {
    try {
      const secret = this.configService.accessTokenSecret;
      const user = await TokenHelper.verifyToken(token, secret);
      if (user) {
        // const tokenEx = await this.tokenService.findOneBy({
        //   userId: user.id,
        //   token: token,
        // });

        // if (!tokenEx || tokenEx.expiredAt === null) {
        //   ErrorHelper.UnauthorizedException('token expires!');
        // }
        return user;
      }
    } catch (error) {
      throw error;
    }
  }
  async validateToken(authorization: string): Promise<any> {
    const [bearer, token] = authorization.split(' ');
  }

  async login(data: LoginDto): Promise<any> {
    const { email, password } = data;
    const user = await this.usersService.validateUser({ email });

    if (!user) {
      throw 'username or email does not exist';
    }
    // const passwordCompare = await BcryptHelper.compare(password, user.password);
    const passwordCompare = user.password;
    if (passwordCompare) {
      const { token, expires } = this._generateToken(user.id);
      return { token };
    } else {
      throw new HttpException({ message: 'wrong password' }, HttpStatus.FOUND);
    }
  }

  async register(data: RegisterUserDto): Promise<any> {
    try {
      const { email, password, name } = data;
      const user = await this.usersService.findOneBy({ email });
      if (user) {
        throw 'email already use!';
      }
      const { id } = await this.usersService.create({
        email,
        password,
        name,
      });
      const { token, expires } = this._generateToken(id);
      return token;
    } catch (error) {
      throw error;
    }
  }

  private _generateToken(id: string) {
    const payload = {
      id,
    };
    const secret = this.configService.accessTokenSecret;
    const expiresIn = this.configService.accessTokenExpires;

    const { token, expires } = TokenHelper.generateToken(
      payload,
      secret,
      expiresIn
    );

    return {
      token,
      expires,
    };
  }
}
