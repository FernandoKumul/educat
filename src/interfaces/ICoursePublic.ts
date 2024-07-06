import { IUserMin } from "./IUserMin";

export interface ICoursePublic {
  pkCourse: number;
  fKInstructor: number;
  fkCategory: number | null;
  title: string;
  summary: string | null;
  language: string | null;
  difficulty: string | null;
  price: number | null;
  videoPresentation: string | null;
  cover: string | null;
  requeriments: string | null;
  description: string | null;
  learnText: string | null;
  tags: string | null;
  rating: number;
  numberStudents: number;
  purchased: boolean;
  active: boolean;
  cretionDate: string;
  updateDate: string;
  instructor: IUserMin;
  units: IUnitProgram[];
}

export interface IUnitProgram {
  pkUnit: number;
  fkCourse: number;
  order: number;
  title: string;
  lessons: ILessonProgram[];
}

export interface ILessonProgram {
  pkLesson: number;
  fkunit: number;
  title: string;
  type: typeLesson;
  timeDuration: number;
  order: number;
  cretionDate: string;
}

export type typeLesson = 'text' | 'video'