import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserInputError } from 'apollo-server-express';
import { UserService } from 'src/user/user.service';
import { LoginInput } from './dtos/login.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(phone: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByPhone(phone);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async loginByPhone(loginInput: LoginInput) {
    const user = await this.usersService.findOneByPhone(loginInput.account)
    if(user.password !== loginInput.password) throw new UserInputError('账号或者密码错误')
    const payload = {
      sub: user.id,
      nickName: user.nickName,
      phone: user.phone,
      email: user.email
    }
    return {
      authorization: this.jwtService.sign(payload),
    };
  }

  async loginByEmail(loginInput: LoginInput) {
    const user = await this.usersService.findOneByEmail(loginInput.account)
    if(user.password !== loginInput.password) throw new UserInputError('账号或者密码错误')
    const payload = {
      sub: user.id,
      nickName: user.nickName,
      phone: user.phone,
      email: user.email
    }
    return {
      authorization: this.jwtService.sign(payload),
    };
  }
}
