import { Parent, ResolveField, ResolveProperty, Resolver } from '@nestjs/graphql';
import { ArticleService } from 'src/article/article.service';
import { Group } from './entity/group.entity';
import { GroupService } from './group.service';

@Resolver(() => Group)
export class GroupResolver {
  constructor(
    private readonly groupService: GroupService,
    private readonly articleService: ArticleService,
  ) {}

  @ResolveField()
  public async articles(@Parent() group: Group) {
    const { id } = group;
    return await this.articleService.articleGroup(id);
  }
}
