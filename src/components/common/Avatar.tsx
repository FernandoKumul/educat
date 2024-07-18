type IProps = {
  url: string | null
  alt?: string,
  className?: string
}

const Avatar = ({url, alt = '', className = ''}: IProps) => {
  if(!url) {
    return (
      <img className={"size-8 rounded-full object-cover " + className} src="./src/assets/UserDefault.svg" alt="" />
    )
  }

  return (
    <img className={"size-8 bg-white rounded-full object-cover " + className} src={url} alt={alt} />
  );
}
 
export default Avatar;