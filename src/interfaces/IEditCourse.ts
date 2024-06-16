export interface IEditCourse {
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
  active: boolean;
  cretionDate: string;
  updateDate: string;
  units: IEditUnit[];
}

export interface IEditUnit {
    pkUnit?: number;
    fkCourse: number;
    order: number;
    title: string;
    lessons: IEditLesson[];
}

export interface IEditLesson {
  pkLesson?: number;
  fkunit: number;
  title: string;
  type: typeLesson;
  videoUrl: string | null;
  text: string | null;
  timeDuration: number;
  order: number;
  cretionDate: string;
}

export type typeLesson = 'text' | 'video'