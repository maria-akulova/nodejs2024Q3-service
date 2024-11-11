import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateArtistDto } from './dto/create-artist.dto';
import { ArtistDto } from './dto/artist.dto';
import { ErrorGlobal } from 'src/error-global';

@ApiTags('artist')
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  getAll(): ArtistDto[] {
    return this.artistService.getAll();
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Artist found',
    type: ArtistDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Artistid is invalid (not uuid)',
    type: ErrorGlobal,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "No record with requested id",
    type: ErrorGlobal,
  })
  getArtistById(@Param('id') id: string): ArtistDto {
    return this.artistService.getArtist(id);
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Artist was created successfully',
    type: ArtistDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Body required fields are absent',
    type: ErrorGlobal,
  })
  @ApiBody({
    description: 'Artist creation request body',
    type: CreateArtistDto,
    examples: {
      example1: {
        value: {
          name: 'Artist Name',
          grammy: true,
        },
      },
    },
  })
  @HttpCode(HttpStatus.CREATED)
  createArtist(@Body() art: CreateArtistDto): ArtistDto {
    return this.artistService.addArtist(art);
  }

  @Put(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Request is valid',
    type: ArtistDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Artistid is invalid (not uuid)',
    type: ErrorGlobal,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "No record with requested id",
    type: ErrorGlobal,
  })
  update(@Param('id') id: string, @Body() art: CreateArtistDto): ArtistDto {
    return this.artistService.updateArtist(id, art);
  }

  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Record was found and deleted',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Artistid is invalid (not uuid)',
    type: ErrorGlobal,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "No record with requested id",
    type: ErrorGlobal,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string): void {
    return this.artistService.delete(id);
  }
}
