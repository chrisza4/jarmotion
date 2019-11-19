import { BASE_URL } from '../../apiServices/apiConnector'
import { IUser } from './UserTypes'

export function getThumbnailUrl(user: IUser): string {
  if (!user.photo_id) {
    return ''
  }
  return `${BASE_URL}avatar/thumb/${user.photo_id}`
}

export function getCapitalizeName(user: IUser): string {
  if (user.name.length <= 0) {
    return ''
  }
  return user.name[0].toUpperCase() + user.name.slice(1)
}
