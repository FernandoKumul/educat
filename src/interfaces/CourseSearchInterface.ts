export interface CourseSearchInterface {
    pkCourse: number,
    title: string,
    difficulty: string,
    price: number,
    active: boolean,
    tags: string[],
    fkInstructor: number,
    instructorName: string,
    fkCategory: number,
    categoryName: string
}