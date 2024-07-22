import { useForm, SubmitHandler } from "react-hook-form"
import { Button, TextInput } from "@tremor/react";
import { IRegisterUser } from "../interfaces/IRegisterUser";
import AuthService from "../services/AuthService";
import { toast } from 'react-toastify';
import { AxiosError } from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IRegisterUser>()

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IRegisterUser> = async (data) => {
    try {
      console.log(data)
      toast.dismiss()
      setLoading(true)
      await AuthService.register({...data})
      navigate("/email-send/" + data.email)
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

  const passwordValue = watch("password", '')

  return (
    <main className="flex flex-col min-h-screen md:flex-row">
      <Link to={'/'}>
        <img className="w-56 mx-auto py-8 md:hidden" src="/src/assets/logo.svg" alt="logo" />
      </Link>

      <section className="bg-black-auth rounded-t-3xl px-8 pt-10 pb-8 flex-grow md:w-1/2 md:rounded-none lg:px-12 xl:px-28">
        <Link to={'/'}>
          <img className="hidden w-48 mx-auto mb-2 md:block" src="/src/assets/logo.svg" alt="logo" />
        </Link>
        <h1 className="text-[28px] font-medium text-center">Registro</h1>
        <h3 className="text-center mb-3">¿Ya tienes una cuenta? <Link to={'/login'} className="underline underline-offset-[0.5px]">Inicia sesión</Link></h3>
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>

          <div className="mb-4">
            <label htmlFor="name" className="block mb-1">Nombre(s)</label>
            <TextInput placeholder="" error={!!errors.name} errorMessage={errors.name?.message}
              {...register("name", {
                required: "El nombre es requerido",
                maxLength: { value: 50, message: "El nombre no debe tener más de 50 caracteres" },
                setValueAs: (value: string) => value.trim()
              })}
              id="name" className={`bg-transparent ${errors.name || 'border-[#9D9D9D]'} hover:bg-gray-700`} autoComplete="given-name" />
          </div>

          <div className="mb-4">
            <label htmlFor="lastName" className="block mb-1">Apellido(s)</label>
            <TextInput placeholder="" error={!!errors.lastName} errorMessage={errors.lastName?.message}
              {...register("lastName", {
                required: "El apellido es requerido",
                maxLength: { value: 50, message: "El apellido no debe tener más de 50 caracteres" },
                setValueAs: (value: string) => value.trim()
              })}
              id="lastName" className={`bg-transparent ${errors.lastName || 'border-[#9D9D9D]'} hover:bg-gray-700`} autoComplete="family-name" />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">Correo</label>
            <TextInput placeholder="" errorMessage={errors.email?.message} error={!!errors.email} {...register("email", {
              required: "El email es requerido",
              maxLength: { value: 50, message: "El email no debe tener más de 50 caracteres" },
              pattern: {value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, message: "Email inválido"},
              setValueAs: (value: string) => value.trim()
            })} id="email" className={`bg-transparent ${errors.email || 'border-[#9D9D9D]'} hover:bg-gray-700`} autoComplete="email" />
          </div>

          <div className="mb-5">
            <label htmlFor="password" className="block mb-1">Contraseña</label>
            <TextInput placeholder="" error={!!errors.password} errorMessage={errors.password?.message} {...register("password", {
              required: "La contraseña es requerido",
              pattern: {value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,50}$/, message: "Contraseña inválida"},
              setValueAs: (value: string) => value.trim()
            })} type="password" name="password" id="password"
              className={`bg-transparent ${errors.password || 'border-[#9D9D9D]'} hover:bg-gray-700 icon-input-text-white`} autoComplete="off" />
            <ul className="text-sm grid grid-cols-2 xl:grid-cols-3 mt-2">
              <li className="flex items-center gap-1">
                <div className={`size-3 ${(passwordValue.trim().length >= 8 && passwordValue.trim().length <= 50) ? 'bg-green-400' : 'bg-white' } border border-white rounded-full`}></div>
                8 a 50 caracteres
              </li>
              <li className="flex items-center gap-1">
                <div className={`size-3 ${/[^A-Za-z0-9]/.test(passwordValue.trim()) ? 'bg-green-400' : 'bg-white' } border border-white rounded-full`}></div>
                Un caracter especial
              </li>
              <li className="flex items-center gap-1">
                <div className={`size-3 ${/[A-Z]/.test(passwordValue) ? 'bg-green-400' : 'bg-white' } border border-white rounded-full`}></div>
                Una mayúscula
              </li>
              <li className="flex items-center gap-1">
                <div className={`size-3 ${/[a-z]/.test(passwordValue) ? 'bg-green-400' : 'bg-white' } border border-white rounded-full`}></div>
                Una minúscula
              </li>
              <li className="flex items-center gap-1">
                <div className={`size-3 ${/[0-9]/.test(passwordValue) ? 'bg-green-400' : 'bg-white' } border border-white rounded-full`}></div>
                Un número
              </li>
            </ul>
          </div>

          <div className="flex gap-2">
            <input className="text-primary-600 mt-1" type="checkbox" {...register('confirmedConsent', {required: 'Este campo es obligatorio'})} />
            <p className="text-[15px]">
              Aceptas los <span className="underline cursor-pointer">términos y condiciones</span> del sitio para la creación y uso de tus datos.
            </p>
          </div>
          {errors.confirmedConsent && <small className="text-sm text-red-500">{errors.confirmedConsent.message}</small>}
          <div className="lg:flex lg:justify-center">            
            <Button className="w-full h-12 mt-6 lg:w-auto lg:px-[10%] focus:outline focus:outline-current" type="submit" loading={loading}>
              <span className="text-base">Crear Cuenta</span>
            </Button>
          </div>
        </form>
      </section>
      <section className="hidden px-[5%] w-1/2 md:flex md:items-center md:flex-col md:justify-center lg:px-[9%] xl:px-[12%]">
        <h2 className="text-5xl mb-1 text-center xl:text-6xl text-balance xl:tracking-wider xl:mb-2">
          <span className="text-details">¡</span>Bienvenido a Educat<span className="text-details">,</span>
        </h2>
        <h4 className="text-xl text-center xl:text-2xl xl:tracking-wide  ">el sitio en el cual puedes aprender a tu ritmo<span className="text-details">!</span></h4>
      </section>
    </main>
  );
}

export default RegisterPage;