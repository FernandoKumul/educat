import { Button, Dialog, DialogPanel, Textarea } from "@tremor/react"
import { ICommentUser } from "../../interfaces/ICommentUser"
import AddRating from "./AddRating"
import { FormEvent, useState } from "react"
import { toast } from "react-toastify"
import { AxiosError } from "axios"
import Avatar from "../common/Avatar"
import { RiThumbUpLine } from "@remixicon/react"
import { formatDate } from "../../utils/DateUtils"
import Rating from "../common/Rating"
import CommentService from "../../services/CommentService"
import { IEditReview } from "../../interfaces/IEditReview"

type IProps = {
  purchased: boolean,
  reviewByUser: null | ICommentUser,
  courseId: number,
  onRefreshReviews: () => void

}

const UserReviewEditor = ({ purchased, reviewByUser, courseId, onRefreshReviews }: IProps) => {
  const [isTextReview, setTextReview] = useState('')
  const [isErrorText, setErroText] = useState(false)
  const [isScore, setScore] = useState(5)
  const [isEditing, setEditing] = useState(false)
  const [isLoadingEditReview, setLoadingEditReview] = useState(false)
  const [isLoadingAddReview, setLoadingAddReview] = useState(false)
  const [isLoadingDeleteReview, setLoadingDeleteReview] = useState(false)

  const [isOpen, setOpen] = useState(false)

  const handleAddReview = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const text = isTextReview.trim()
    if (!text) {
      setErroText(true)
      return toast.warning('No puedes dejar una reseña vacía')
    }

    try {
      setLoadingAddReview(true)
      await CommentService.createReview({ courseId, text: isTextReview, score: isScore })
      toast.success('Reseña agregada correctamente');
      onRefreshReviews()
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError) {
        if (error.response?.data.message) {
          return toast.error(error.response?.data.message);
        }

        return toast.error('Oops... Ocurrió un error, Inténtelo más tarde');
      }
    } finally {
      setLoadingAddReview(false)
      setErroText(false)
      setTextReview('')
    }
  }

  const handleDeleteReview = async () => {
    try {
      setLoadingDeleteReview(true)
      await CommentService.deleteComment(reviewByUser?.pkComment ?? 0)
      toast.success("Reseña borrada exitosamente")
      onRefreshReviews()
    }  catch (error) {
      console.log(error)
      if (error instanceof AxiosError) {
        if (error.response?.data.message) {
          return toast.error(error.response?.data.message);
        }

        return toast.error('Oops... Ocurrió un error, Inténtelo más tarde');
      }
    } finally {
      setLoadingDeleteReview(false)
    }
  }

  const handleEditReview = async (data: IEditReview) => {
    if (!data.text.trim()) {
      setErroText(true)
      return toast.warning('No puedes dejar una reseña vacía')
    }

    try {
      setLoadingEditReview(true)
      await CommentService.editReview(reviewByUser?.pkComment ?? 0, data)
      toast.success("Reseña Editada exitosamente")
      onRefreshReviews()
    }  catch (error) {
      console.log(error)
      if (error instanceof AxiosError) {
        if (error.response?.data.message) {
          return toast.error(error.response?.data.message);
        }

        return toast.error('Oops... Ocurrió un error, Inténtelo más tarde');
      }
    } finally {
      setLoadingEditReview(false)
    }
  }

  const handleChangeToEdit = () => {
    setEditing(true)
    setTextReview(reviewByUser?.text ?? '')
  }

  if (!purchased) {
    return
  }

  if (reviewByUser) {
    return (
      <article className="bg-header rounded-md px-4 py-6 mb-6 flex gap-4">
        <Avatar url={reviewByUser.user.avatarUrl} className="size-12" />
        <div className="flex-grow">
          <h3 className="overflow-hidden text-nowrap text-ellipsis">
            {reviewByUser.user.name + " " + reviewByUser.user.lastName} (Tu comentario)
          </h3>
          <p className="text-sm text-gray-400">{formatDate(reviewByUser.cretionDate)}</p>
          {
            isEditing
            ? <Textarea placeholder="Escribe tu reseña del curso" error={isErrorText && !isTextReview.trim()}
            rows={4} onValueChange={value => setTextReview(value)} value={isTextReview} />
            : <p>{reviewByUser.text}</p> 
          }
          <footer className="flex justify-between items-center mt-2">
          {
            isEditing
            ?
              <>
                <div className="flex items-center gap-2">
                  <AddRating defaultScore={reviewByUser.score!} onScoreChange={value => setScore(value)} />
                </div>
                <div className="flex gap-4">
                  <Button className="focus-visible:outline focus-visible:outline-current" onClick={() => setEditing(false)}>Cancelar</Button>
                  <Button className="focus-visible:outline focus-visible:outline-current" loading={isLoadingEditReview} onClick={() => handleEditReview({score: isScore, text: isTextReview})}>Guardar</Button>
                </div>
              </>
            :
              <>
                <div className="flex items-center gap-2">
                  <Rating score={reviewByUser.score!} />
                  <div className="bg-[#50475C] rounded-full items-center py-1 px-4 flex gap-2 select-none">
                    <RiThumbUpLine size={20} />
                    {reviewByUser.likes}
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button className="focus-visible:outline focus-visible:outline-current" onClick={() => setOpen(true)}>Borrar</Button>
                  <Button className="focus-visible:outline focus-visible:outline-current" onClick={handleChangeToEdit}>Editar</Button>
                </div>
              </>
          }
          </footer>
        </div>
        <Dialog open={isOpen} onClose={(val) => setOpen(val)} static={true}>
          <DialogPanel>
            <h3 className="text-lg font-semibold text-tremor-content-strong">
              ¿Estás seguro de borrar tu reseña?
            </h3>
            <footer className="mt-8 flex justify-end gap-4">
              <Button variant="secondary" onClick={() => setOpen(false)}>Cancelar</Button>
              <Button className="" loading={isLoadingDeleteReview} onClick={handleDeleteReview}>
                Borrar
              </Button>
            </footer>
          </DialogPanel>
        </Dialog>
      </article>
    )
  } else {
    return (
      <form className="mb-6" onSubmit={handleAddReview}>
        <Textarea placeholder="Escribe tu reseña del curso" error={isErrorText && !isTextReview.trim()}
          rows={4} onValueChange={value => setTextReview(value)} value={isTextReview} />
        <div className="mt-2 flex justify-between">
          <AddRating defaultScore={isScore} onScoreChange={value => setScore(value)} />
          <Button className="focus:outline focus:outline-current" loading={isLoadingAddReview}>Enviar</Button>
        </div>
      </form>
    )
  }
}

export default UserReviewEditor;