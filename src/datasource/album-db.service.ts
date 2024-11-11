import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateAlbumDto } from 'src/album/dto/create-album.dto';
import { TrackDbService } from './track-db.service';
import { IAlbum } from 'src/interface/album.interface';

@Injectable()
export class AlbumDBService {
  constructor(
    @Inject(forwardRef(() => TrackDbService))
    private readonly trackDb: TrackDbService,
  ) {
    this.DB = [];
  }
  private DB: IAlbum[];

  getAll(): IAlbum[] {
    return this.DB.map((album) => ({ ...album }));
  }

  getAlbum(id: string, isSource = false) {
    const album = this.DB.find((album) => album.id === id);
    if (!album) {
      return null;
    }
    if (isSource) {
      return album;
    }
    return { ...album };
  }

  addAlbum(al: CreateAlbumDto) {
    const newAlbum: IAlbum = {
      id: randomUUID(),
      ...al,
    };
    this.DB.push(newAlbum);
    return newAlbum;
  }

  update(id: string, album: CreateAlbumDto) {
    const albumResult = this.getAlbum(id, true);
    for (const track in album) {
      albumResult[track] = album[track];
    }
    return { ...albumResult };
  }

  delete(id: string) {
    const i = this.DB.findIndex((al) => al.id === id);
    this.DB.splice(i, 1);
    this.trackDb.clearAlbumField(id);
  }

  clearArtistField(artistId: string) {
    this.DB.forEach((tr) => {
      if (tr.artistId === artistId) {
        tr.artistId = null;
      }
    });
  }
}
