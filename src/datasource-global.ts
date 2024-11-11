import { Global, Module } from '@nestjs/common';
import { ArtisDBService } from './datasource/artist-db.service';
import { UserDBService } from './datasource/user-db.service';
import { TrackDbService } from './datasource/track-db.service';
import { AlbumDBService } from './datasource/album-db.service';
import { FavoritesDbService } from './datasource/favorites-db.service';


@Global()
@Module({
  controllers: [],
  providers: [
   
    ArtisDBService,
    TrackDbService,
    AlbumDBService,
    FavoritesDbService,
  ],
  exports: [
   
    ArtisDBService,
    TrackDbService,
    AlbumDBService,
    FavoritesDbService,
  ],
})
export class GlobalModule {}
