import uuid from 'uuid'
import { IUser } from './UserTypes'

export function getMockUser(email: string, name: string, id?: string): IUser {
  return {
    id: id || uuid.v4(),
    email,
    name
  }
}
