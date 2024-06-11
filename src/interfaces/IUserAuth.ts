export interface IUserAuth {
  pkUser: number;
  name: string;
  lastName: string;
  email: string;
  avatarUrl: string | null;
  isInstructor: boolean;
  creationDate: string;
}