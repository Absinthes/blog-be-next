import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticationError } from 'apollo-server-express';
import { Observable } from 'rxjs';

@Injectable()
export class GraphQLAuthGuard extends AuthGuard('jwt') implements CanActivate {
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    // 测试环境下跳过 token 校验
    // if (this.isEnvTest) {
    //   return true;
    // }
    try {
      return (await super.canActivate(context)) as boolean;
    } catch (e) {
      throw new AuthenticationError(e);
    }
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
