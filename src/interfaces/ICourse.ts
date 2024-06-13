// import { UnitEditOutDTO } from "./unitEditOutDTO";

export interface CourseEditOutDTO {
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
    // units: UnitEditOutDTO[];
}