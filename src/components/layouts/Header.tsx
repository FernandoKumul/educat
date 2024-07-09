import { RiBook3Line, RiBriefcaseLine, RiHeart3Line, RiMenuLine, RiSearchLine, RiShoppingCart2Line, RiUserAddLine, RiUserLine } from '@remixicon/react'
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import { Button, TextInput } from '@tremor/react';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import CartContext from '../../contexts/CartContext';

const Header = () => {
  const [searchValue, setValue] = useState('');
  const { isUser, logout } = useContext(AuthContext);
  const [ open, setOpen] = useState(false);
  const {isCartItems} = useContext(CartContext);


  // para el menú hambuerguesa
  const handleClick = () =>{
    setOpen(!open);
  }


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
    <header className='max-md:justify-between flex items-center right-0 top-0 bg-[#3F3848] p-4'>

    {/* Buscador y logo */}
      <div className='flex w-2/3'>
      <Link to={'/'}>
        <img src="/src/assets/Logo.svg" alt="logo" className='w-20'/>
      </Link>

        <form className='relative ml-10 hidden md:block w-3/4' onSubmit={handleSearch}>
          <TextInput className="bg-[#27222D] hover:bg-[#322e37] w-full" type="text" name="s" id="s" placeholder="Buscar..." value={searchValue} onChange={event => setValue(event.target.value)} />
          <button className='flex items-center px-[10px] bg-[#845EC2] rounded-br-[7.5px] rounded-tr-[7.5px] absolute right-0 top-0 h-full'><RiSearchLine className='text-[#27222D]'/></button>
        </form>
      </div>

    {/* menú hamburguesa */}
      <div className='md:hidden ' >
        <Button variant='light' open={open} handleClick={handleClick}><RiMenuLine className='text-white'/></Button>

        <div open={open} className='bg-black'>
          {/* <h1>hola</h1> */}
        </div>
      </div>

  {/* condicionador, si estas registrado o no */}
        {isUser ?
          <div className='hidden md:flex md:items-center w-1/3 justify-end' >

            <div className='flex gap-5'>
              <Link className='flex hover:text-details' to={'/'}><RiBriefcaseLine/>Se instructor</Link>
              <p>{isUser.name}</p>
              <Link to={'/cart'} className='relative hover:text-details'>
                <RiShoppingCart2Line/>
                {isCartItems.length > 0 &&
                  <span className='size-6 bg-primary-600 text-white rounded-full absolute -right-3 -top-3 flex justify-center items-center '>
                    <p className='mt-[2px] text-sm'>{isCartItems.length}</p>
                  </span>
                }
              </Link>

              {/* <p>{isUser.name}</p> */}                 

              <Menu>
                <MenuButton className="hover:text-details"><RiUserLine /></MenuButton>
                <Transition
                  enter="transition ease-out duration-75"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <MenuItems anchor="bottom end" modal={false} className="bg-black-auth rounded-md mt-2">

                    <MenuItem>
                      <p className='px-3 py-1'>{isUser.name}</p>
                    </MenuItem>
                    <MenuItem>
                      <div className='flex items-center data-[focus]:bg-zinc-800 data-[focus]:text-details px-3 py-1 cursor-pointer gap-2'>
                        <RiUserLine/>
                          <a className="bloc px-3 py-1" href="/">Perfil</a>
                      </div>
                    </MenuItem>
                    <MenuItem>
                      <div className='flex items-center data-[focus]:bg-zinc-800 data-[focus]:text-details px-3 py-1 cursor-pointer gap-2'>
                        <RiHeart3Line/>
                          <a className="block px-3 py-1" href="/">Lista de deseos</a>
                      </div>
                    </MenuItem>
                    <MenuItem>
                    <div className='flex items-center data-[focus]:bg-zinc-800 data-[focus]:text-details px-3 py-1 cursor-pointer gap-2'>
                        <RiBook3Line/>
                          <a className="block px-3 py-1" href="/">Mis cursos</a>
                      </div>
                    </MenuItem>
                    <MenuItem>
                        <div onClick={logout} className='flex items-center data-[focus]:bg-zinc-800 data-[focus]:text-details px-3 py-1 cursor-pointer gap-2'>              
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                          </svg>
                          Cerrar Sesión
                        </div>
                    </MenuItem>

                  </MenuItems>
                </Transition>
              </Menu>

            </div>
            
          </div> 
          : 
          <div className='hidden md:flex justify-end w-1/3'>
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