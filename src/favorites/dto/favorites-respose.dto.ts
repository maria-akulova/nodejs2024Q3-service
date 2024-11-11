import { AlbumDto } from 'src/album/dto/album.dto';
import { ArtistDto } from 'src/artist/dto/artist.dto';
import { TrackDto } from 'src/track/dto/track.dto';

export class FavoritesResponseDto {
  readonly artists: ArtistDto[];
  readonly albums: AlbumDto[];
  readonly tracks: TrackDto[];
}
