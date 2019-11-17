import { IUser, IUserUpdate } from '../domains/users/UserTypes'
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
    throw Error('Cannot fetch user in relationship')
  }
  return res.body
}

export async function updateProfile(updates: IUserUpdate) {
  const res = await authFetch<IUser>('POST', 'api/users/me', updates)
  if (res.status !== 200) {
    throw Error('Cannot edit profile of myself')
  }
  return res.body
}
