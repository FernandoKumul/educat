import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import InstructorService from "../services/instructorService";
import { IInstructorInfo } from "../interfaces/IInstructorInfo";
import { RiFacebookCircleFill, RiYoutubeFill, RiLinkedinFill, RiTwitterXLine } from "@remixicon/react";
import userDefault from '../assets/userDefault.svg'

const InstructorProfile = () => {
    const [instructor, setInstructor] = useState<IInstructorInfo | null>();

    const redirectUrl = (url: string | undefined) => () => {
        window.open(url, '_blank')
    }

    const getData = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const data = await InstructorService.getInstructorProfile(token);
                setInstructor(data)
            }
        }
        catch (error) {
            console.log(error)
            if (error instanceof AxiosError) {
                return console.log('Oops... Ocurrió un error, Intentelo más tarde');
            }
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="select-none p-10 flex flex-col h-full items-center justify-center gap-y-5 max-sm:mt-14 xl:flex-row xl:justify-around">
            <section className="relative bg-black-auth p-5 rounded-md gap-y-5  max-w-sm text-center flex flex-col items-center max-sm:w-full sm:p-10">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <img
                        className="size-28 sm:size-44 rounded-full object-cover"
                        src={instructor?.avatarUrl || userDefault} 
                        alt="user image"
                    />
                </div>
                <div className="mt-14">
                    <p className="text-2xl text-white">{instructor?.name + ' ' + instructor?.lastName}</p>
                    { instructor?.occupation ? <p className="text-sm text-secondary-text">{'Instructor | ' + instructor?.occupation}</p> : <p className="text-sm text-secondary-text">Sin ocupación</p> }
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
            <section className="bg-black-auth rounded-md flex flex-col w-full p-5 sm:w-[375px] sm:p-10 xl:h-[408px] xl:justify-between overflow-auto">
                <p className="text-white text-xl mb-2">Descripción</p>
                <p className="text-secundary-text mb-5 xl:flex-grow">{instructor?.description}</p>
                <div className="flex justify-center gap-x-5">
                    { instructor?.youtubeUser && <RiYoutubeFill onClick={redirectUrl(instructor?.youtubeUser)} className="cursor-pointer size-7 sm:size-10 hover:opacity-75 hover:transition-opacity" /> }
                    { instructor?.facebookUser && <RiFacebookCircleFill onClick={redirectUrl(instructor?.facebookUser)} className="cursor-pointer size-7 sm:size-10 hover:opacity-75 hover:transition-opacity" /> }
                    { instructor?.twitterUser && <RiTwitterXLine onClick={redirectUrl(instructor?.twitterUser)} className="cursor-pointer size-7 sm:size-10 hover:opacity-75 hover:transition-opacity" /> }
                    { instructor?.linkediId && <RiLinkedinFill onClick={redirectUrl(instructor?.linkediId)} className="cursor-pointer size-7 sm:size-10 hover:opacity-75 hover:transition-opacity" /> }
                </div>
            </section>
        </div>
    );
}
export default InstructorProfile;