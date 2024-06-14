import { RiBriefcaseLine, RiMenuLine, RiSearchLine, RiShoppingCart2Line, RiUserAddLine, RiUserLine } from '@remixicon/react'
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import { Button, TextInput } from '@tremor/react';

const Header = () => {
  const [searchValue, setValue] = useState('');
  const { isUser, logout } = useContext(AuthContext);


  useEffect(() => { 
    const search = new URLSearchParams(window.location.search).get('q') || '';
    setValue(search);
  }, []);

  const navigate = useNavigate();
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('s') as string;
    navigate(`/search?q=${query}`);
  }

  return (
    <header className='flex items-center justify-between right-0 top-0 bg-[#3F3848] p-4'>

      <div className='flex'>
        <img src="/src/assets/Logo.svg" alt="logo" className='w-20' />

        {/* Buscador */}
        <form className='relative w-fit ml-10 hidden lg:block' onSubmit={handleSearch}>
          <TextInput className="bg-[#27222D] hover:bg-[#322e37] w-60" type="text" name="s" id="s" placeholder="Buscar..." value={searchValue} onChange={event => setValue(event.target.value)} />
          <button className='flex items-center px-[10px] bg-[#845EC2] rounded-br-[7.5px] rounded-tr-[7.5px] absolute right-0 top-0 h-full'><RiSearchLine/></button>
        </form>
      </div>

      <div className='lg:hidden'>
        <RiMenuLine className='text-white'/>
      </div>

        {isUser ?
          <div className='hidden lg:flex lg:items-center'>
            <p>{isUser.name}</p>
            <Button onClick={logout}>
              <div className='flex items-center'><RiUserLine/>Cerrar Sesión</div>
            </Button>
            <div className='flex'>
              <Link className='flex' to={'/'}><RiBriefcaseLine/>Se instructor</Link>
              <Link to={'/'}><RiShoppingCart2Line/></Link>
              <Link to={'/'}><RiUserLine/></Link>
            </div>
          </div> 
          : 
          <div className='hidden lg:flex'>
            <div className=''>
              <Link className='flex' to={'/register'}><RiUserAddLine/>Registrate</Link>
            </div>
            <div className='ml-10'>
              <Link  className='flex' to={'/login'}><RiUserLine/>Login</Link>
            </div>
          </div>
        }

    </header>
  );
}

export default Header;