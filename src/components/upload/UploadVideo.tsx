import { FormEvent, useRef, useState } from "react";
import FileService from "../../services/FileService";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { RiVideoAddFill } from "@remixicon/react";
import LoaderCat from "../common/LoaderCat";

type IProps = {
  onUploadedVideo: (url: string, duration: number) => void
  className?: string,
  classNameUpload?: string
}

const UploadVideo = ({onUploadedVideo, className = '', classNameUpload = ''} : IProps) => {
  const inputVideoRef = useRef<HTMLInputElement>(null)
  const [isLoadingVideo, setLoadingVideo] = useState<boolean>(false)

  const handleSubmitVideo = async (e: FormEvent<HTMLInputElement>) => {
    const target = e.currentTarget
    const files = target.files;

    if (!files || files.length === 0) {
      //Mostrar toast
      console.error('No se seleccionó ningún archivo.');
      return
    }
    try {
      const file = files[0];
      const formData = new FormData();
      formData.append('video', file);

      setLoadingVideo(true)
      const newUrlVideo = await FileService.submitVideo(formData)
      onUploadedVideo(newUrlVideo.url, newUrlVideo.duration)
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError) {
        toast.error('El video no se logró subir: ' + error.response?.data.message);
      }
    } finally {
      setLoadingVideo(false)
    }
  };

  return (
    <article className={className}>
      <div className={"border aspect-video rounded-md mb-1 relative border-secundary-text flex items-center justify-center " + classNameUpload}>
        {isLoadingVideo
          ? <LoaderCat/>
          :
          <>
            <RiVideoAddFill size={48} />
            <div className="size-full cursor-pointer absolute" onClick={() => inputVideoRef.current?.click()}></div>
          </>
        }
        <input type="file" ref={inputVideoRef} className="hidden" accept="video/*" onChange={handleSubmitVideo} />
      </div>
      <p className="text-secundary-text text-sm">Puedes subir hasta 100MB en cualquier formato de video. Suele tomar algunos minutos.</p>
    </article>
  );
}

export default UploadVideo;