export interface UserInfo {
  id: string;
  email: string;
  name: string;
  picture: string;
}

const authState: { user: UserInfo | null } = {
  user: null,
};

export function getAuthUser() {
  return authState.user;
}

export function setAuthUser(user: UserInfo | null) {
  authState.user = user;
}
