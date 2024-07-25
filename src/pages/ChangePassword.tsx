import { useState } from "react";
import { AxiosError } from "axios";
import AuthService from "../services/AuthService";
import { useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button, TextInput } from "@tremor/react";
interface NewPassword {
    token: string;
    password: string;
    password_confirmation: string;
}
const ChangePassword = () => {
    const [loading, setLoading] = useState(false)
    const tokenByUrl = useParams<{ token: string }>()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<NewPassword>()
    const passwordValue = watch("password", '')

    const onSubmit: SubmitHandler<NewPassword> = async (data) => {
        try {
            toast.dismiss()
            data.token = tokenByUrl.token || '';
            setLoading(true)
            await AuthService.ChangePassword(data.token, data.password)
            toast.success('La contraseña ha sido cambiada exitosamente')
            setTimeout(() => {
                window.location.href = "/login";
            }, 3000);
        } catch (error) {
            console.log(error)
            if (error instanceof AxiosError) {
                if (error.response?.data.message) {
                    return toast.error(error.response?.data.message);
                }

                return toast.error('Oops... Ocurrió un error, Inténtelo más tarde');
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="flex min-h-screen justify-center items-center">
            <article className="px-4 py-6 bg-black-auth flex flex-col items-center rounded-lg md:px-6">
                <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                    <p className="text-center text-2xl my-5 mx-10">Cambiar contraseña</p>
                    <div className="mb-5">
                        <label htmlFor="password" className="block mb-1">Contraseña</label>
                        <TextInput placeholder="" error={!!errors.password} errorMessage={errors.password?.message} {...register("password", {
                            required: "La contraseña es requerido",
                            pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,50}$/, message: "Contraseña inválida" },
                            setValueAs: (value: string) => value.trim()
                        })} type="password" name="password" id="password"
                            className={`bg-transparent ${errors.password || 'border-[#9D9D9D]'} hover:bg-gray-700 icon-input-text-white`} autoComplete="off" />
                        <ul className="text-sm grid grid-cols-2 xl:grid-cols-3 xl:gap-x-3 xl:gap-y-2 mt-2">
                            <li className="flex items-center gap-1">
                                <div className={`size-3 ${(passwordValue.trim().length >= 8 && passwordValue.trim().length <= 50) ? 'bg-green-400' : 'bg-white'} border border-white rounded-full`}></div>
                                8 a 50 caracteres
                            </li>
                            <li className="flex items-center gap-1">
                                <div className={`size-3 ${/[^A-Za-z0-9]/.test(passwordValue.trim()) ? 'bg-green-400' : 'bg-white'} border border-white rounded-full`}></div>
                                Un caracter especial
                            </li>
                            <li className="flex items-center gap-1">
                                <div className={`size-3 ${/[A-Z]/.test(passwordValue) ? 'bg-green-400' : 'bg-white'} border border-white rounded-full`}></div>
                                Una mayúscula
                            </li>
                            <li className="flex items-center gap-1">
                                <div className={`size-3 ${/[a-z]/.test(passwordValue) ? 'bg-green-400' : 'bg-white'} border border-white rounded-full`}></div>
                                Una minúscula
                            </li>
                            <li className="flex items-center gap-1">
                                <div className={`size-3 ${/[0-9]/.test(passwordValue) ? 'bg-green-400' : 'bg-white'} border border-white rounded-full`}></div>
                                Un número
                            </li>
                        </ul>
                    </div>
                    <div className="mb-5">
                        <label htmlFor="password_confirmation" className="block mb-1">Confirmar contraseña</label>
                        <TextInput placeholder="" error={!!errors.password_confirmation} errorMessage={errors.password_confirmation?.message} {...register("password_confirmation", {
                            required: "La confirmación de la contraseña es requerida",
                            validate: (value) => value === passwordValue || "Las contraseñas no coinciden"
                        })} type="password" name="password_confirmation" id="password_confirmation"
                            className={`bg-transparent ${errors.password_confirmation || 'border-[#9D9D9D]'} hover:bg-gray-700 icon-input-text-white`} autoComplete="off" />
                    </div>
                    <div className="lg:flex lg:justify-center">
                        <Button className="w-full h-12 mt-6 lg:w-auto lg:px-[10%] focus:outline focus:outline-current" type="submit" loading={loading}>
                            <span className="text-base">Cambiar contraseña</span>
                        </Button>
                    </div>
                </form>
            </article>
        </main>
    );
}
export default ChangePassword;