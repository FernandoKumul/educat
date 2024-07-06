import { RiStarFill, RiThumbUpFill, RiThumbUpLine } from "@remixicon/react";
import { ICommentUser } from "../../interfaces/ICommentUser";
import { formatDate } from "../../utils/DateUtils";
import Avatar from "../common/Avatar";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import LikeService from "../../services/LikeService";
import { useState } from "react";

type IProps = {
  review: ICommentUser
  onToggleLike: (pkComment: number, hasLiked: boolean) => void
}

const ReviewCard = ({ review, onToggleLike }:IProps) => {
  const [isLoadingLike, setLoadingLike] = useState(false)

  const handleToggleLike = async () => {
    if(isLoadingLike) {
      return
    }

    const token = localStorage.getItem('token')
    if(!token) {
      return toast.warn('Necesitas iniciar sesión para dar me gusta.')
    }

    try {
      setLoadingLike(true)
      const currentHasLiked = !review.hasLiked
      onToggleLike(review.pkComment, currentHasLiked)
      const hasLiked = await LikeService.toggleLike(review.pkComment)
      if (hasLiked != currentHasLiked) {
        console.log('No coincide :p')
        onToggleLike(review.pkComment, hasLiked)
      }
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError) {
        if (error.response?.data.message) {
          return toast.error(error.response?.data.message);
        }

        return toast.error('Oops... Ocurrió un error, Inténtelo más tarde');
      }
    } finally {
      setLoadingLike(false)
    }
  }

  return (
    <article className="bg-header rounded-md p-4 min-h-64 flex flex-col gap-2 lg:px-5">
      <header className="flex gap-2">
        <Avatar className="size-10" url={review.user.avatarUrl} />
        <div className="flex-grow min-w-0">
          <p className="overflow-hidden text-nowrap text-ellipsis">{review.user.name + " " + review.user.lastName}</p>
          <p className="text-sm text-gray-400">{formatDate(review.cretionDate)}</p>
        </div>
      </header>
      <div className="flex-grow">
        <p className="text-secundary-text">{review.text}</p>
      </div>
      <footer className="flex justify-between items-center">

        <div onClick={handleToggleLike} 
        className={`bg-[#50475C] hover:bg-[#675d75] transition-colors rounded-full items-center py-1 cursor-pointer px-4 flex gap-2 select-none`}>
          {review.hasLiked ? <RiThumbUpFill size={20} /> : <RiThumbUpLine size={20} />}
          {review.likes}
        </div>
        <p>
          {review.score}
          <RiStarFill size={20} className="text-yellow-300 inline ml-1 mb-1" />
        </p>
      </footer>
    </article>
  );
}

export default ReviewCard;