import { RiStarFill, RiStarLine } from "@remixicon/react";
import { useState } from "react";

type IProps = {
  defaultScore: number,
  size?: number | string,
  className?: string,
  onScoreChange: (value: number) => void
}

const AddRating = ({ defaultScore, size, className, onScoreChange }: IProps) => {
  const [isScore, setScore] = useState<number>(defaultScore)
  const stars = [1, 2, 3, 4, 5]

  const handleChangeScore = (newValue: number) => {
    setScore(newValue)
    onScoreChange(newValue)
  }

  return (
    <article className={"flex gap-1 " + className}>
      {stars.map(value => (
        value <= isScore
          ? <RiStarFill size={size} key={value} onClick={() => handleChangeScore(value)} className="text-yellow-300 hover:scale-105 cursor-pointer" />
          : <RiStarLine size={size} key={value} onClick={() => handleChangeScore(value)} className="text-gray-400 hover:scale-105 cursor-pointer" />
      ))}
    </article>
  );
}

export default AddRating;