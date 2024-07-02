import { RiEditLine, RiUser3Line, RiBookLine, RiFeedbackLine, RiGroupLine } from "@remixicon/react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { useEffect, useState } from "react";

const InstructorSidebar = () => {
  const [path, setPath] = useState('');
  const currentView = (pathName : string) => {
    setPath(pathName);
    console.log(path);
  }
  useEffect(() => {
    setPath(window.location.pathname.split('/')[2]);
  }, [path]);
  return (
    <aside className="min-w-56 flex-shrink-0 bg-black-1 h-screen hidden lg:block">
      <div className="flex flex-col py-5 px-10 gap-y-5">
        <Link to={'/'} className="flex items-center justify-center mb-5">
          <img src={logo} alt="logo educat" className="w-44"/>
        </Link>
        <Link to={'/instructor/profile'} onClick={() => currentView('profile')} className={path === 'profile' ? 'text-tremor-brand flex w-fit items-center gap-x-3' : 'flex w-fit items-center gap-x-3'}>
          <RiUser3Line className="size-7"  />
          <p>Perfil</p>
        </Link>
        <Link to={'/instructor/edit'} onClick={() => currentView('edit')} className={path === 'edit' ? 'text-tremor-brand flex w-fit items-center gap-x-3' : 'flex w-fit items-center gap-x-3'}>
          <RiEditLine className="size-7" />
          <p>Editar perfil</p>
        </Link>
        <Link to={'/instructor/courses'} onClick={() => currentView('courses')} className={path === 'courses' ? 'text-tremor-brand flex w-fit items-center gap-x-3' : 'flex w-fit items-center gap-x-3'}>
          <RiBookLine className="size-7"/>
          <p>Cursos</p>
        </Link>
        <Link to={'/instructor/reviews'} onClick={() => currentView('reviews')} className={path === 'reviews' ? 'text-tremor-brand flex w-fit items-center gap-x-3' : 'flex w-fit items-center gap-x-3'}>
          <RiFeedbackLine className="size-7"/>
          <p>Reseñas</p>
        </Link>
        <Link to={'/instructor/students'} onClick={() => currentView('students')} className={path === 'students' ? 'text-tremor-brand flex w-fit items-center gap-x-3' : 'flex w-fit items-center gap-x-3'}>
          <RiGroupLine className="size-7"/>
          <p>Alumnos</p>
        </Link>
      </div>
    </aside>
  );
}

export default InstructorSidebar;