import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import AuthService from "../services/AuthService";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form"
import { useGoogleLogin } from '@react-oauth/google'
import { ILoginUser } from "../interfaces/ILoginUser";
import { toast } from 'react-toastify';
import { Button, TextInput } from "@tremor/react";
import GoogleIcon from "../components/Icons/GoogleIcon";

interface User {
  access_token: string;
}
interface Email {
  email: string;
}

const LoginPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [handleRender, setHandleRender] = useState(false);

  const loginGoogle = useGoogleLogin({
    onSuccess: (codeResponse: User) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginUser>()

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ILoginUser> = async (data) => {
    try {
      console.log(data)
      toast.dismiss()
      setLoading(true)
      await AuthService.login({ ...data })
      navigate("/")
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

  const onSubmitRecovery: SubmitHandler<Email> = async (data) => {
    try {
      toast.dismiss()
      setLoading(true)
      await AuthService.SendEmailRecovery(data.email)
      toast.success('Se ha enviado un correo de recuperación a tu dirección de correo electrónico')
      setHandleRender(false)
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

  const loginByGoogle = async () => {
    if (user) {
      try {
        toast.dismiss()
        setLoading(true)
        console.log(user.access_token)
        await AuthService.TokenByGoogle(user.access_token)
        navigate("/")
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
  }

  useEffect(() => {
    loginByGoogle()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <main className="flex flex-col min-h-screen md:flex-row">
      <Link to={'/'}>
        <img className="w-56 mx-auto py-8 md:hidden" src="/logo.svg" alt="logo" />
      </Link>

      <section className="hidden px-[5%] w-1/2 md:flex md:items-center md:flex-col md:justify-center lg:px-[9%] xl:px-[12%]">
        <h2 className="text-5xl mb-1 text-center xl:text-6xl text-balance xl:tracking-wider xl:mb-2">
          <span className="text-details">¡</span>Bienvenido a Educat<span className="text-details">,</span>
        </h2>
        <h4 className="text-xl text-center xl:text-2xl xl:tracking-wide  ">el sitio en el cual puedes aprender a tu ritmo<span className="text-details">!</span></h4>
      </section>
      <section className="bg-black-auth rounded-t-3xl px-8 pt-10 pb-8 flex-grow md:w-1/2 md:rounded-none lg:px-12 xl:px-28">
        <Link to={'/'}>
          <img className="hidden w-48 mx-auto mb-2 md:block" src="/logo.svg" alt="logo" />
        </Link>
        <h1 className="text-[28px] font-medium text-center">Iniciar sesión</h1>
        <h3 className="text-center mb-6">¿No tienes cuenta? <Link to={'/register'} className="underline underline-offset-[0.5px]">Regístrate aquí</Link></h3>

        <article onClick={() => loginGoogle()} className="bg-white flex justify-center gap-2 items-center h-12 rounded-full cursor-pointer hover:bg-slate-100">
          <GoogleIcon />
          <p className="text-gray-950">Continuar con Google</p>
        </article>

        <div className="h-[2px] bg-[#9D9D9D] my-10 relative">
          <span className="text-xl font-light absolute bg-black-auth top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3">ó</span>
        </div>
        {!handleRender && (
          <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-1">Correo</label>
              <TextInput placeholder="" errorMessage={errors.email?.message} error={!!errors.email} {...register("email", {
                required: "El email es requerido",
                pattern: { value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, message: "Email inválido" },
                setValueAs: (value: string) => value.trim()
              })} id="email" className={`bg-transparent ${errors.email || 'border-[#9D9D9D]'} hover:bg-gray-700`} autoComplete="email" />
            </div>

            <div className="mb-5">
              <label htmlFor="password" className="block mb-1">Contraseña</label>
              <TextInput placeholder="" error={!!errors.password} errorMessage={errors.password?.message} {...register("password", {
                required: "La contraseña es requerido",
                setValueAs: (value: string) => value.trim()
              })} type="password" name="password" id="password"
                className={`bg-transparent ${errors.password || 'border-[#9D9D9D]'} hover:bg-gray-700 icon-input-text-white`} autoComplete="off" />
              <p onClick={() => setHandleRender(!handleRender)} className="underline text-[#B5B5B5] text-sm text-right block mt-1 select-none cursor-pointer hover:text-tremor-brand transition-all">¿Olvidaste tu contraseña?</p>
            </div>

            <div className="lg:flex lg:justify-center">
              <Button className="w-full h-12 mt-6 lg:w-auto lg:px-[10%] focus:outline focus:outline-current" type="submit" loading={loading}>
                <span className="text-base">Entrar</span>
              </Button>
            </div>
          </form>
        )
        }
        {handleRender && (
          <form autoComplete="off" onSubmit={handleSubmit(onSubmitRecovery)}>
            <div className="mb-4">
              <p className="text-xl">Restablecer la contraseña</p>
              <p className="text-sm text-secundary-text mt-2 mb-5 italic">Indícanos tu dirección de correo electrónico y te enviaremos un enlace para que puedas volver a acceder a tu cuenta.</p>
              <label htmlFor="email" className="block mb-1">Correo</label>
              <TextInput placeholder="" errorMessage={errors.email?.message} error={!!errors.email} {...register("email", {
                required: "El email es requerido",
                pattern: { value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, message: "Email inválido" },
                setValueAs: (value: string) => value.trim()
              })} id="email" className={`bg-transparent ${errors.email || 'border-[#9D9D9D]'} hover:bg-gray-700`} autoComplete="email" />
            </div>
            <div className="lg:flex lg:justify-center">
              <Button className="w-full h-12 mt-6 lg:w-auto lg:px-[10%] focus:outline focus:outline-current" type="submit" loading={loading}>
                <span className="text-base">Recuperar</span>
              </Button>
            </div>
          </form>
        )
        }


      </section>
    </main>
  );
}

export default LoginPage;