import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { validate } from 'uuid';
import { TrackDto } from './dto/track.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { TrackDbService } from 'src/datasource/track-db.service';

@Injectable()
export class TrackService {
  constructor(private readonly trackDb: TrackDbService) {}

  getAll(): TrackDto[] {
    return this.trackDb.getAll();
  }

  getOne(id: string): TrackDto {
    const track = this.validateAndGetTrack(id);
    return track;
  }

  add(tr: CreateTrackDto): TrackDto {
    return this.trackDb.addTrack(tr);
  }

  update(id: string, tr: CreateTrackDto): TrackDto {
    const track = this.validateAndGetTrack(id);
    return this.trackDb.update(id, tr);
  }

  delete(id: string): void {
    const track = this.validateAndGetTrack(id);
    return this.trackDb.delete(id);
  }

  private validateAndGetTrack(id: string): TrackDto {
    if (!validate(id)) {
      throw new BadRequestException('ID is invalid');
    }
    const track = this.trackDb.getTrack(id);
    if (!track) {
      throw new NotFoundException('Track was not found');
    }
    return track;
  }
}