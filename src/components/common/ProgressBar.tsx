type IProps = {
  value: number,
  className?: string
}

const ProgressBar = ({ value, className = '' }: IProps) => {
  return (
    <div className={"w-full bg-[#626164] rounded-full h-2" + ' ' + className}>
      <div className="bg-details h-2 rounded-full" style={{ width: value + '%' }}></div>
    </div>
  );
}

export default ProgressBar;