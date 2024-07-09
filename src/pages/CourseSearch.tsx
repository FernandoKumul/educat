import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { ICourseSearch } from '../interfaces/ICourseSearch';
import service from '../services/CourseSearchService';
import CategoriesData from "../data/CategoriesData";

import ReactPaginate from 'react-paginate';
import { Select, SelectItem, Button } from '@tremor/react';
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
    
    if (courses.length === 0) {
        if (category !== 'all') {
            return (
                <div className="flex flex-col items-center select-none p-5">
                    <h1 className=" text-3xl text-center my-5">No se encontraron resultados con esa categoría</h1>
                    <Button onClick={() => {
                        setCategory('all')
                    }}>Ver todas las categorias</Button>
                </div>
            )
        }
        return (
            <div className="flex flex-col items-center select-none p-5">
                <h1 className=" text-3xl text-center my-5">No se encontraron resultados</h1>
                <Button onClick={() => {
                    search(1, '', 'all')
                }}>Ver todos los cursos</Button>
            </div>
        )
    }
    return (
        <div className="flex flex-col items-center select-none p-5">
            <div className="flex flex-col xl:flex-row w-5/6 justify-between items-center">
                <h1 className=" text-3xl text-center my-5">Resultados de la búsqueda</h1>
                <div className="w-[200px]">
                    <Select value={category} onValueChange={setCategory} >
                        <SelectItem value="all">Todas las categorías</SelectItem>
                        {CategoriesData.map((category) => (
                            <SelectItem key={category.id} value={category.name}>{category.name}</SelectItem>
                        ))}
                    </Select>
                </div>
            </div>
            <section className="mt-5 inline-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                {courses.map((course) => (
                    <Cards key={course.pkCourse} id={String(course.pkCourse)} title={course.title} instructor={course.instructorName} price={String(course.price)} image={course.cover} score={4.7} />
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