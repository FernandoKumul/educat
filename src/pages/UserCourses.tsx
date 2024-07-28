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
    const tabInt = parseInt(tab ?? '1');
    const navigate = useNavigate();
    const [tabValue, setTabValue] = useState(tabInt);
    const [wishlist, setWishlist] = useState<ICourseSearch[]>([]);
    const [courses, setCourses] = useState<ICourseSearch[]>([])
    const [isLoading, setLoading] = useState<boolean>(true)

    const tabHandler = (tab: number) => {
        setTabValue(tab);
        const tabString = tab.toString();
        navigate(`/my-courses/${tabString}`);
    }

    const getWishlist = async () => {
        try {
            const response = await WishlistService.getUserWishlist();
            console.log(response)
            setWishlist(response);
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

    const getCourses = async () => {
        try {
            const response = await CourseService.getPurchasedCourses();
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
        if (tabValue === 1) {
            getCourses();
        }
        if (tabValue === 3) {
            getWishlist();
        }
        console.log(tabValue)
    }, [tabValue])

    useEffect(() => {
        tabHandler(tabInt);
    }, [tab])

    return (
        <div className="flex flex-col items-center p-10">
            <div className="flex lg:justify-center w-full md:w-[50%] overflow-auto select-none">
                <div className={`flex-grow flex items-center justify-center text-center p-2 cursor-pointer whitespace-nowrap border-b-2 ${tabValue === 1 ? 'border-tremor-brand text-tremor-brand' : 'text-gray-500 border-gray-500 hover:text-secundary-text hover:border-secundary-text'}`} onClick={() => tabHandler(1)}>
                    <RiLoopLeftFill />
                    <span className="ml-2">En proceso</span>
                </div>
                <div className={`flex-grow flex items-center justify-center text-center p-2 cursor-pointer whitespace-nowrap border-b-2 ${tabValue === 2 ? 'border-tremor-brand text-tremor-brand' : 'text-gray-500 border-gray-500 hover:text-secundary-text hover:border-secundary-text'}`} onClick={() => tabHandler(2)}>
                    <RiCheckFill />
                    <span className="ml-2">Terminados</span>
                </div>
                <div className={`flex-grow flex items-center justify-center text-center p-2 cursor-pointer whitespace-nowrap border-b-2 ${tabValue === 3 ? 'border-tremor-brand text-tremor-brand' : 'text-gray-500 border-gray-500 hover:text-secundary-text hover:border-secundary-text'}`} onClick={() => tabHandler(3)}>
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
                tabValue === 1 &&
                <div className="mt-10 w-4/5 inline-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                    {courses.map((course) => (
                        <CardCourse key={course.pkCourse} id={course.pkCourse} title={course.title} instructor={course.instructorName + ' ' + course.instructorLastName} price={course.price ?? 0} image={course.cover} score={course.rating} />
                    ))}
                </div>
            }
            {
                tabValue === 2 &&
                <div>
                    <h1>Terminados</h1>
                </div>
            }
            {
                tabValue === 3 &&
                <div className="mt-10 w-4/5 inline-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                    {wishlist.map((item) => (
                        <CardCourse key={item.pkCourse} id={item.pkCourse} title={item.title} instructor={item.instructorName + ' ' + item.instructorLastName} price={item.price ?? 0} image={item.cover} score={item.rating} />
                    ))}
                </div>
            }
        </div >
    );
}
export default UserCourses;