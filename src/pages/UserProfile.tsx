import { useEffect, useState } from "react";
import { IUserAuth } from "../interfaces/IUserAuth";
import { AxiosError } from "axios";
import userDefault from '../assets/userDefault.svg'
import { Button, TextInput } from "@tremor/react";
import { RiBriefcaseLine } from "@remixicon/react";
import AuthService from "../services/AuthService";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const UserProfile = () => {

    const [user, setUser] = useState<IUserAuth | null>();

    // Obtener los datos
    const getData = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const data = await AuthService.verifyToken(token);
                console.log(data)
                setUser(data)
            }
        }
        catch (error) {
            console.log(error)
            if (error instanceof AxiosError) {
                return console.log('Oops... Ocurrió un error, Intentelo más tarde');
            }
        }
    }

    // Editar los datos
    const{
        register,
        handleSubmit,
        formState:{ errors }
    } = useForm<IUserAuth>()

    const onSubmit: SubmitHandler<IUserAuth> = async (data) => {
        console.log(data)
    }

    useEffect(() => {
        getData()
    }, [])

    return(
        <div className="flex max-sm:flex-col justify-center items-center gap-y-9 gap-5 my-28">

            {/* Sección de vista de perfil de usuario */}
            <section className="w-2/5 relative bg-black-auth gap-y-6 p-5 rounded-md text-center flex flex-col items-center sm:p-10">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <img
                        className="size-40 sm:size-44 rounded-full object-cover"
                        src={user?.avatarUrl || userDefault} 
                        alt="user image"
                    />
                </div>
                <div className="mt-20">
                    <p className="text-2xl text-white">{user?.name + ' ' + user?.lastName}</p>
                    <p className="font-extralight text-base">Estudiante</p>
                </div>
                <div className="grid grid-cols-2 justify-items-center gap-10 text-white border-t border-white w-full pb-5 pt-7">
                    <div>
                        <p className="text-xl text-details font-bold">22</p>
                        <p className="text-sm text-gray-400">Cursos completados</p>
                    </div>
                    <div className="">
                        <p className="text-xl text-details font-bold">3</p>
                        <p className="text-sm text-gray-400">Cursos en proceso</p>
                    </div>
                </div>
                <Button className="bg-primary-600 flex" icon={RiBriefcaseLine}>Se instructor</Button>
            </section>

            {/* Sección de editar perfil */}
            <section className="">
                {/* cabecera: titulo y foto de perfil */}
                <div>
                    <p className="text-2xl text-white"> Editar mi perfil</p>
                </div>

                {/* subtitulo */}
                <p>Información Personal</p>

                {/* formulario */}
                <div className="w-3/5">
                    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-5">
                            <label htmlFor="name" className="block mb-1">Nombre</label>
                            <TextInput placeholder="" error={!!errors.name} errorMessage={errors.name?.message} {...register("name", {
                            required: "El nombre es requerido",
                            setValueAs: (value: string) => value.trim()
                            })} type="text" name="name" id="name"
                            className={`bg-transparent ${errors.name || 'border-[#9D9D9D]'} hover:bg-gray-700 icon-input-text-white`} autoComplete="off" />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="lastName" className="block mb-1">Apellido</label>
                            <TextInput placeholder="" error={!!errors.lastName} errorMessage={errors.lastName?.message} {...register("lastName", {
                                required: "El apellido es requerido",
                                setValueAs: (value: string) => value.trim()
                                })} type="text" name="lastName" id="lastName"
                                className={`bg-transparent ${errors.lastName || 'border-[#9D9D9D]'} hover:bg-gray-700 icon-input-text-white`} autoComplete="off" />
                            </div>

                    </form>

                </div>

                <Button type="submit">Guardar</Button>
                

            </section>
        </div>
    )

} 


export default UserProfile;