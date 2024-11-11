import { Global, Module } from '@nestjs/common';
import { ArtisDBService } from './datasource/artist-db.service';
import { UserDBService } from './datasource/user-db.service';


@Global()
@Module({
  controllers: [],
  providers: [
   
    ArtisDBService,
  ],
  exports: [
   
    ArtisDBService,
  ],
})
export class GlobalModule {}
