import catGif from '../../assets/cat-loading.gif';

type IProps = {
  className?: string
  size?: number
}

const LoaderCat = ({className = '', size}: IProps) => {
  return (
    <img className={className} style={{width: size ? `${size}px` : 'auto'}} src={catGif} alt="Loading..." />
  );
}
 
export default LoaderCat;