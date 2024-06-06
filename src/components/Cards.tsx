interface CardsProps {
    title: string;
    instructor: string;
    price: string;
    score: number;
}
const Cards = ({title, instructor, price, score}: CardsProps) => {
    return (
        <div className="size-[280px]">
            <div className="bg-gradient-to-r from-purple-500 via-violet-600 to-indigo-400 h-[160px] rounded-lg">
                <div className="bg-white text-neutral-950 rounded-tl-lg rounded-br-lg w-[60px] flex justify-center">
                    <p>{score}</p>
                </div>
            </div>
            <div>
                <h2 className="text-2xl font-bold">{title}</h2>
                <p className="text-sm">{instructor}</p>
                <p className="text-sm">{price}</p>
            </div>
        </div>
    );
}
export default Cards;