export interface IUser {
  readonly id: string
  readonly email: string
  readonly name: string
  readonly photo_id?: string
}

export interface IUserUpdate {
  readonly email: string
  readonly name: string
}

export enum UserType {
  Me,
  Couple
}
