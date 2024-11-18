import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID, ValidateIf } from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  readonly name: string;
  @IsNotEmpty()
  @IsNumber()
  readonly year: number;
  @IsNotEmpty()
  @IsUUID()
  @ValidateIf((object, value) => value !== null)
  @ApiProperty({ nullable: true, type: String })
  readonly artistId: string | null;
}
