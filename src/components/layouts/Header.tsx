import { RiBriefcaseLine, RiMenuLine, RiSearchLine, RiShoppingCart2Line, RiUserAddLine, RiUserLine } from '@remixicon/react'
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import { Button, TextInput } from '@tremor/react';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import CartContext from '../../contexts/CartContext';

const Header = () => {
  const [searchValue, setValue] = useState('');
  const { isUser, logout } = useContext(AuthContext);
  const {isCartItems} = useContext(CartContext);


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
    <header className='flex items-center right-0 top-0 bg-[#3F3848] p-4'>

    {/* Buscador y logo */}
      <div className='flex w-2/3'>
        <img src="/src/assets/Logo.svg" alt="logo" className='w-20' />

        <form className='relative ml-10 hidden lg:block w-3/4' onSubmit={handleSearch}>
          <TextInput className="bg-[#27222D] hover:bg-[#322e37] w-full" type="text" name="s" id="s" placeholder="Buscar..." value={searchValue} onChange={event => setValue(event.target.value)} />
          <button className='flex items-center px-[10px] bg-[#845EC2] rounded-br-[7.5px] rounded-tr-[7.5px] absolute right-0 top-0 h-full'><RiSearchLine/></button>
        </form>
      </div>

    {/* menú hamburguesa */}
      <div className='lg:hidden'>
        <RiMenuLine className='text-white'/>
      </div>

        {isUser ?
          <div className='hidden lg:flex lg:items-center w-1/3 justify-end' >

            <div className='flex gap-5'>
              <Link className='flex' to={'/'}><RiBriefcaseLine/>Se instructor</Link>
              <p>{isUser.name}</p>
              <Link to={'/cart'} className='relative'>
                <RiShoppingCart2Line/>
                {isCartItems.length > 0 &&
                  <span className='size-6 bg-primary-600 text-white rounded-full absolute -right-3 -top-3 flex justify-center items-center '>
                    <p className='mt-[2px] text-sm'>{isCartItems.length}</p>
                  </span>
                }
              </Link>

              <svg onClick={logout} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
              </svg>

              {/* 
              <Menu>
                <MenuButton><RiUserLine/></MenuButton>
                <MenuItems anchor="bottom">

                  <MenuItem>
                    <p>{isUser.name}</p>
                  </MenuItem>
                  <MenuItem>
                    <a className="block data-[focus]:bg-blue-100" href="/settings">
                      Settings
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a className="block data-[focus]:bg-blue-100" href="/support">
                      Support
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a className="block data-[focus]:bg-blue-100" href="/license">
                      License
                    </a>
                  </MenuItem>
                  <MenuItem>            
                    <Button variant='light' onClick={logout}>
                      <div className='flex items-center'><RiUserLine/>Cerrar Sesión</div>
                    </Button>
                  </MenuItem>
                  
                </MenuItems>
              </Menu> */}

              {/* <div className="fixed top-24 w-52 text-right">
                    <Menu>
                      <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
                        Options
                      </MenuButton>
                      <Transition
                        enter="transition ease-out duration-75"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                      >
                        <MenuItems
                          anchor="bottom end"
                          className="w-52 origin-top-right rounded-xl border border-white/5 bg-white/5 p-1 text-sm/6 text-white [--anchor-gap:var(--spacing-1)] focus:outline-none"
                        >
                          <MenuItem>
                            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                              Edit
                              <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">⌘E</kbd>
                            </button>
                          </MenuItem>
                          <MenuItem>
                            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                              Duplicate
                              <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">⌘D</kbd>
                            </button>
                          </MenuItem>
                          <div className="my-1 h-px bg-white/5" />
                          <MenuItem>
                            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                              Archive
                              <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">⌘A</kbd>
                            </button>
                          </MenuItem>
                          <MenuItem>
                            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                              Delete
                              <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">⌘D</kbd>
                            </button>
                          </MenuItem>
                        </MenuItems>
                      </Transition>
                    </Menu>
              </div> */}

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