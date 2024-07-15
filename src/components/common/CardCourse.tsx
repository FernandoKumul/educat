import { RiStarFill } from '@remixicon/react'
import { Link } from 'react-router-dom';
import { CurrencyFormat } from '../../utils/CurrencyUtils';
interface CardsProps {
    id: number;
    title: string;
    instructor: string | null;
    image: string | null;
    price: string;
    score: number;
    className?: string
}
const CardCourse = ({ title, instructor, price, score, image, id, className = '' }: CardsProps) => {
    const backgroundImage = image ? { backgroundImage: `url(${image})` } : {};
    return (
        <Link to={`/course/${id}`} className={`w-full block ${className}`}>
            <div style={backgroundImage} className={`${image ? 'bg-cover bg-center' : 'bg-gradient-to-r from-purple-500 via-violet-600 to-indigo-400'} aspect-video rounded-lg`}>
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