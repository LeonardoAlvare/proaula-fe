import { User, UserDto } from "../user/types";

export type AuthState = {
  userLogged: User | null;
  loading: boolean;
};

export type AuthActions = {
  register: (data: UserDto) => Promise<void>;
  login: (data: LoginUser) => Promise<void>;
  logout: () => void;
  setUserLogged: (user: User) => void;
  changePassword: (userId: string, data: ChangePassword) => Promise<boolean>;
};

export type ChangePassword = {
  email: string;
  newPassword: string;
  oldPassword: string;
};

export type LoginUser = {
  email: string;
  password: string;
};

export type RegisterResponse = {
  message: string;
  status: number;
  user: User;
};
