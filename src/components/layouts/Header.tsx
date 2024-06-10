import { RiSearchLine } from '@remixicon/react'

const Header = () => {
  return ( 
    <header>
      Aquí va el header
      
      <form className='flex' action="">
        <input className="text-white bg-[#27222D] rounded-tl-[7.5px] rounded-bl-[7.5px] " type="text" name="search" id="search" placeholder="Buscar..."/>
        <button className='flex items-center px-[10px] bg-[#845EC2] rounded-br-[7.5px] rounded-tr-[7.5px]'><RiSearchLine /></button>
      </form>
    </header>
  );
}

export default Header;