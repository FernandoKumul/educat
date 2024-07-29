import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import WishlistService from "../services/WishlistService";
import { RiCheckFill, RiHeart3Line, RiLoader4Line, RiLoopLeftFill } from "@remixicon/react";
import CardCourse from "../components/common/CardCourse";
import CourseService from "../services/CourseService";
import { ICourseSearch } from "../interfaces/ICourseSearch";

const UserCourses = () => {
    const { tab } = useParams();
    const navigate = useNavigate();
    const [tabValue, setTabValue] = useState<string>(tab || 'in-process');
    const [courses, setCourses] = useState<ICourseSearch[]>([])
    const [isLoading, setLoading] = useState<boolean>(true)

    const tabHandler = (tab: string) => {
        setTabValue(tab);
        const tabString = tab.toString();
        navigate(`/my-courses/${tabString}`);
    }

    const getWishlist = async () => {
        try {
            const response = await WishlistService.getUserWishlist();
            console.log(response)
            setCourses(response);
        } catch (error) {
            console.log(error)
            if (error instanceof AxiosError) {
                if (error.response?.data.message) {
                    return toast.error(error.response?.data.message);
                }
                return toast.error('Oops... Ocurrió un error, Inténtelo más tarde');
            }
        }
        finally {
            setLoading(false);
        }
    }

    const getInProcessCourses = async () => {
        try {
            const response = await CourseService.getInProcessCourses();
            console.log(response)
            setCourses(response);
        } catch (error) {
            console.log(error)
            if (error instanceof AxiosError) {
                if (error.response?.data.message) {
                    return toast.error(error.response?.data.message);
                }
                return toast.error('Oops... Ocurrió un error, Inténtelo más tarde');
            }
        }
        finally {
            setLoading(false);
        }
    }

    const getDoneCourses = async () => {
        try {
            const response = await CourseService.getDoneCourses();
            console.log(response)
            setCourses(response);
        } catch (error) {
            console.log(error)
            if (error instanceof AxiosError) {
                if (error.response?.data.message) {
                    return toast.error(error.response?.data.message);
                }
                return toast.error('Oops... Ocurrió un error, Inténtelo más tarde');
            }
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (tabValue === 'in-process') {
            getInProcessCourses();
        }
        if (tabValue === 'done') {
            getDoneCourses();
        }
        if (tabValue === 'wishlist') {
            getWishlist();
        }

        console.log(tabValue)
    }, [tabValue])

    useEffect(() => {
        tabHandler(tab || 'in-process');
        if (tabValue !== 'in-process' && tabValue !== 'done' && tabValue !== 'wishlist') {
            navigate('/my-courses/in-process');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tab])

    return (
        <div className="flex flex-col items-center p-10">
            <div className="flex lg:justify-center w-full md:w-[50%] overflow-auto select-none">
                <div className={`flex-grow flex items-center justify-center text-center p-2 cursor-pointer whitespace-nowrap border-b-2 ${tabValue === 'in-process' ? 'border-tremor-brand text-tremor-brand' : 'text-gray-500 border-gray-500 hover:text-secundary-text hover:border-secundary-text'}`} onClick={() => tabHandler('in-process')}>
                    <RiLoopLeftFill />
                    <span className="ml-2">En proceso</span>
                </div>
                <div className={`flex-grow flex items-center justify-center text-center p-2 cursor-pointer whitespace-nowrap border-b-2 ${tabValue === 'done' ? 'border-tremor-brand text-tremor-brand' : 'text-gray-500 border-gray-500 hover:text-secundary-text hover:border-secundary-text'}`} onClick={() => tabHandler('done')}>
                    <RiCheckFill />
                    <span className="ml-2">Terminados</span>
                </div>
                <div className={`flex-grow flex items-center justify-center text-center p-2 cursor-pointer whitespace-nowrap border-b-2 ${tabValue === 'wishlist' ? 'border-tremor-brand text-tremor-brand' : 'text-gray-500 border-gray-500 hover:text-secundary-text hover:border-secundary-text'}`} onClick={() => tabHandler('wishlist')}>
                    <RiHeart3Line />
                    <span className="ml-2">Lista de deseos</span>
                </div>
            </div>

            {isLoading &&
                <div className="flex-grow flex items-center justify-center">
                    <RiLoader4Line size={48} className="animate-spin" />
                </div>
            }
            {
                tabValue === 'in-process' &&
                <div className="mt-10 w-4/5 inline-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                    {courses.map((course) => (
                        <CardCourse key={course.pkCourse} id={course.pkCourse} title={course.title} instructor={course.instructorName + ' ' + course.instructorLastName} price={course.price ?? 0} image={course.cover} score={course.rating} />
                    ))}
                </div>
            }
            {
                tabValue === 'in-process' && courses.length === 0 &&
                <div className="flex flex-grow justify-center items-center flex-col">
                    <h1>Oops!</h1>
                    <p className="mb-2">{"No se tienes ningún curso adquirido (っ °Д °;)っ, compra uno y sigue aprendiendo!"}</p>
                    <img className="rounded-md w-3/4 md:w-1/2 lg:w-1/3" src="https://cataas.com/cat?tags=scared,nice&width=400" alt="cataas-img" />
                </div>
            }
            {
                tabValue === 'done' &&
                <div className="mt-10 w-4/5 inline-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                    {courses.map((course) => (
                        <CardCourse key={course.pkCourse} id={course.pkCourse} title={course.title} instructor={course.instructorName + ' ' + course.instructorLastName} price={course.price ?? 0} image={course.cover} score={course.rating} />
                    ))}
                </div>
            }
            {
                tabValue === 'done' && courses.length === 0 &&
                <div className="flex flex-grow justify-center items-center flex-col">
                    <h1>Oops!</h1>
                    <p className="mb-2">{"No se tienes ningún curso completado aún. (っ °Д °;)っ"}</p>
                    <img className="rounded-md w-3/4 md:w-1/2 lg:w-1/3" src="https://cataas.com/cat?tags=scared,nice&width=400" alt="cataas-img" />
                </div>
            }
            {
                tabValue === 'wishlist' &&
                <div className="mt-10 w-4/5 inline-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                    {courses.map((item) => (
                        <CardCourse key={item.pkCourse} id={item.pkCourse} title={item.title} instructor={item.instructorName + ' ' + item.instructorLastName} price={item.price ?? 0} image={item.cover} score={item.rating} />
                    ))}
                </div>

            }
            {
                tabValue === 'wishlist' && courses.length === 0 &&
                <div className="flex flex-grow justify-center items-center flex-col">
                    <h1>Oops!</h1>
                    <p className="mb-2">{"No se tienes ningún curso en tu lista de deseos (っ °Д °;)っ, agrega algunos que te llamen la atención!"}</p>
                    <img className="rounded-md w-3/4 md:w-1/2 lg:w-1/3" src="https://cataas.com/cat?tags=scared,nice&width=400" alt="cataas-img" />
                </div>
            }
        </div >
    );
}
export default UserCourses;