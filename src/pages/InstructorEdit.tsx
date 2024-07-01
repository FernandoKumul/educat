import { useState, useEffect, useRef, FormEvent } from "react";
import { AxiosError } from "axios";
import { Button, TextInput, Textarea } from "@tremor/react";
import { ToastContainer, toast } from 'react-toastify';
import { IInstructorInfo } from "../interfaces/IInstructorInfo";
import InstructorService from "../services/instructorService";
import FileService from "../services/FileService";
import 'react-toastify/dist/ReactToastify.css';
import userDefault from '../assets/userDefault.svg'
import { RiImageEditLine, RiLoader4Line } from "@remixicon/react";

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

    const submitInstructorUpdate = async () => {
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
    }, [])

    return (
        <div>
            <div className="p-10 mt-5">
                <section className="bg-black-auth p-5 rounded-t-md">
                    <p className="xl:text-2xl max-sm:text-center">Mi perfil</p>
                </section>
                <section className="bg-black-2 p-5 rounded-b-md">
                    <p className="max-sm:text-center xl:text-xl xl:mt-8 mb-3">Información personal</p>
                    <div className="relative">
                        <div className=" z-10 absolute max-sm:size-28 max-sm:translate-x-1/2 max-sm:-left-3 xl:size-52 rounded-full cursor-pointer xl:translate-x-1/2 xl:-bottom-2 xl:right-16 flex justify-center items-center" onClick={() => inputImgRef.current?.click()}>
                            {isLoadingImg ? <RiLoader4Line size={52} className="animate-spin" /> : <RiImageEditLine size={52} />}
                        </div>
                        <div className="max-sm:flex max-sm:justify-center xl:absolute xl:-bottom-28 xl:-right-36 xl:-translate-x-1/2 xl:-translate-y-1/2">
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
                                <TextInput name="name" value={user.name} onChange={handleChange} />
                            </div>
                            <div className="xl:w-[45%]">
                                <p className="my-3">Apellidos</p>
                                <TextInput name="lastName" value={user.lastName} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="flex max-sm:flex-col max-sm:gap-y-3 max-sm:mb-3 xl:gap-x-10 xl:justify-center">
                            <div className="xl:w-[45%]">
                                <p className="my-3">Correo electrónico</p>
                                <TextInput name="email" value={user.email} onChange={handleChange} />
                            </div>
                            <div className="xl:w-[45%]">
                                <p className="my-3">Ocupación</p>
                                <TextInput name="occupation" value={user.occupation} onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                    <p className="max-sm:text-center xl:text-xl mt-8 mb-3">Sobre mi</p>
                    <div >
                        <div className="flex max-sm:mb-3 xl:justify-center">
                            <div className="max-sm:w-full xl:w-[93%]">
                                <p className="my-3">Descripción</p>
                                <Textarea name="description" value={user.description} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="flex max-sm:flex-col max-sm:gap-y-3 max-sm:mb-3 xl:gap-x-10 xl:justify-center">
                            <div className="xl:w-[45%]">
                                <p className="my-3">Youtube</p>
                                <TextInput name="youtubeUser" value={user.youtubeUser} onChange={handleChange} />
                            </div>
                            <div className="xl:w-[45%]">
                                <p className="my-3">Facebook</p>
                                <TextInput name="facebookUser" value={user.facebookUser} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="xl:flex xl:gap-x-10 xl:justify-center">
                            <div className="xl:w-[45%]">
                                <p className="my-3">LinkedIn</p>
                                <TextInput name="linkediId" value={user.linkediId} onChange={handleChange} />
                            </div>
                            <div className="xl:w-[45%]">
                                <p className="my-3">Twitter / X</p>
                                <TextInput name="twitterUser" value={user.twitterUser} onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                    <p className="max-sm:text-center xl:text-xl mt-8 mb-3">Información de pago</p>
                    <div>
                        <div className="flex max-sm:flex-col max-sm:gap-y-3 max-sm:mb-3 xl:gap-x-10 xl:justify-center">
                            <div className="xl:w-[45%]">
                                <p className="my-3">Correo electrónico</p>
                                <TextInput name="emailPaypal" value={user.emailPaypal} onChange={handleChange} />
                            </div>
                            <div className="xl:w-[45%] xl:flex xl:items-center">
                                <p className="text-secundary-text font-light italic max-sm:text-sm max-sm:text-center">Nota: Recuerda que debe ser el mismo correo que el de tu cuenta de paypal ya que sera al correo que se envien los pagos de tus cursos</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex mt-8 mb-3 max-sm:justify-center xl:justify-end">
                            <Button onClick={submitInstructorUpdate} loading={loading} >
                                <span className="text-base">Guardar cambios</span>
                            </Button>
                        </div>
                    </div>
                </section>
            </div>
            <ToastContainer
                className="text-sm"
                position="top-right"
                theme="dark"
            />
        </div>
    );
}
export default InstructorEdit;