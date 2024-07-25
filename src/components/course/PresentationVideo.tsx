import { RiPlayFill } from "@remixicon/react";
import { useRef } from "react";

type IProps = {
  url: string,
  className?: string
}

interface HTMLElementWithFullScreen extends HTMLVideoElement {
	msRequestFullscreen?: () => void;
	mozRequestFullScreen?: () => void;
	webkitRequestFullscreen?: () => void;
}

const PresentationVideo = ({url, className = ''}: IProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleFullscreen = () => {
    if (videoRef.current) {
      const playerElement = videoRef.current as HTMLElementWithFullScreen;
      if (playerElement.requestFullscreen) {
        playerElement.requestFullscreen();
      } else if (playerElement.mozRequestFullScreen) { /* Firefox */
        playerElement.mozRequestFullScreen();
      } else if (playerElement.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        playerElement.webkitRequestFullscreen();
      } else if (playerElement.msRequestFullscreen) { /* IE/Edge */
        playerElement.msRequestFullscreen();
      }
    }
  };

  return (
    <article 
    className={`bg-gradient-to-r from-purple-500 via-violet-600 to-indigo-400 
    rounded-lg w-full aspect-video flex justify-center items-center ${className}`}>
      <span className="cursor-pointer bg-slate-800 rounded-full p-1 hover:text-slate-400 transition-colors" onClick={handleFullscreen}>
        <RiPlayFill size={28} className="text-primary-600" />
      </span>
      <video ref={videoRef} className="size-0" src={url}></video>
    </article>
  );
}
 
export default PresentationVideo;