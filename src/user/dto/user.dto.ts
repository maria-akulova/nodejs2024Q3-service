import { IUserSafety } from "src/interface/user.interface";

export class UserDto implements IUserSafety {
  readonly id: string;
  readonly login: string;
  readonly version: number;
  readonly createdAt: number;
  readonly updatedAt: number;
}
