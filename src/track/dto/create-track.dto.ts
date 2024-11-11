import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, ValidateIf } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  readonly name: string;
  @IsNotEmpty()
  @ValidateIf((object, value) => value !== null)
  @ApiProperty({ nullable: true, type: String })
  readonly artistId: string | null;
  @IsNotEmpty()
  @ValidateIf((object, value) => value !== null)
  @ApiProperty({ nullable: true, type: String })
  readonly albumId: string | null;
  @IsNotEmpty()
  readonly duration: number;
}
