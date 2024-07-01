import DifficultyData from '../../data/DifficultyData'

type IProps = {
  value: string
}

const BadgeDifficulty = ({ value }: IProps) => {
  const infoDifficulty = DifficultyData.find(item => item.name === value)

  return (
    <div className={`${infoDifficulty?.color ?? 'bg-white'} text-black rounded-full py-1 px-4 w-fit`}>
      {infoDifficulty?.text ?? 'Sin dificultad'}
    </div>
  );
}

export default BadgeDifficulty;