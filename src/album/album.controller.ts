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
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AlbumService } from './album.service';
import { AlbumDto } from './dto/album.dto';
import { CreateAlbumDto } from './dto/create-album.dto';
import { ErrorGlobal } from 'src/error-global';
import { LoggingService } from 'src/logging/logging.service';

@ApiTags('album')
@Controller('album')
export class AlbumController {
  constructor(
    private readonly albumService: AlbumService,
    private readonly loggingService: LoggingService,
  ) {}

  @Get()
  getAll(): AlbumDto[] {
    this.loggingService.log('Getting all albums', 'Albums');
    return this.albumService.getAll();
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Album found',
    type: AlbumDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'AlbumId is invalid (not uuid)',
    type: ErrorGlobal,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No record with requested id',
    type: ErrorGlobal,
  })
  getAlbumById(@Param('id') id: string): AlbumDto {
    this.loggingService.log(`Getting album by id: ${id}`, 'Albums');
    return this.albumService.getAlbum(id);
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Album was created successfully',
    type: AlbumDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Body required fields are absent',
    type: ErrorGlobal,
  })
  @ApiBody({
    description: 'Artist creation request body',
    type: CreateAlbumDto,
    examples: {
      example1: {
        value: {
          name: 'Album Name',
          year: 2024,
        },
      },
    },
  })
  @HttpCode(HttpStatus.CREATED)
  createArtist(@Body() al: CreateAlbumDto): AlbumDto {
    this.loggingService.log(`Creating album: ${al.name}`, 'Albums');
    return this.albumService.addAlbum(al);
  }

  @Put(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Request is valid',
    type: AlbumDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'AlbumId is invalid (not uuid)',
    type: ErrorGlobal,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No record with requested id',
    type: ErrorGlobal,
  })
  update(@Param('id') id: string, @Body() al: CreateAlbumDto): AlbumDto {
    this.loggingService.log(`Updating album: ${id}`, 'Albums');
    return this.albumService.updateAlbum(id, al);
  }

  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Record was found and deleted',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'AlbumId is invalid (not uuid)',
    type: ErrorGlobal,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No record with requested id',
    type: ErrorGlobal,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string): void {
    this.loggingService.log(`Removing album: ${id}`, 'Albums');
    return this.albumService.delete(id);
  }
}
