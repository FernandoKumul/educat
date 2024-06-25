import { useEffect, useState } from "react";
import InstructorService from "../services/instructorService";
import { IInstructorInfo } from "../interfaces/IInstructorInfo";
import { RiFacebookCircleFill, RiYoutubeFill, RiLinkedinFill, RiTwitterXLine } from "@remixicon/react";
import userDefault from '../assets/userDefault.svg'


const InstructorProfile = () => {
    const [instructor, setInstructor] = useState<IInstructorInfo | null>();

    const redirectUrl = (url: string) => () => {
        window.open(url, '_blank')
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            InstructorService.getInstructorProfile(token).then((data) => {
                setInstructor(data)
            })
        }
    }, [])

    return (
        <div className="select-none p-10 flex flex-col md:flex-row h-full justify-around items-center">
            <section className="relative bg-black-auth p-10 rounded-md gap-y-5 text-center flex flex-col items-center max-w-sm">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <img
                        className=" w-44 h-44 rounded-full object-cover"
                        src={instructor?.avatarUrl || userDefault} 
                        alt="user image"
                    />
                </div>
                <div className="mt-14">
                    <p className="text-2xl text-white">{instructor?.name + ' ' + instructor?.lastName}</p>
                    <p className="text-sm text-secondary-text">{'Instructor | ' + instructor?.occupation}</p>
                </div>
                <div className="border-b border-black-2 w-full pb-5">
                    <p className="text-white">3.7 (100 Reseñas)</p>
                </div>
                <div className="grid grid-cols-2 justify-items-center gap-10 text-white">
                    <div>
                        <p className="text-xl">22</p>
                        <p className="text-sm text-gray-400">Cursos completados</p>
                    </div>
                    <div>
                        <p className="text-xl">2</p>
                        <p className="text-sm text-gray-400">Cursos impartidos</p>
                    </div>
                    <div className="col-span-2">
                        <p className="text-xl">3</p>
                        <p className="text-sm text-gray-400">Cursos en proceso</p>
                    </div>
                </div>
            </section>
            <section className="bg-black-auth rounded-md flex flex-col xl:w-[375px] xl:h-[408px] xl:p-10 xl:justify-between">
                <p className="text-white text-xl xl:mb-2">Descripción</p>
                <p className="text-secundary-text xl:mb-5 xl:flex-grow">{instructor?.description}</p>
                <div className="flex justify-center xl:gap-x-5">
                    <RiYoutubeFill className="cursor-pointer xl:size-10" />
                    <RiFacebookCircleFill className="cursor-pointer xl:size-10" />
                    <RiTwitterXLine className="cursor-pointer xl:size-10" />
                    <RiLinkedinFill className="cursor-pointer xl:size-10" />
                </div>
            </section>
        </div>
    );
}
export default InstructorProfile;