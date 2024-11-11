import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { FavoritesService } from './favorites.service';
import { FavoritesResponseDto } from './dto/favorites-respose.dto';
import { ErrorGlobal } from 'src/error-global';

@ApiTags('favorites')
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favServise: FavoritesService) {}

  @Get()
  getAll(): FavoritesResponseDto {
    return this.favServise.getAll();
  }

  @Post('track/:id')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Track was added successfully',
    type: [String],
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'TrackID is invalid',
    type: ErrorGlobal,
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: "TrackId doesn't exist",
    type: ErrorGlobal,
  })
  @HttpCode(HttpStatus.CREATED)
  addTrack(@Param('id') id: string) {
    return this.favServise.addTrack(id);
  }

  @Delete('track/:id')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Record was found and deleted',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'TrackID is invalid',
    type: ErrorGlobal,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'TrackID is not in favorites',
    type: ErrorGlobal,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(@Param('id') id: string) {
    return this.favServise.deleteTrack(id);
  }

  @Post('album/:id')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Album was added successfully',
    type: [String],
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'AblumID is invalid',
    type: ErrorGlobal,
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: "AlbumId doesn't exist",
    type: ErrorGlobal,
  })
  @HttpCode(HttpStatus.CREATED)
  addAlbum(@Param('id') id: string) {
    return this.favServise.addAlbum(id);
  }

  @Delete('album/:id')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Record is found and deleted',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'AlbumID is invalid',
    type: ErrorGlobal,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'AlbumID is not in favorites',
    type: ErrorGlobal,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbum(@Param('id') id: string) {
    return this.favServise.deleteAlbum(id);
  }

  @Post('artist/:id')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Artist was added successfully',
    type: [String],
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'ArtistID is invalid',
    type: ErrorGlobal,
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: "ArtistID doesn't exist",
    type: ErrorGlobal,
  })
  @HttpCode(HttpStatus.CREATED)
  addArtist(@Param('id') id: string) {
    return this.favServise.addArtist(id);
  }

  @Delete('artist/:id')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Record is found and deleted',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'ArtistID is invalid',
    type: ErrorGlobal,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'ArtistID is not in favorites',
    type: ErrorGlobal,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(@Param('id') id: string) {
    return this.favServise.deleteArtist(id);
  }
}
