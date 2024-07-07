import { ICourseMin } from "./ICourseMin";

export interface ICartItemCourse {
  pkCartWishList: number;
  fkCourse: number;
  fkUser: number;
  type: 'cart';
  creationDate: string;
  course: ICourseMin;
}