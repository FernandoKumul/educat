type IProps = {
  url: string | null
  alt?: string,
  className?: string
}

const Avatar = ({url, alt = '', className = ''}: IProps) => {
  if(!url) {
    return (
      <div className={"size-8 bg-white rounded-full " + className}></div>
    )
  }

  return (
    <img className={"size-8 bg-white rounded-full " + className} src={url} alt={alt} />
  );
}
 
export default Avatar;