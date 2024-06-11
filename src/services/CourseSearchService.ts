import axios from 'axios';

import type { CourseSearchInterface } from '../interfaces/CourseSearchInterface';

const baseUrl = 'https://localhost:7245/api/';

async function search(pageNumber: number, query: string, category: string = 'all') {
    if (query === '') {
        const response = await axios.get(`${baseUrl}CourseSearch/search?PageNumber=${pageNumber}&PageSize=12&category=${category}`);
        const courses: CourseSearchInterface[] = response.data.data.result;
        const count: number = response.data.data.count;
        return { courses, count };
    } else {
        const response = await axios.get(`${baseUrl}CourseSearch/search?PageNumber=${pageNumber}&PageSize=12&query=${query}&category=${category}`);
        const courses: CourseSearchInterface[] = response.data.data.result;
        const count: number = response.data.data.count;
        return { courses, count };
    }
}

export default search;