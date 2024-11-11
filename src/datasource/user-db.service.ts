import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { IUser, IUserSafety } from 'src/interface/user.interface';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class UserDBService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {
    this.DB = [];
  }
  private DB: IUser[];

  searchUserById(id: string): IUser{
    return   this.DB.find((user) => user.id === id);
  }

  indexByUserId(id: string): number{
    return this.DB.findIndex((user) => user.id === id);
  }

  getUsers() {
    return this.DB.map((user) => this.excludePassword(user));
  }

  getUser(id: string, isPassword = false): IUserSafety | IUser {
    const user = this.searchUserById(id);
    return isPassword ? user: this.excludePassword(user);
  }

  addUser(user: CreateUserDto): IUserSafety {
    const createdUser = this.createUser(user);
    this.DB.push(createdUser);
    const modifyUser = { ...createdUser };
    delete modifyUser.password;
    return modifyUser;
  }

  update(id: string, updatePassword: string): IUserSafety {
    const user = this.getUser(id, true) as IUser;
    user.password = updatePassword;
    user.version++;
    user.updatedAt = Date.now();

    return this.excludePassword(user);
  }

  delete(id: string) {
    const userIndex = this.indexByUserId(id);
    this.DB.splice(userIndex, 1);
  }

  private excludePassword(user: IUser): IUserSafety {
    if (!user) {
      return;
    }
    const safeUser = { ...user };
    delete safeUser.password;
    return safeUser as IUserSafety;
  }

  private createUser(user: CreateUserDto): IUser {
    const time = Date.now();
    const newUser = {
      id: randomUUID(),
      login: user.login,
      password: user.password,
      version: 1,
      createdAt: time,
      updatedAt: time,
    };
    return newUser;
  }
}

