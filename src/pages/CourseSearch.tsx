import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { ICourseSearch } from '../interfaces/ICourseSearch';
import service from '../services/CourseSearchService';
import CategoriesData from "../data/CategoriesData";

import ReactPaginate from 'react-paginate';
import { Select, SelectItem } from '@tremor/react';
import Cards from "../components/common/CardCourse";

const CourseSearch = () => {
    const [courses, setCourses] = useState<ICourseSearch[]>([]);
    const [count, setCount] = useState(0);
    const [category, setCategory] = useState('all');

    const [params] = useSearchParams()

    const pages = Math.ceil(count / 12)

    async function search(pageNumber: number, query: string, category: string) {
        const results = await service(pageNumber, query, category)
        console.log(results)
        setCount(results.count)
        setCourses(results.courses)
    }

    useEffect(() => {
        search(1, params.get('q') || '', category)
    }, [category, params]);

    return (
        <div className="flex flex-col items-center select-none">
            <h1 className=" text-3xl text-center m-5">Resultados de busqueda</h1>
            <div className="flex px-32 w-full justify-end items-center">
                <div className="w-[300px]">
                    <Select value={category} onValueChange={setCategory} >
                        <SelectItem value="all">Todas las categorias</SelectItem>
                        {CategoriesData.map((category) => (
                            <SelectItem key={category.id} value={category.name}>{category.name}</SelectItem>
                        ))}
                    </Select>
                </div>
            </div>
            <section className="mt-5 inline-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                {courses.map((course) => (
                    <Cards key={course.pkCourse} title={course.title} instructor={course.instructorName} price={String(course.price)} score={4.7} />
                ))}
            </section>
            <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                breakLabel={"..."}
                pageCount={pages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={(data) => {
                    search(data.selected + 1, params.get('q') || '', category)
                }}
                containerClassName={"pagination"}
                activeClassName={"active"}
            />
        </div>
    );
}
export default CourseSearch;