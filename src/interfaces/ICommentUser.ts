import { IUserMin } from "./IUserMin";

export interface ICommentUser {
    pkComment: number;
    fkCourse: number | null;
    fkLesson: number | null;
    text: string;
    likes: number
    score: number | null;
    cretionDate: string;
    user: IUserMin;
}