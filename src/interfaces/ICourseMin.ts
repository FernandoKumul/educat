
export interface ICourseMin {
  pkCourse: number;
  fKInstructor: number;
  fkCategory: number | null;
  title: string;
  summary: string;
  price: number | null;
  cover: string;
  active: boolean;
  cretionDate: string;
  updateDate: string;
}