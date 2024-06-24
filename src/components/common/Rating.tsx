import { RiStarFill, RiStarHalfFill, RiStarLine } from "@remixicon/react";

type IPropsStar = {
  value: number,
  size?: number | string
}

const StarScore = ({ value, size }: IPropsStar) => {

  if(value >= 0.75) return <RiStarFill size={size} className="text-yellow-300" />

  if (value >= 0.25) return <RiStarHalfFill size={size} className="text-yellow-300" />

  return <RiStarLine size={size} className="text-gray-400" />
}

type IProps = {
  score: number,
  size?: number | string,
  className?: string
}

const Rating = ({ score, size, className }: IProps) => {
  const stars = [0, 1, 2, 3, 4]

  return (
    <article className={"flex gap-1 " + className}>
      {stars.map(value => <StarScore size={size} key={value} value={score - value} />)}
    </article>
  );
}

export default Rating;