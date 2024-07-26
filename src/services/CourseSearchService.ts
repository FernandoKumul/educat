import axios from 'axios';

import type { ICourseSearch } from '../interfaces/ICourseSearch';

const BASE_URL =  import.meta.env.VITE_URL_API ?? 'https://localhost:7245/api'

async function search(pageNumber: number, query: string, category: string = 'all') {
    if (query === '') {
        const response = await axios.get(`${BASE_URL}/CourseSearch/search?PageNumber=${pageNumber}&PageSize=12&category=${category}`);
        const courses: ICourseSearch[] = response.data.data.result;
        const count: number = response.data.data.count;
        return { courses, count };
    } else {
        const response = await axios.get(`${BASE_URL}/CourseSearch/search?PageNumber=${pageNumber}&PageSize=12&query=${query}&category=${category}`);
        const courses: ICourseSearch[] = response.data.data.result;
        const count: number = response.data.data.count;
        return { courses, count };
    }
}

export default search;