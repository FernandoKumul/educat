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
  completed: boolean;
  cretionDate: string;
}

export type typeLesson = 'text' | 'video'

export interface ILessonOut {
  pkLesson: number;
  title: string;
  fkunit: number;
  text: string;
  order: number;
  timeDuration: number;
  type: typeLesson;
  completed: boolean;
  videoUrl: string;
  cretionDate: string;
}