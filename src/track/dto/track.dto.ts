import { ApiProperty } from '@nestjs/swagger';
import { ITrack } from 'src/interface/track.interface';

export class TrackDto implements ITrack {
  readonly id: string;
  readonly name: string;
  @ApiProperty({ nullable: true, type: String })
  readonly albumId: string;
  @ApiProperty({ nullable: true, type: String })
  readonly artistId: string;
  readonly duration: number;
}
