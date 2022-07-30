import { NotAcceptableException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { verifyEmail, verifyPhone } from 'src/shared/utils/verification';
import { AuthService } from './auth.service';
import { LoginInput } from './dtos/login.input';
import { Token } from './model/token';

@Resolver(() => Token)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => Token)
  public async login(@Args('input') input: LoginInput) {
    const isEmail = verifyEmail(input.account);
    const isPhone = verifyPhone(input.account);
    if (!isEmail && !isPhone) throw new NotAcceptableException('邮箱或手机号错误');
    if (isEmail) return this.authService.loginByEmail(input);
    if (isPhone) return this.authService.loginByPhone(input);
  }
}
