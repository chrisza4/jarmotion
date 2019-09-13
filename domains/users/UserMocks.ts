import { IUser } from './UserTypes'

export function getMockUser(email: string, name: string): IUser {
  return {
    email,
    name
  }
}
