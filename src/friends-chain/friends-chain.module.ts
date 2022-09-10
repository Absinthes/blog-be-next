import { forwardRef, Module } from '@nestjs/common';
import { FriendsChainService } from './friends-chain.service';
import { FriendsChainResolver } from './friends-chain.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendsChain } from './entity/friends-chain.entity';
import { FileUploadModule } from 'src/shared/file-upload/file-upload.module';
import { FriendsChainTypeModule } from 'src/friends-chain-type/friends-chain-type.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FriendsChain]),
    FileUploadModule,
    forwardRef(() => FriendsChainTypeModule),
  ],
  providers: [FriendsChainService, FriendsChainResolver],
  exports: [FriendsChainService],
})
export class FriendsChainModule {}
