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
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { ErrorGlobal } from 'src/error-global';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers(): UserDto[] {
    return this.userService.getUsers();
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User found',
    type: UserDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'UserId is invalid (not uuid)',
    type: ErrorGlobal,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "No record with requested id",
    type: ErrorGlobal,
  })
  getUserById(@Param('id') id: string): UserDto {
    return this.userService.getUser(id);
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User was created successfully',
    type: UserDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Body required fields are absent',
    type: ErrorGlobal,
  })
  @ApiBody({
    description: 'User creation request body',
    type: CreateUserDto,
    examples: {
      example1: {
        value: {
          login: 'exampleUser',
          password: 'examplePassword',
        },
      },
    },
  })

  @HttpCode(HttpStatus.CREATED)
  createUser(@Body() user: CreateUserDto): UserDto {
    return this.userService.addUser(user);
  }

  @Put(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Request is valid',
    type: UserDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'UserId is invalid (not uuid)',
    type: ErrorGlobal,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "No record with requested id",
    type: ErrorGlobal,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Old Password is invalid',
    type: ErrorGlobal,
  })
  updatePass(
    @Param('id') id: string,
    @Body() passes: UpdatePasswordDto,
  ): UserDto {
    return this.userService.updatePass(id, passes);
  }

  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Record is found and deleted',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'UserId is invalid (not uuid)',
    type: ErrorGlobal,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "No record with requested id",
    type: ErrorGlobal,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Param('id') id: string): void {
    return this.userService.delete(id);
  }
}
