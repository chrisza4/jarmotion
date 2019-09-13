import { IUser } from '../domains/users/UserTypes'
import { authFetch } from './apiConnector'

export async function getMyself() {
  const res = await authFetch<IUser>('GET', 'api/users/me')
  if (res.status !== 200) {
    throw Error('Cannot fetch myself')
  }
  return res.body
}

export async function getUsersInRelationship() {
  const res = await authFetch<IUser[]>('GET', 'api/users/relationship')
  if (res.status !== 200) {
    throw Error('Cannot fetch myself')
  }
  return res.body
}
