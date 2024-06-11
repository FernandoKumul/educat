import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { CourseSearchInterface } from '../interfaces/CourseSearchInterface';
import service from '../services/CourseSearchService';

import ReactPaginate from 'react-paginate';
import Cards from "../components/common/CardCourse";

const CourseSearch = () => {
    const [courses, setCourses] = useState<CourseSearchInterface[]>([]);
    const [count, setCount] = useState(0);

    const [params] = useSearchParams()

    const pages = Math.ceil(count / 8)

    async function search(pageNumber: number, query: string , category: string) {
        const results = await service(pageNumber, query, category)
        console.log(results)
        setCount(results.count)
        setCourses(results.courses)
    }

    useEffect(() => {
        search(1, params.get('q') || '', 'all')
    }, [params]);

    return (
        <div className="flex items-center flex-col">
            <h1 className=" text-3xl m-5 ">Resultados de busqueda</h1>
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
                    search(data.selected + 1, params.get('q') || '', 'all')
                }}
                containerClassName={"pagination"}
                activeClassName={"active"}
            />
        </div>
    );
}
export default CourseSearch;