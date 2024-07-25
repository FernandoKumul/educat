import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RiEditLine, RiBookLine, RiFeedbackLine, RiGroupLine, RiUserLine } from "@remixicon/react";
import AuthContext from "../../contexts/AuthContext";
import logo from "../../assets/logo.svg";

type InstructorSidebarProps = {
  openSidebar: boolean;
  handleSidebar: () => void;
};

const InstructorSidebar = ({ handleSidebar, openSidebar }: InstructorSidebarProps) => {
  const [path, setPath] = useState('');
  const { logout } = useContext(AuthContext)

  const currentView = (pathName: string) => {
    setPath(pathName);
    console.log(path);
  }

  useEffect(() => {
    setPath(window.location.pathname.split('/')[2]);
  }, [path]);

  return (
    <aside className={openSidebar ? 'h-screen max-sm:flex max-sm:w-screen max-sm:absolute z-50 max-sm:right-0 lg:min-w-56 lg:flex-shrink-0 lg:block' : 'hidden bg-black-1 h-screen lg:min-w-56 lg:flex-shrink-0 lg:block'}>
      <div onClick={handleSidebar} className={openSidebar ? 'max-sm:block max-sm:h-screen max-sm:w-1/5 max-sm:bg-black max-sm:opacity-50' : 'hidden'}></div>
      <div className="max-sm:w-4/5 bg-black-1 flex flex-col h-full justify-between gap-y-2 py-5 px-6">
        <div className="flex flex-col gap-y-5">
          <Link to={'/'} className="flex items-center justify-center mb-5">
            <img src={logo} alt="logo educat" className="w-40" />
          </Link>
          <Link to={'/instructor/profile'} onClick={() => currentView('profile')} className={`${path === 'profile' ? 'text-tremor-brand' : ''} flex items-center gap-x-3 hover:bg-[#5a4b6e] rounded-md py-2 px-4 transition-colors`}>
            <RiUserLine />
            <p>Perfil</p>
          </Link>
          <Link to={'/instructor/edit'} onClick={() => currentView('edit')} className={`${path === 'edit' ? 'text-tremor-brand ' : ''} flex items-center gap-x-3 hover:bg-[#5a4b6e] rounded-md py-2 px-4 transition-colors`}>
            <RiEditLine />
            <p>Editar perfil</p>
          </Link>
          <Link to={'/instructor/courses'} onClick={() => currentView('courses')} className={`${path === 'courses' ? 'text-tremor-brand ' : ''} flex items-center gap-x-3 hover:bg-[#5a4b6e] rounded-md py-2 px-4 transition-colors`}>
            <RiBookLine />
            <p>Cursos</p>
          </Link>
          <Link to={'/instructor/reviews'} onClick={() => currentView('reviews')} className={`${path === 'reviews' ? 'text-tremor-brand ' : ''} flex items-center gap-x-3 hover:bg-[#5a4b6e] rounded-md py-2 px-4 transition-colors`}>
            <RiFeedbackLine />
            <p>Reseñas</p>
          </Link>
          <Link to={'/instructor/students'} onClick={() => currentView('students')} className={`${path === 'students' ? 'text-tremor-brand ' : ''} flex items-center gap-x-3 hover:bg-[#5a4b6e] rounded-md py-2 px-4 transition-colors`}>
            <RiGroupLine />
            <p>Alumnos</p>
          </Link>
        </div>
        <div onClick={logout} className='flex items-center hover:bg-[#5a4b6e] rounded-md py-2 px-4 transition-colors cursor-pointer gap-2'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
          </svg>
          Cerrar Sesión
        </div>
      </div>
    </aside>
  );
}

export default InstructorSidebar;