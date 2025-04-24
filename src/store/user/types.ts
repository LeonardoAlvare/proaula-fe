export type UserState = {
  loading: boolean;
};

export type UserAction = {
  updateUser: (userId: string, user: UserDto) => Promise<void>;
};

export type UserDto = {
  name: string;
  lastname: string;
  email: string;
  password?: string;
  socialMedia?: string[];
  isFreelancer?: boolean;
};

export type User = UserDto & {
  _id: string;
};
