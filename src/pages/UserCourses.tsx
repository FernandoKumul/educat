import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import WishlistService from "../services/WishlistService";
import { Tab, TabGroup, TabList } from "@tremor/react";
import { RiCheckFill, RiHeart3Line, RiLoader4Line, RiLoopLeftFill } from "@remixicon/react";
import CardCourse from "../components/common/CardCourse";
import CourseService from "../services/CourseService";
import { ICourseSearch } from "../interfaces/ICourseSearch";

const UserCourses = () => {
    const [tabValue, setTabValue] = useState(1);
    const [wishlist, setWishlist] = useState<ICourseSearch[]>([]);
    const [courses, setCourses] = useState<ICourseSearch[]>([])
    const [isLoading, setLoading] = useState<boolean>(true)

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
            getWishlist();
        }
        if (tabValue === 2) {
            getCourses();
        }
        console.log(tabValue)
    }, [tabValue])
    return (
        <div className="flex flex-col items-center p-10">
            <div className="overflow-auto w-full">
                <TabGroup className="w-fit mx-auto">
                    <TabList variant="line" color={'tremor-brand'}>
                        <Tab value={tabValue} onClick={() => setTabValue(1)} icon={RiHeart3Line}>Lista de deseos</Tab>
                        <Tab value={tabValue} onClick={() => setTabValue(2)} icon={RiLoopLeftFill}>En proceso</Tab>
                        <Tab value={tabValue} onClick={() => setTabValue(3)} icon={RiCheckFill}>Terminados</Tab>
                    </TabList>
                </TabGroup>
            </div>
            {isLoading &&
                <div className="flex-grow flex items-center justify-center">
                    <RiLoader4Line size={48} className="animate-spin" />
                </div>
            }
            {
                tabValue === 1 &&
                <div className="mt-10 w-4/5 inline-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                    {wishlist.map((item) => (
                        <CardCourse key={item.pkCourse} id={item.pkCourse} title={item.title} instructor={item.instructorName + ' ' + item.instructorLastName} price={item.price ?? 0} image={item.cover} score={item.rating} />
                    ))}
                </div>
            }
            {
                tabValue === 2 &&
                <div className="mt-10 w-4/5 inline-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                    {courses.map((course) => (
                        <CardCourse key={course.pkCourse} id={course.pkCourse} title={course.title} instructor={course.instructorName + ' ' + course.instructorLastName} price={course.price ?? 0} image={course.cover} score={course.rating} />
                    ))}
                </div>
            }
            {
                tabValue === 3 &&
                <div>
                    <h1>Terminados</h1>
                </div>
            }
        </div >
    );
}
export default UserCourses;