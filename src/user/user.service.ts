import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { validate } from 'uuid';
import { IUser } from 'src/interface/user.interface';
import { UserDBService } from 'src/datasource/user-db.service';

@Injectable()
export class UserService {
  constructor(private readonly userDb: UserDBService) {}

  private readonly invalidIDMessage = 'ID is invalid';
  private readonly nonexistedUserMessage = 'User doesn\'t exist';

  getUsers(){
    return this.userDb.getUsers();
  }

  getUser(id: string) {
    const user = this.validateAndGetUser(id);
    return this.userDb.getUser(id, false);
  }

  addUser(user: CreateUserDto) {
    return this.userDb.addUser(user);
  }

  updatePass(id: string, passes: UpdatePasswordDto) {
    const user = this.validateAndGetUser(id);
    if (user.password !== passes.oldPassword) {
      throw new ForbiddenException('Wrong password');
    }
    return this.userDb.update(id, passes.newPassword);
  }

  delete(id: string): void {
    this.validateAndGetUser(id);
    this.userDb.delete(id);
  }

  private validateAndGetUser(id: string): IUser {
    this.validateId(id);
    const user = this.userDb.getUser(id, true) as IUser;
    if (!user) {
      throw new NotFoundException(this.nonexistedUserMessage);
    }
    return user;
  }

  private validateId(id: string): void {
    if (!validate(id)) {
      throw new BadRequestException(this.invalidIDMessage);
    }
  }
}