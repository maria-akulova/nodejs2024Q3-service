import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ITrack } from 'src/interface/track.interface';
import { CreateTrackDto } from 'src/track/dto/create-track.dto';
import { FavoritesDbService } from './favorites-db.service';

@Injectable()
export class TrackDbService {
  constructor(
    @Inject(forwardRef(() => FavoritesDbService))
    private readonly favsDb: FavoritesDbService,
  ) {
    this.DB = [];
  }
  private DB: ITrack[];

  getAll() {
    return this.DB.map((track) => ({ ...track }));
  }

  getTrack(id: string, isSource = false) {
    const track = this.DB.find((track) => track.id === id);
    if (!track) {
      return null;
    }
    if (isSource) {
      return track;
    }
    return { ...track };
  }

  addTrack(track: CreateTrackDto) {
    const newTrack: ITrack = {
      id: randomUUID(),
      name: track.name,
      artistId: track.artistId || null,
      albumId: track.albumId || null,
      duration: track.duration,
    };
    this.DB.push(newTrack);
    return newTrack;
  }

  update(id: string, track: CreateTrackDto) {
    const shallowTrack = { ...this.getTrack(id), ...track };
    return shallowTrack;
  }

  delete(id: string) {
    const i = this.DB.findIndex((track) => track.id === id);
    this.DB.splice(i, 1);  
    this.favsDb.deleteTrack(id);  
  }

  clearAlbumField(albumId: string) {
    this.DB.forEach((track) => {
      if (track.albumId === albumId) {
        track.albumId = null;
      }
    });
  }

  clearArtistField(artistId: string) {
    this.DB.forEach((track) => {
      if (track.artistId === artistId) {
        track.artistId = null;
      }
    });
  }
}
