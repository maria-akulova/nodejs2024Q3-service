import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateArtistDto } from 'src/artist/dto/create-artist.dto';
import { IArtist } from 'src/interface/artist.interface';
import { AlbumDBService } from './album-db.service';
import { FavoritesDbService } from './favorites-db.service';
import { TrackDbService } from './track-db.service';


@Injectable()
export class ArtisDBService {
  constructor(
    @Inject(forwardRef(() => TrackDbService))
    private readonly trackDb: TrackDbService,
    @Inject(forwardRef(() => FavoritesDbService))
    private readonly favsDb: FavoritesDbService,
    @Inject(forwardRef(() => AlbumDBService))
    private readonly albumDb: AlbumDBService,
  ) {
    this.DB = [];
  }
  private DB: IArtist[];

  getAll(): IArtist[] {
    return this.DB.map((art) => ({ ...art }));
  }

  getArtist(id: string, isSource = false) {
    const artist = this.DB.find((art) => art.id === id);
    if (!artist) {
      return null;
    }
    return isSource ? artist : { ...artist };
  }

  addArtist(art: CreateArtistDto) {
    const newArtist: IArtist = {
      id: randomUUID(),
      name: art.name,
      grammy: art.grammy,
    };
    this.DB.push(newArtist);
    return newArtist;
  }

  update(id: string, art: CreateArtistDto) {
    const artist = this.getArtist(id, true);
    artist.grammy = art.grammy;
    artist.name = art.name;
    return { ...artist };
  }

  delete(id: string) {
    const index = this.DB.findIndex((art) => art.id === id);
    this.DB.splice(index, 1);
    this.trackDb.clearArtistField(id);
    this.favsDb.deleteArtist(id);
    this.albumDb.clearArtistField(id);
  }
}
