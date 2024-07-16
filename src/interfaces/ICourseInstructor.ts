export interface ICourseInstructor {
  pkCourse: number;
  fKInstructor: number;
  fkCategory: number | null;
  title: string;
  price: number | null;
  cover: string | null;
  active: boolean;
  cretionDate: string;
  updateDate: string;
}