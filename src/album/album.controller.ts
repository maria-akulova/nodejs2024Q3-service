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

@ApiTags('album')
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  getAll(): AlbumDto[] {
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
    description: "No record with requested id",
    type: ErrorGlobal,
  })
  getAlbumById(@Param('id') id: string): AlbumDto {
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
    description: "No record with requested id",
    type: ErrorGlobal,
  })
  update(@Param('id') id: string, @Body() al: CreateAlbumDto): AlbumDto {
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
    description: "No record with requested id",
    type: ErrorGlobal,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string): void {
    return this.albumService.delete(id);
  }
}
