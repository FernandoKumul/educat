import { ICourseMin } from "./ICourseMin";
import { IUserMin } from "./IUserMin";

export interface ICartItemCourse {
  pkCartWishList: number;
  fkCourse: number;
  fkUser: number;
  type: 'cart' | 'wish';
  creationDate: string;
  course: ICourseMin;
  instructor: IUserMin;
}