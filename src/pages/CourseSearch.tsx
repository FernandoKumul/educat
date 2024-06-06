import Cards from "../components/Cards";

const CourseSearch = () => {
    return (
        <div className="flex items-center flex-col">
            <h1 className=" text-3xl m-5 ">Resultados de busqueda</h1>
            <section className="mt-5 inline-grid grid-cols-1 xl:grid-cols-4 gap-10">
                <Cards title="Titulo" instructor="Instructor" price="$27" score={4.7} />
                <Cards title="Titulo" instructor="Instructor" price="$27" score={4.7} />
                <Cards title="Titulo" instructor="Instructor" price="$27" score={4.7} />
                <Cards title="Titulo" instructor="Instructor" price="$27" score={4.7} />
                <Cards title="Titulo" instructor="Instructor" price="$27" score={4.7} />
                <Cards title="Titulo" instructor="Instructor" price="$27" score={4.7} />
                <Cards title="Titulo" instructor="Instructor" price="$27" score={4.7} />
                <Cards title="Titulo" instructor="Instructor" price="$27" score={4.7} />
            </section>
        </div>
    );
}
export default CourseSearch;