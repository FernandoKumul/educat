import { useState } from "react";
import { Accordion, AccordionBody, AccordionHeader, Button, Select, SelectItem, TextInput, Textarea } from "@tremor/react";
import { IEditLesson, IEditUnit, typeLesson } from "../../interfaces/IEditCourse";
import { RiAddBoxLine, RiArrowDownSLine, RiArrowUpSLine, RiCloseLine, RiDeleteBinLine } from "@remixicon/react";
import PresentationVideo from "./PresentationVideo";
import UploadVideo from "../upload/UploadVideo";
import { getFormatTime } from "../../utils/TimeUtils";

type IProps = {
  unit: IEditUnit,
  totalUnits: number,
  dirtyForm: boolean,
  onValueChange: (unit: IEditUnit) => void;
  onItemRemove: (index: number, order: number) => void
  onUnitUp: (index: number, order: number) => void
  onUnitDown: (index: number, order: number) => void
}

let lessonId = -1

const EditUnit = ({ unit, onValueChange, onItemRemove, onUnitDown, onUnitUp, totalUnits, dirtyForm }: IProps) => {
  const [isTitle, setTitle] = useState(unit.title)

  const handleChangeTitle = (inputValue: string) => {
    setTitle(inputValue)
    onValueChange({ ...unit, title: inputValue })
  }

  const handleChangeTypeLesson = (type: typeLesson, id: number) => {
    const updateLessons = unit.lessons.map(lesson => {
      if (lesson.pkLesson === id) {
        if(type === 'text') {
          return { ...lesson, type, videoUrl:null, timeDuration: 0 }
        }
        return { ...lesson, type, timeDuration: 0, text: null }
      }
      return lesson;
    })

    onValueChange({ ...unit, lessons: updateLessons })
  }

  //Lessons

  const handleChangeTitleLesson = (title: string, id: number) => {
    const updateLessons = unit.lessons.map(lesson => {
      if (lesson.pkLesson === id) {
        return { ...lesson, title }
      }
      return lesson;
    })

    onValueChange({ ...unit, lessons: updateLessons })
  }

  const handleChangeTextLesson = (text: string, id: number) => {
    const updateLessons = unit.lessons.map(lesson => {
      if (lesson.pkLesson === id) {
        return { ...lesson, text }
      }
      return lesson;
    })

    onValueChange({ ...unit, lessons: updateLessons })
  }

  const handleChangeDurationTextLesson = (text: string, id: number) => {
    const timeDuration = getSecondsByReading(text)
    const updateLessons = unit.lessons.map(lesson => {
      if (lesson.pkLesson === id) {
        return { ...lesson, timeDuration: Math.round(timeDuration) }
      }
      return lesson;
    })

    onValueChange({ ...unit, lessons: updateLessons })
  }

  const getSecondsByReading = (text: string) => {
    const words = text.trim().split(/\s+/).length;
    const WPM = 200;

    let seconds = words / (WPM / 60);
    seconds = Math.round(seconds * 100) / 100;

    return seconds
  }

  const handleDeleteVideoUrl = (id: number) => {
    const updateLessons = unit.lessons.map(lesson => {
      if (lesson.pkLesson === id) {
        return { ...lesson, videoUrl: null }
      }
      return lesson;
    })

    onValueChange({ ...unit, lessons: updateLessons })
  }

  const handleAddVideoUrl = (videoUrl: string, timeDuration: number, id: number) => {
    const updateLessons = unit.lessons.map(lesson => {
      if (lesson.pkLesson === id) {
        return { ...lesson, videoUrl, timeDuration: Math.round(timeDuration) }
      }
      return lesson;
    })

    onValueChange({ ...unit, lessons: updateLessons })
  }

  const handleAddLesson = () => {
    const newLesson: IEditLesson = {
      pkLesson: lessonId,
      cretionDate: '',
      videoUrl: null,
      type: 'video',
      text: null,
      title: '',
      fkunit: unit.pkUnit!,
      order: unit.lessons.length + 1,
      timeDuration: 0
    }

    lessonId--

    onValueChange({ ...unit, lessons: [...unit.lessons, newLesson] })
  }

  const handleRemoveLesson = (id: number, order: number) => {
    let updateLessons = unit.lessons.filter(lesson => lesson.pkLesson !== id)

    updateLessons = updateLessons.map(lesson => {
      if (lesson.order > order) lesson.order--
      return lesson
    })

    onValueChange({ ...unit, lessons: updateLessons })
  }

  const handleUpLesson = (id: number, order: number) => {
    const updateLessons = [...unit.lessons]
    const findIndex = updateLessons.findIndex(item => item.pkLesson === id)

    if (findIndex == -1) return

    const findIndexOther = updateLessons.findIndex(item => item.order === order - 1)

    if (findIndexOther == -1) return

    updateLessons[findIndex].order--
    updateLessons[findIndexOther].order++
    updateLessons.sort((a, b) => a.order - b.order);
    onValueChange({ ...unit, lessons: updateLessons })
  }

  const handleDownLesson = (id: number, order: number) => {
    const updateLessons = [...unit.lessons]
    const findIndex = updateLessons.findIndex(item => item.pkLesson === id)

    if (findIndex == -1) return

    const findIndexOther = updateLessons.findIndex(item => item.order === order + 1)

    if (findIndexOther == -1) return

    updateLessons[findIndex].order++
    updateLessons[findIndexOther].order--
    updateLessons.sort((a, b) => a.order - b.order);
    onValueChange({ ...unit, lessons: updateLessons })
  }


  return (
    <Accordion className="mb-4">
      <AccordionHeader>
        <p className="text-ellipsis whitespace-nowrap overflow-hidden">
          {unit.order + '. ' + (unit.title ? unit.title : 'Sin título')}
        </p>
      </AccordionHeader>
      <AccordionBody className="bg-black-2 py-4">
        <section className="flex justify-between items-start flex-wrap gap-y-2">
          <div>
            <div className="flex w-full xl:w-1/2 gap-2 mb-1">
              <TextInput placeholder="Nombre de la unidad" error={dirtyForm && unit.title.trim() === ''} value={isTitle} onValueChange={handleChangeTitle} />
              <Button icon={RiAddBoxLine} onClick={handleAddLesson}>Lección</Button>
            </div>
            <span className="text-slate-300 text-sm">Máximo 100 carateres</span>
          </div>
          <div className="flex gap-2">
            <button onClick={() => onUnitUp(unit.pkUnit!, unit.order)} disabled={unit.order === 1}
              className={`border-gray-400 border p-2 rounded-md text-gray-400 
              ${unit.order === 1 ? 'bg-gray-200/30 cursor-not-allowed' : 'hover:bg-primary-400 hover:text-white hover:border-white '}`}>
              <RiArrowUpSLine />
            </button>
            <button onClick={() => onUnitDown(unit.pkUnit!, unit.order)} disabled={unit.order === totalUnits}
              className={`border-gray-400 border p-2 rounded-md text-gray-400 
                ${unit.order === totalUnits ? 'bg-gray-200/30 cursor-not-allowed' : 'hover:bg-primary-400 hover:text-white hover:border-white '}`}>
              <RiArrowDownSLine />
            </button>
            <button onClick={() => onItemRemove(unit.pkUnit!, unit.order)}
              className="border-gray-400 border p-2 rounded-md text-gray-400 hover:bg-primary-400 hover:text-white hover:border-white">
              <RiDeleteBinLine />
            </button>
          </div>
        </section>
        {unit.lessons.map((lesson) => (
          <div key={lesson.pkLesson}>
            <div className="border-t-[2px] border-gray-400 mt-4 mb-2"></div>
            <div className="text-gray-300 flex justify-between items-center">
              <h4>Lección {lesson.order}. {lesson.title ? lesson.title : 'Esta lección no tienen nombre'}</h4>
              <div className="flex gap-2">
                <button onClick={() => handleUpLesson(lesson.pkLesson!, lesson.order)} disabled={lesson.order === 1}
                  className={`border-0 p-2 rounded-md text-gray-400 
                    ${lesson.order === 1 ? 'bg-gray-200/30 cursor-not-allowed' : 'hover:bg-primary-400 hover:text-white hover:border-white '}`}>
                  <RiArrowUpSLine />
                </button>
                <button onClick={() => handleDownLesson(lesson.pkLesson!, lesson.order)} disabled={lesson.order === unit.lessons.length}
                  className={`border-0 p-2 rounded-md text-gray-400 
                    ${lesson.order === unit.lessons.length ? 'bg-gray-200/30 cursor-not-allowed' : 'hover:bg-primary-400 hover:text-white hover:border-white '}`}>
                  <RiArrowDownSLine />
                </button>
                <button onClick={() => handleRemoveLesson(lesson.pkLesson!, lesson.order)}
                  className="border-0 p-2 rounded-md text-gray-400 hover:bg-primary-400 hover:text-white hover:border-white">
                  <RiDeleteBinLine />
                </button>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start gap-2 mt-2 mb-4">
              <Select className="sm:w-1/4" defaultValue="video" value={lesson.type}
                onValueChange={(value) => handleChangeTypeLesson(value as typeLesson, lesson.pkLesson!)}>
                <SelectItem value="video">Video</SelectItem>
                <SelectItem value="text">Texto</SelectItem>
              </Select>
              <div className="w-full">
                <TextInput value={lesson.title} error={dirtyForm && lesson.title.trim() === ''} placeholder="Nombre de la lección"
                  onValueChange={(value) => handleChangeTitleLesson(value, lesson.pkLesson!)} className="w-full mb-1" />
                <span className="text-slate-300 text-sm">Máximo 100 carateres</span>
              </div>
            </div>
            {lesson.type === 'video'
              ?
              lesson.videoUrl
                ?
                <div>
                  <div className="relative w-1/2 max-w-[200px]">
                    <PresentationVideo url={lesson.videoUrl} />
                    <span
                      onClick={() => handleDeleteVideoUrl(lesson.pkLesson!)}
                      className="cursor-pointer bg-slate-900/80 rounded-full p-1 hover:text-slate-400 transition-colors absolute top-1 right-1">
                      <RiCloseLine />
                    </span>
                  </div>
                  <p className="mt-2 text-gray-300">Duración: {getFormatTime(lesson.timeDuration)}</p>
                </div>
                :
                <UploadVideo className="mb-4 flex gap-2" classNameUpload="w-1/2 max-w-[200px] flex-shrink-0" onUploadedVideo={(url, duration) => handleAddVideoUrl(url, duration, lesson.pkLesson!)} />
              :
              <>
                <Textarea rows={4} placeholder="Escribe tu lección" error={dirtyForm && (lesson.text === null || lesson.text.trim() === '')} value={lesson.text ?? ''}
                  onBlur={() => handleChangeDurationTextLesson(lesson.text ?? '', lesson.pkLesson!)}
                  onValueChange={value => handleChangeTextLesson(value, lesson.pkLesson!)} />
                  <p className="mt-2 text-gray-300">Duración: {getFormatTime(lesson.timeDuration)}</p>
              </>

            }
          </div>
        ))}
      </AccordionBody>
    </Accordion>
  );
}

export default EditUnit;