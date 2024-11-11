import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavoritesResponseDto } from './dto/favorites-respose.dto';
import { validate } from 'uuid';
import { FavoritesDbService } from 'src/datasource/favorites-db.service';

@Injectable()
export class FavoritesService {
  constructor(private readonly favDb: FavoritesDbService) {}

  getAll(): FavoritesResponseDto {
    return this.favDb.getAll();
  }

  addTrack(id: string): string[] {
    this.validateId(id);
    const res = this.favDb.addTrack(id);
    if (!res) {
      throw new UnprocessableEntityException();
    }
    return res;
  }

  deleteTrack(id: string): void {
    this.validateId(id);
    const res = this.favDb.deleteTrack(id);
    if (!res) {
      throw new NotFoundException('Track is not favorite');
    }
  }

  addAlbum(id: string): string[] {
    this.validateId(id);
    const res = this.favDb.addAlbum(id);
    if (!res) {
      throw new UnprocessableEntityException();
    }
    return res;
  }

  deleteAlbum(id: string): void {
    this.validateId(id);
    const res = this.favDb.deleteAlbum(id);
    if (!res) {
      throw new NotFoundException('Album is not favorite');
    }
  }

  addArtist(id: string): string[] {
    this.validateId(id);
    const res = this.favDb.addArtist(id);
    if (!res) {
      throw new UnprocessableEntityException();
    }
    return res;
  }

  deleteArtist(id: string): void {
    this.validateId(id);
    const res = this.favDb.deleteArtist(id);
    if (!res) {
      throw new NotFoundException('Artist is not favorite');
    }
  }

  private validateId(id: string): void {
    if (!validate(id)) {
      throw new BadRequestException('ID is not valid');
    }
  }
}