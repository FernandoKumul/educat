import { FormEvent, useEffect, useRef, useState } from "react";
import { IUserAuth } from "../interfaces/IUserAuth";
import { AxiosError } from "axios";
import userDefault from '../assets/userDefault.svg'
import { Button, TextInput } from "@tremor/react";
import { RiBriefcaseLine, RiImageEditLine, RiLoader4Line } from "@remixicon/react";
import AuthService from "../services/AuthService";
import { SubmitHandler, useForm } from "react-hook-form";
import UserEditService from "../services/UserEditService";
import { toast } from "react-toastify";
import FileService from "../services/FileService";

const UserProfile = () => {

    const [loading, setLoading] = useState(false)

    const [isLoadingImg, setLoadingImg] = useState<boolean>(false)
    const [imgUrl, setImgUrl] = useState<string | null>(null)
    const inputImgRef = useRef<HTMLInputElement>(null)

    const [user, setUser] = useState<IUserAuth | null>();

    // Obtener los datos
    const getData = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const data = await AuthService.verifyToken(token);
                console.log(data)
                setUser(data)
                setValue("name", data.name)
                setValue("lastName", data.lastName)
                setImgUrl(data.avatarUrl)            
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
        setValue,
        handleSubmit,
        formState:{ errors }
    } = useForm<IUserAuth>()

    // Guardar imagen
    const handleSubmitImage = async (e: FormEvent<HTMLInputElement>) => {
        const target = e.currentTarget
        const files = target.files;

        if (!files || files.length === 0) {
            console.error('No se seleccionó ningún archivo.');
            return
        }
        try {
            const file = files[0];
            const formData = new FormData();
            formData.append('file', file);

            setLoadingImg(true)
            const newUrl = await FileService.submitImage(formData)
            setImgUrl(newUrl)
        } catch (error) {
            console.log(error)
            if (error instanceof AxiosError) {
                toast.error('La imagen no se logró subir');
            }
        } finally {
            setLoadingImg(false)
        }
    };

    const onSubmit: SubmitHandler<IUserAuth> = async (data) => {
        try {
            data.avatarUrl = imgUrl
            await UserEditService.updateUser(data);
            toast.dismiss()
            setLoading(true)
            getData()
        }
        catch (error) {
            console.log(error)
            if (error instanceof AxiosError) {
                if (error.response?.data.message) {
                    return toast.error(error.response?.data.message);
                }
                return toast.error('Oops... Ocurrió un error, Inténtelo más tarde');
            }
        }finally {
        setLoading(false)
    }
    }

    useEffect(() => {
        getData()
    }, [])

    return(
        <div className="flex max-sm:flex-col justify-center items-center gap-y-4 sm:gap-10 my-10 sm:mt-20">

            {/* Sección de vista de perfil de usuario */}
            <div className=" select-none p-10 flex flex-col h-full items-center justify-center gap-y-5 max-sm:mt-14 xl:flex-row xl:justify-around">
                <section className="relative bg-black-auth p-5 rounded-md gap-y-5  max-w-sm text-center flex flex-col items-center max-sm:w-full sm:p-10">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <img
                            className="size-28 sm:size-44 rounded-full object-cover"
                            src={user?.avatarUrl || userDefault} 
                            alt="user image"
                        />
                    </div>
                    <div className="mt-14">
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
                </section>
            </div>

            {/* Sección de editar perfil */}
            <section className="w-full sm:w-auto select-none flex flex-col h-full justify-center gap-y-5 xl:justify-around px-14">

                {/* formulario */}
                    <p className="text-2xl text-white sm:-mt-16"> Editar mi perfil</p>
                    <p>Información Personal</p>

                    <div className="">
                        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex justify-center ">
                                <div className=" rounded-full cursor-pointer flex justify-center gap-8 items-center" onClick={() => inputImgRef.current?.click()}>
                                    {isLoadingImg ? <RiLoader4Line size={52} className=" animate-spin" /> : <RiImageEditLine size={80} />}
                                    <img
                                        className="size-28 sm:size-36 lg:w-full rounded-full object-cover brightness-50"
                                        src={imgUrl || userDefault}
                                        alt="user image"
                                    />
                                </div>
                                <input type="file" ref={inputImgRef} className="hidden" accept="image/*" onChange={handleSubmitImage} />

                            </div>        

                            <div className="mb-3">
                                <label htmlFor="name" className="block mb-1">Nombre</label>
                                <TextInput placeholder="" error={!!errors.name} errorMessage={errors.name?.message} {...register("name", {
                                required: "El nombre es requerido",
                                setValueAs: (value: string) => value.trim()
                                })} type="text" name="name" id="name"
                                className={`bg-transparent ${errors.name || 'border-[#9D9D9D]'} hover:bg-gray-700 icon-input-text-white`} autoComplete="off" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="lastName" className="block mb-1">Apellido</label>
                                <TextInput placeholder="" error={!!errors.lastName} errorMessage={errors.lastName?.message} {...register("lastName", {
                                    required: "El apellido es requerido",
                                    setValueAs: (value: string) => value.trim()
                                    })} type="text" name="lastName" id="lastName"
                                    className={`bg-transparent ${errors.lastName || 'border-[#9D9D9D]'} hover:bg-gray-700 icon-input-text-white`} autoComplete="off" />
                                </div>

                                <Button type="submit" loading={loading}>Guardar</Button>

                        </form>                
                    </div>

            </section>
        </div>
    )

} 


export default UserProfile;