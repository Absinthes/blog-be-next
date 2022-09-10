import { forwardRef, Module } from '@nestjs/common';
import { FriendsChainTypeService } from './friends-chain-type.service';
import { FriendsChainTypeResolver } from './friends-chain-type.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendsChainType } from './entity/friends-chain-type.entity';
import { FriendsChainModule } from 'src/friends-chain/friends-chain.module';

@Module({
  imports: [TypeOrmModule.forFeature([FriendsChainType]),forwardRef(() => FriendsChainModule)],
  providers: [FriendsChainTypeService, FriendsChainTypeResolver],
  exports: [FriendsChainTypeService],
})
export class FriendsChainTypeModule {}
