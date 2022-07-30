import { ConflictException, NotAcceptableException, UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserInputError } from 'apollo-server-express';
import { CurrentUser } from 'src/shared/decorator/currentuser.decorator';
import { GraphQLAuthGuard } from 'src/shared/guard/graphql.auth.guard';
import { StatusModel } from 'src/shared/model/status.modle';
import { verifyEmail, verifyPhone } from 'src/shared/utils/verification';
import { CreateInput } from './dtos/create.input';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResovler {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  @UseGuards(GraphQLAuthGuard)
  async getUserByPhoneAndEmail(
    @Args({ name: 'phoneAndEmail', type: () => String }) phoneAndEmail: string,
    @CurrentUser() user: any,
  ) {
    console.log(user);
    const isEmail = verifyEmail(phoneAndEmail);
    const isPhone = verifyPhone(phoneAndEmail);
    if (!isEmail && !isPhone) return new UserInputError('手机号或邮箱错误！');
    if (isPhone) return this.userService.findOneByPhone(phoneAndEmail);
    if (isEmail) return this.userService.findOneByEmail(phoneAndEmail);
  }

  @Mutation(() => StatusModel)
  async createAccount(@Args('input') createInput: CreateInput) {
    if (!verifyPhone(createInput.phone)) throw new NotAcceptableException('输入错误');
    let user = await this.userService.findOneByPhone(createInput.phone)
    if(user) throw new ConflictException('用户已存在')
    await this.userService.createUser(createInput)
    return new StatusModel(200, '操作成功');
  }
}
