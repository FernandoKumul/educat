import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import WishlistService from "../services/WishlistService";
import { ICartItemCourse } from "../interfaces/ICartItemCourse";
import CardCourse from "../components/common/CardCourse";
import { Tab, TabGroup, TabList } from "@tremor/react";
import { RiHeart3Line } from "@remixicon/react";

const UserCourses = () => {
    const [tabValue, setTabValue] = useState(1);
    const [wishlist, setWishlist] = useState<ICartItemCourse[]>([]);

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
    }

    useEffect(() => {
        if (tabValue === 1) {
            getWishlist();
        }
        console.log(tabValue)
    }, [tabValue])
    return (
        <div className="flex flex-col items-center p-10">
            <TabGroup className="w-fit">
                <TabList variant="line" color={'tremor-brand'}>
                    <Tab value={tabValue} onClick={() => setTabValue(1)} icon={RiHeart3Line}>Lista de deseos</Tab>
                    <Tab value={tabValue} onClick={() => setTabValue(2)}>En proceso</Tab>
                    <Tab value={tabValue} onClick={() => setTabValue(3)}>Terminados</Tab>
                </TabList>
            </TabGroup>
            {
                tabValue === 1 &&
                <div className="mt-10 inline-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                    {wishlist.map((item) => (
                        <CardCourse key={item.pkCartWishList} id={item.course.pkCourse} title={item.course.title} instructor={item.instructor.name + ' ' + item.instructor.lastName} price={String(item.course.price)} image={item.course.cover} score={4.7} />
                    ))}
                </div>
            }
            {
                tabValue === 2 &&
                <div>
                    <h1>En proceso</h1>
                </div>
            }
            {
                tabValue === 3 &&
                <div>
                    <h1>Terminados</h1>
                </div>
            }
        </div>
    );
}
export default UserCourses;