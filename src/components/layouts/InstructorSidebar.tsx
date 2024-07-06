import { RiEditLine, RiUser3Line, RiBookLine, RiFeedbackLine, RiGroupLine } from "@remixicon/react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { useEffect, useState } from "react";

type InstructorSidebarProps = {
  openSidebar: boolean;
  handleSidebar: () => void;
};

const InstructorSidebar = ({handleSidebar, openSidebar}: InstructorSidebarProps) => {
  const [path, setPath] = useState('');
  const currentView = (pathName : string) => {
    setPath(pathName);
    console.log(path);
  }
  useEffect(() => {
    setPath(window.location.pathname.split('/')[2]);
  }, [path]);
  return (
    <aside className={openSidebar ? 'h-screen max-sm:flex max-sm:w-screen max-sm:absolute max-sm:z-10 max-sm:right-0 lg:min-w-56 lg:flex-shrink-0 lg:block' : 'hidden bg-black-1 h-screen lg:min-w-56 lg:flex-shrink-0 lg:block'}>
      <div onClick={handleSidebar} className={openSidebar ? 'max-sm:block max-sm:h-screen max-sm:w-1/5 max-sm:bg-black max-sm:opacity-50': 'hidden'}></div>
      <div className="max-sm:w-4/5 bg-black-1 flex flex-col py-5 px-10 gap-y-5">
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