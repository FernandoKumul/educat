import { RiStarFill } from '@remixicon/react'
import { Link } from 'react-router-dom';
import { CurrencyFormat } from '../../utils/CurrencyUtils';
interface CardsProps {
    id: string;
    title: string;
    instructor: string;
    image: string;
    price: string;
    score: number;
}
const CardCourse = ({ title, instructor, price, score, image, id }: CardsProps) => {
    const backgroundImage = image ? { backgroundImage: `url(${image})` } : {};
    return (
        <Link to={`/course/${id}`} className="size-[280px]">
            <div style={backgroundImage} className={`${image ? 'bg-cover bg-center' : 'bg-gradient-to-r from-purple-500 via-violet-600 to-indigo-400'} h-[160px] rounded-lg`}>
                <div className="bg-white text-neutral-950 rounded-tl-lg rounded-br-lg w-[65px] h-[30px] flex justify-center items-center gap-1">
                    <p className='text-base'>{score}</p>
                    <RiStarFill
                        size={20}
                        color="#FCE35F"
                    />
                </div>
            </div>
            <div className='py-3 px-1'>
                <p className="text-2xl font-semibold">{title}</p>
                <p className="text-sm text-gray-300">{instructor}</p>
                <p className="text-sm">{CurrencyFormat(parseInt(price))}</p>
            </div>
        </Link>
    );
}
export default CardCourse;