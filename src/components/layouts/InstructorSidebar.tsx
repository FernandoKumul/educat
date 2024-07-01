import { RiEditLine, RiUser3Line } from "@remixicon/react";
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
    <aside className="min-w-56 bg-black-1 h-screen hidden lg:block">
      <div className="flex flex-col py-5 px-10 gap-y-5">
        <Link to={'/'} className="flex items-center justify-center mb-5">
          <img src={logo} alt="logo educat" className="w-44"/>
        </Link>
        <Link to={'/instructor/profile'} onClick={() => currentView('profile')} className={path === 'profile' ? 'text-tremor-brand flex w-fit items-center gap-x-3' : 'flex w-fit items-center gap-x-3'}>
          <RiUser3Line className="size-10"  />
          <p>Perfil</p>
        </Link>
        <Link to={'/instructor/edit'} onClick={() => currentView('edit')} className={path === 'edit' ? 'text-tremor-brand flex w-fit items-center gap-x-3' : 'flex w-fit items-center gap-x-3'}>
          <RiEditLine className="size-10" />
          <p className="text-gray-2">Editar perfil</p>
        </Link>
      </div>
    </aside>
  );
}

export default InstructorSidebar;