import { Global, Module } from '@nestjs/common';
import { ArtisDBService } from './datasource/artist-db.service';
import { UserDBService } from './datasource/user-db.service';
import { TrackDbService } from './datasource/track-db.service';


@Global()
@Module({
  controllers: [],
  providers: [
   
    ArtisDBService,
    TrackDbService,
  ],
  exports: [
   
    ArtisDBService,
    TrackDbService,
  ],
})
export class GlobalModule {}
