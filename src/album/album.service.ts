import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { validate } from 'uuid';
import { AlbumDto } from './dto/album.dto';
import { CreateAlbumDto } from './dto/create-album.dto';
import { AlbumDBService } from 'src/datasource/album-db.service';

@Injectable()
export class AlbumService {
  constructor(private readonly albumDb: AlbumDBService) {}

  getAll(): AlbumDto[] {
    return this.albumDb.getAll();
  }

  getAlbum(id: string): AlbumDto {
    const album = this.validateAndGetAlbum(id);
    return album;
  }

  addAlbum(al: CreateAlbumDto): AlbumDto {
    return this.albumDb.addAlbum(al);
  }

  updateAlbum(id: string, al: CreateAlbumDto): AlbumDto {
    const album = this.validateAndGetAlbum(id);
    return this.albumDb.update(id, al);
  }

  delete(id: string): void {
    const album = this.validateAndGetAlbum(id);
    return this.albumDb.delete(id);
  }

  private validateAndGetAlbum(id: string): AlbumDto {
    if (!validate(id)) {
      throw new BadRequestException('ID is not valid');
    }
    const album = this.albumDb.getAlbum(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }
}