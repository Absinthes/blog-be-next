import { Module } from '@nestjs/common';
import { FriendsChainService } from './friends-chain.service';
import { FriendsChainResolver } from './friends-chain.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendsChain } from './entity/friends-chain.entity';
import { FileUploadModule } from 'src/shared/file-upload/file-upload.module';
import { FriendsChainType } from './entity/friends-chain-type.entity';

@Module({
  imports:[TypeOrmModule.forFeature([FriendsChain,FriendsChainType]),FileUploadModule],
  providers: [FriendsChainService, FriendsChainResolver],
  exports:[FriendsChainService]
})
export class FriendsChainModule {}
