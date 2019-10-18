import uuid from 'uuid'
import { IUser } from './UserTypes'

export function getMockUser(props: Partial<IUser>): IUser {
  return {
    id: uuid.v4(),
    email: 'test@test.com',
    name: 'tester',
    ...props
  }
}
