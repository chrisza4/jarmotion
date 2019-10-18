jest.mock('../apiServices/userServices.ts')
import * as UserServices from '../apiServices/userServices'
import { getMockUser } from '../domains/users/UserMocks'
import UserStore from './UserStore'

describe('Init', () => {
  it('should get me and couple', async () => {
    const mockedGetMyself = UserServices.getMyself as jest.Mock
    const mockGetUsersInRelationship = UserServices.getUsersInRelationship as jest.Mock
    mockedGetMyself.mockResolvedValue(
      getMockUser({ email: 'chakrit.lj@gmail.com', name: 'chris' })
    )
    mockGetUsersInRelationship.mockResolvedValue([
      getMockUser({ email: 'awa@gmail.com', name: 'awa' })
    ])

    await UserStore.init()
    expect(UserStore.me.email).toEqual('chakrit.lj@gmail.com')
    expect(UserStore.me.name).toEqual('chris')

    expect(UserStore.couple.email).toEqual('awa@gmail.com')
    expect(UserStore.couple.name).toEqual('awa')
  })
})
