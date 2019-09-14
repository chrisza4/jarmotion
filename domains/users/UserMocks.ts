import uuid from 'uuid'
import { IUser } from './UserTypes'

export function getMockUser(email: string, name: string): IUser {
  return {
    id: uuid.v4(),
    email,
    name
  }
}
