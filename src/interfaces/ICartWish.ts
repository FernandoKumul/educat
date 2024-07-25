export interface ICartWish {
  pkCartWishList: number;
  fkCourse: number;
  fkUser: number;
  type: 'cart' | 'wish';
  creationDate: string;
}