export interface ICourseSearch {
    pkCourse: number,
    title: string,
    difficulty: string,
    cover: string,
    price: number,
    active: boolean,
    tags: string[],
    fkInstructor: number,
    instructorName: string,
    fkCategory: number,
    categoryName: string
}