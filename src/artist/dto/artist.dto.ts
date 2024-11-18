import { IArtist } from "src/interface/artist.interface";

export class ArtistDto implements IArtist {
  readonly id: string;
  readonly name: string;
  readonly grammy: boolean;
}
