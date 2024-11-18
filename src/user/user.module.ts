import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserDBService } from 'src/datasource/user-db.service'; 


@Module({
  controllers: [UserController],
  providers: [UserService, UserDBService],
})
export class UserModule {}
