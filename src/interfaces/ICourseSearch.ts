export interface ICourseSearch {
    pkCourse: number,
    title: string,
    difficulty: string,
    cover: string,
    price: number,
    active: boolean,
    tags: string[],
    rating: number,
    fkInstructor: number,
    instructorName: string,
    instructorLastName: string,
    fkCategory: number,
    categoryName: string
}