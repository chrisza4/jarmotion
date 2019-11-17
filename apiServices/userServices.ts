import { IUser, IUserUpdate } from '../domains/users/UserTypes'
import { authFetch, authUpload } from './apiConnector'

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

export async function uploadAvatar(uri: string) {
  const data = createUploadData(uri)
  const res = await authUpload<IUser>('api/users/avatar', data)
  if (res.status !== 200) {
    throw Error('Cannot upload avatar')
  }
  return res.body
}

function createUploadData(uri: string, body?: { [key: string]: string }) {
  const uriParts = uri.split('.')
  const fileType = uriParts[uriParts.length - 1]

  const formData = new FormData()
  formData.append('avatar', ({
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`
  } as unknown) as Blob)
  if (body) {
    Object.keys(body).forEach(key => {
      formData.append(key, body[key])
    })
  }

  return formData
}
