export type UserRole = 'admin' | 'manager' | 'learner'

export interface CurrentUser {
  id: string
  name: string
  role: UserRole
}

const MOCK_USER: CurrentUser = {
  id: 'u_admin',
  name: 'Divjot Singh',
  role: 'admin',
}

export function useCurrentUser(): CurrentUser {
  return MOCK_USER
}
