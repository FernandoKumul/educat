import { useState, useEffect, useRef, FormEvent } from "react";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { Button, TextInput, Textarea } from "@tremor/react";
import { toast } from 'react-toastify';
import InstructorService from "../services/instructorService";
import FileService from "../services/FileService";
import { IInstructorInfo } from "../interfaces/IInstructorInfo";
import { RiImageEditLine, RiLoader4Line } from "@remixicon/react";
import userDefault from '../assets/userDefault.svg';

const InstructorEdit = () => {
    const [loading, setLoading] = useState(false)

    const inputImgRef = useRef<HTMLInputElement>(null)
    const [isLoadingImg, setLoadingImg] = useState<boolean>(false)
    const [imgUrl, setImgUrl] = useState<string | null>(null)

    const [user, setUser] = useState<IInstructorInfo>({
        pkInstructor: 0,
        fkUser: 0,
        occupation: "",
        facebookUser: "",
        youtubeUser: "",
        linkediId: "",
        twitterUser: "",
        emailPaypal: "",
        name: "",
        lastName: "",
        email: "",
        avatarUrl: "",
        description: "",
    });

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<IInstructorInfo>()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        })
    }

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

    const onSubmit = async () => {
        try {
            console.log(user)
            toast.dismiss()
            setLoading(true)
            user.avatarUrl = imgUrl
            const token = localStorage.getItem('token');
            if (token) {
                await InstructorService.updateInstructor(token, user)
                toast.success('Cambios guardados correctamente');
            }
        }
        catch (error) {
            console.log(error)
            if (error instanceof AxiosError) {
                return toast.error('Oops... Ocurrió un error, Intentelo más tarde');
            }
        } finally {
            setLoading(false)
        }
    }
    
    const getData = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const data = await InstructorService.getInstructorProfile(token);
                setUser(data)
                setValue('name', data.name)
                setValue('lastName', data.lastName)
                setValue('email', data.email)
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

    useEffect(() => {
        getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <div className="p-10 mt-5">
                <section className="bg-black-auth p-5 rounded-t-md">
                    <p className="xl:text-2xl max-sm:text-center">Mi perfil</p>
                </section>
                <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="bg-black-2 p-5 rounded-b-md">
                    <p className="max-sm:text-center xl:text-xl xl:mt-8 mb-3">Información personal</p>
                    <div className="relative">
                        <div className="max-sm:flex max-sm:justify-center xl:absolute xl:-bottom-28 xl:-right-36 xl:-translate-x-1/2 xl:-translate-y-1/2">
                            <div className=" z-10 absolute max-sm:size-28 xl:size-52 rounded-full -translate-x-1/2 left-1/2 cursor-pointer flex justify-center items-center" onClick={() => inputImgRef.current?.click()}>
                                {isLoadingImg ? <RiLoader4Line size={52} className="animate-spin" /> : <RiImageEditLine size={52} />}
                            </div>
                            <img
                                className="size-28 sm:size-52 rounded-full object-cover brightness-75"
                                src={imgUrl || userDefault}
                                alt="user image"
                            />
                        </div>
                        <input type="file" ref={inputImgRef} className="hidden" accept="image/*" onChange={handleSubmitImage} />
                    </div>
                    <div >
                        <div className="flex max-sm:flex-col max-sm:gap-y-3 max-sm:mb-3 xl:gap-x-10 xl:justify-center">
                            <div className="xl:w-[45%]">
                                <p className="my-3">Nombre</p>
                                <TextInput {...register("name", {
                                    required: "El nombre es requerido",
                                    setValueAs: (value: string) => value.trim()
                                })} error={!!errors.name} errorMessage={errors.name?.message} placeholder="Nombre(s)" name="name" value={user.name} onChange={handleChange} />
                            </div>
                            <div className="xl:w-[45%]">
                                <p className="my-3">Apellidos</p>
                                <TextInput {...register("lastName", {
                                    required: "Los apellidos son requeridos",
                                    setValueAs: (value: string) => value.trim()
                                })} error={!!errors.lastName} errorMessage={errors.lastName?.message} placeholder="Apellidos" name="lastName" value={user.lastName} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="flex max-sm:flex-col max-sm:gap-y-3 max-sm:mb-3 xl:gap-x-10 xl:justify-center">
                            <div className="xl:w-[45%]">
                                <p className="my-3">Correo electrónico</p>
                                <TextInput {...register("email", {
                                    required: "El email es requerido",
                                    pattern: { value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, message: "Email inválido" },
                                    setValueAs: (value: string) => value.trim()
                                })} error={!!errors.email} errorMessage={errors.email?.message} placeholder="usuario@example.com" name="email" value={user.email} onChange={handleChange} />
                            </div>
                            <div className="xl:w-[45%]">
                                <p className="my-3">Ocupación</p>
                                <TextInput placeholder="" name="occupation" value={user.occupation} onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                    <p className="max-sm:text-center xl:text-xl mt-8 mb-3">Sobre mi</p>
                    <div >
                        <div className="flex max-sm:mb-3 xl:justify-center">
                            <div className="max-sm:w-full xl:w-[93%]">
                                <p className="my-3">Descripción</p>
                                <Textarea placeholder="" name="description" value={user.description ?? ''} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="flex max-sm:flex-col max-sm:gap-y-3 max-sm:mb-3 xl:gap-x-10 xl:justify-center">
                            <div className="xl:w-[45%]">
                                <p className="my-3">Youtube</p>
                                <TextInput placeholder="https://www.youtube.com/channel/..." name="youtubeUser" value={user.youtubeUser} onChange={handleChange} />
                            </div>
                            <div className="xl:w-[45%]">
                                <p className="my-3">Facebook</p>
                                <TextInput placeholder="https://www.facebook.com/profile.php?id=..." name="facebookUser" value={user.facebookUser} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="xl:flex xl:gap-x-10 xl:justify-center">
                            <div className="xl:w-[45%]">
                                <p className="my-3">LinkedIn</p>
                                <TextInput placeholder="https://www.linkedin.com/in/..." name="linkediId" value={user.linkediId} onChange={handleChange} />
                            </div>
                            <div className="xl:w-[45%]">
                                <p className="my-3">Twitter / X</p>
                                <TextInput placeholder="https://x.com/..." name="twitterUser" value={user.twitterUser} onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                    <p className="max-sm:text-center xl:text-xl mt-8 mb-3">Información de pago</p>
                    <div>
                        <div className="flex max-sm:flex-col max-sm:gap-y-3 max-sm:mb-3 xl:gap-x-10 xl:justify-center">
                            <div className="xl:w-[45%]">
                                <p className="my-3">Correo electrónico</p>
                                <TextInput placeholder="usuario@example.com" name="emailPaypal" value={user.emailPaypal} onChange={handleChange} />
                            </div>
                            <div className="xl:w-[45%] xl:flex xl:items-center">
                                <p className="text-secundary-text font-light italic max-sm:text-sm max-sm:text-center">Nota: Recuerda que debe ser el mismo correo que el de tu cuenta de paypal ya que será al correo que se envíen los pagos de tus cursos</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex mt-8 mb-3 max-sm:justify-center xl:justify-end">
                            <Button type="submit" loading={loading} >
                                <span className="text-base">Guardar cambios</span>
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default InstructorEdit;