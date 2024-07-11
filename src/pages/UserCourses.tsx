import { useEffect, useState } from "react";
import WishlistService from "../services/WishlistService";
import { Tab, TabGroup, TabList } from "@tremor/react";
import { RiHeart3Line } from "@remixicon/react";

const UserCourses = () => {
    const [tabValue, setTabValue] = useState(0);
    useEffect(() => {
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
                <div>
                    <h1>Lista de deseos</h1>
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