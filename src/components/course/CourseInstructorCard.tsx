import { RiDeleteBinLine, RiEdit2Line } from "@remixicon/react";
import { CurrencyFormat } from "../../utils/CurrencyUtils";
import { Link } from "react-router-dom";

type IProps = {
    id: number;
    title: string;
    image: string | null;
    price: number | null;
    active: boolean;
    className?: string
}

const CourseInstructorCard = ({id, image, price, title, active, className}: IProps) => {
    const backgroundImage = image ? { backgroundImage: `url(${image})` } : {};
    
    return (
        <article className={`w-full ${className}`}>
            <div style={backgroundImage} className={`${image ? 'bg-cover bg-center' : 'bg-gradient-to-r from-purple-500 via-violet-600 to-indigo-400'} flex justify-end items-start aspect-video rounded-lg`}>
                <div className="bg-white group text-neutral-950 rounded-tr-lg rounded-bl-lg min-w-[65px] w-fit flex justify-center items-center gap-2 py-1 px-2">
                    <Link className="cursor-pointer" to={`/instructor/edit-course/${id}`} >
                        <RiEdit2Line className="text-green-500 group-hover:text-green-600" />
                    </Link>
                    <RiDeleteBinLine className="text-red-500 cursor-pointer hover:text-red-600" />
                </div>
            </div>
            <footer className='py-3 px-1'>
                <h2 className="text-xl font-semibold">{title}</h2>
                <p className="text-sm">{price ? CurrencyFormat(price) + 'MX' : 'Sin precio'}</p>
                <div className={`${active ? 'bg-primary-600' : 'bg-slate-600'} text-[15px] mt-2 text-white rounded-full py-1 px-4 w-fit`}>
                    {active ? 'Publicado' : 'Borrador'}
                </div>
            </footer>
        </article>
    );
}
 
export default CourseInstructorCard;