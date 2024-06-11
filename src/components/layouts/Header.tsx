import { RiSearchLine } from '@remixicon/react'
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import { Button } from '@tremor/react';

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
    <header>
      {isUser ?
        <>
          <p>{isUser.name}</p>
          <Button onClick={logout}>Cerrar Sesión</Button>
        </>
        : 
        <Link to={'/login'}>Registrate</Link>
      }

      <form className='flex' onSubmit={handleSearch}>
        <input className="text-white bg-[#27222D] rounded-tl-[7.5px] rounded-bl-[7.5px] " type="text" name="s" id="s" placeholder="Buscar..." value={searchValue} onChange={event => setValue(event.target.value)} />
        <button className='flex items-center px-[10px] bg-[#845EC2] rounded-br-[7.5px] rounded-tr-[7.5px]'><RiSearchLine /></button>
      </form>
    </header>
  );
}

export default Header;