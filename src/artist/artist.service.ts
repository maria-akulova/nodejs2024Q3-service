import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { validate } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';
import { ArtisDBService } from 'src/datasource/artist-db.service';
import { ArtistDto } from './dto/artist.dto';

@Injectable()
export class ArtistService {
  constructor(private readonly artistDb: ArtisDBService) {}

  getAll(): ArtistDto[] {
    return this.artistDb.getAll();
  }

  getArtist(id: string): ArtistDto {
    const artist = this.validateAndGetArtist(id);
    return artist;
  }

  addArtist(art: CreateArtistDto): ArtistDto {
    return this.artistDb.addArtist(art);
  }

  updateArtist(id: string, art: CreateArtistDto): ArtistDto {
    const artist = this.validateAndGetArtist(id);
    return this.artistDb.update(id, art);
  }

  delete(id: string): void {
    const artist = this.validateAndGetArtist(id);
    return this.artistDb.delete(id);
  }

  private validateAndGetArtist(id: string): ArtistDto {
    if (!validate(id)) {
      throw new BadRequestException('ID is invalid');
    }
    const artist = this.artistDb.getArtist(id);
    if (!artist) {
      throw new NotFoundException('Artist was not found');
    }
    return artist;
  }
}