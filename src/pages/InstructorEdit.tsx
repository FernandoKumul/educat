import { useState, useEffect } from "react";
import { AxiosError } from "axios";
import { Button, TextInput, Textarea } from "@tremor/react";
import { ToastContainer, toast } from 'react-toastify';
import { IInstructorInfo } from "../interfaces/IInstructorInfo";
import InstructorService from "../services/instructorService";
import 'react-toastify/dist/ReactToastify.css';

const InstructorEdit = () => {
    const [loading, setLoading] = useState(false)
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
    const submitInstructorUpdate = () => {
        try {
            console.log(user)
            toast.dismiss()
            setLoading(true)
            const token = localStorage.getItem('token');
            if (token) {
                InstructorService.updateInstructor(token, user).then(() => {
                    toast.success('Perfil actualizado correctamente')
                })
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

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            InstructorService.getInstructorProfile(token).then((data) => {
                setUser(data);
            })
        }
    }, [])

    return (
        <div className="">
            <div className="p-10">
                <section className="bg-black-auth p-5 rounded-t-md">
                    <p className="xl:text-2xl">Mi perfil</p>
                </section>
                <section className="bg-black-2 p-5 rounded-b-md">
                    <p className="xl:text-xl xl:mt-8 xl:mb-3">Información personal</p>
                    <div >
                        <div className="xl:flex xl:gap-x-10 xl:justify-center">
                            <div className="xl:w-[45%]">
                                <p className="xl:my-3">Nombre</p>
                                <TextInput name="name" value={user.name} onChange={handleChange} />
                            </div>
                            <div className="xl:w-[45%]">
                                <p className="xl:my-3">Apellidos</p>
                                <TextInput name="lastName" value={user.lastName} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="xl:flex xl:gap-x-10 xl:justify-center">
                            <div className="xl:w-[45%]">
                                <p className="xl:my-3">Correo electrónico</p>
                                <TextInput name="email" value={user.email} onChange={handleChange} />
                            </div>
                            <div className="xl:w-[45%]">
                                <p className="xl:my-3">Ocupación</p>
                                <TextInput name="occupation" value={user.occupation} onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                    <p className="xl:text-xl xl:mt-8 xl:mb-3">Sobre mi</p>
                    <div >
                        <div className="flex xl:justify-center">
                            <div className="xl:w-[93%]">
                                <p className="xl:my-3">Descripción</p>
                                <Textarea name="description" value={user.description} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="xl:flex xl:gap-x-10 xl:justify-center">
                            <div className="xl:w-[45%]">
                                <p className="xl:my-3">Youtube</p>
                                <TextInput name="youtubeUser" value={user.youtubeUser} onChange={handleChange} />
                            </div>
                            <div className="xl:w-[45%]">
                                <p className="xl:my-3">Facebook</p>
                                <TextInput name="facebookUser" value={user.facebookUser} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="xl:flex xl:gap-x-10 xl:justify-center">
                            <div className="xl:w-[45%]">
                                <p className="xl:my-3">LinkedIn</p>
                                <TextInput name="linkediId" value={user.linkediId} onChange={handleChange} />
                            </div>
                            <div className="w-[45%]">
                                <p className="xl:my-3">Twitter / X</p>
                                <TextInput name="twitterUser" value={user.twitterUser} onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                    <p className="xl:text-xl xl:mt-8 xl:mb-3">Información de pago</p>
                    <div>
                        <div className="xl:flex xl:gap-x-10 xl:justify-center">
                            <div className="xl:w-[45%]">
                                <p className="xl:my-3">Correo electrónico</p>
                                <TextInput name="emailPaypal" value={user.emailPaypal} onChange={handleChange} />
                            </div>
                            <div className="xl:w-[45%] xl:flex xl:items-center">
                                <p className="text-secundary-text font-light italic" >Nota: Recuerda que debe ser el mismo correo que el de tu cuenta de paypal ya que sera al correo que se envien los pagos de tus cursos</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-end xl:mt-8 xl:mb-3">
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