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
import { TrackService } from './track.service';
import { TrackDto } from './dto/track.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { ErrorGlobal } from 'src/error-global';
@ApiTags('track')
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  getAll(): TrackDto[] {
    return this.trackService.getAll();
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Track found',
    type: TrackDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'TrackId is invalid (not uuid)',
    type: TrackDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "No record with requested id",
    type: TrackDto,
  })
  getArtistById(@Param('id') id: string): TrackDto {
    return this.trackService.getOne(id);
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Track was created successfully',
    type: TrackDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Body required fields are absent',
    type: ErrorGlobal,
  })
  @ApiBody({
    description: 'Track creation request body',
    type: CreateTrackDto,
    examples: {
      example1: {
        value: {
          name: 'Track Name',
          duration: 300,
        },
      },
    },
  })
  @HttpCode(HttpStatus.CREATED)
  createArtist(@Body() tr: CreateTrackDto): TrackDto {
    return this.trackService.add(tr);
  }

  @Put(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Request is valid',
    type: TrackDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'TrackId is invalid (not uuid)',
    type: ErrorGlobal,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "No record with requested id",
    type: ErrorGlobal,
  })
  update(@Param('id') id: string, @Body() tr: CreateTrackDto): TrackDto {
    return this.trackService.update(id, tr);
  }

  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Record was found and deleted',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'TrackId is invalid (not uuid)',
    type: ErrorGlobal,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "No record with requested id",
    type: ErrorGlobal,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string): void {
    return this.trackService.delete(id);
  }
}
