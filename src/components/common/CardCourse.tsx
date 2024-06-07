import { RiStarFill } from '@remixicon/react'
interface CardsProps {
    title: string;
    instructor: string;
    price: string;
    score: number;
}
const CardCourse = ({ title, instructor, price, score }: CardsProps) => {
    return (
        <div className="size-[280px]">
            <div className="bg-gradient-to-r from-purple-500 via-violet-600 to-indigo-400 h-[160px] rounded-lg">
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
                <p className="text-sm">{price}</p>
            </div>
        </div>
    );
}
export default CardCourse;