import { useState } from "react";
import { Accordion, AccordionBody, AccordionHeader, Button, Select, SelectItem, TextInput, Textarea } from "@tremor/react";
import { IEditUnit, typeLesson } from "../../interfaces/IEditCourse";
import { RiAddBoxLine, RiArrowDownSLine, RiArrowUpSLine, RiDeleteBinLine } from "@remixicon/react";

type IProps = {
  unit: IEditUnit,
  totalUnits: number,
  onValueChange: (unit: IEditUnit) => void;
  onItemRemove: (index: number, order: number) => void
  onUnitUp: (index: number, order: number) => void
  onUnitDown: (index: number, order: number) => void
}

const EditUnit = ({ unit, onValueChange, onItemRemove, onUnitDown, onUnitUp, totalUnits }: IProps) => {
  const [isTitle, setTitle] = useState(unit.title)

  const handleChangeTitle = (inputValue: string) => {
    setTitle(inputValue)
    onValueChange({ ...unit, title: inputValue })
  }

  const handleChangeTypeLesson = (type: typeLesson, id: number) => {
    const updateLessons = unit.lessons.map(lesson => {
      if (lesson.pkLesson === id) {
        return { ...lesson, type }
      }
      return lesson;
    })

    onValueChange({ ...unit, lessons: updateLessons })
  }

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


  return (
    <Accordion className="mb-4">
      <AccordionHeader>
        <p className="text-ellipsis whitespace-nowrap overflow-hidden">
          {unit.order + '. ' + (unit.title ? unit.title : 'Sin título')}
        </p>
      </AccordionHeader>
      <AccordionBody className="bg-black-2 py-4">
        <section className="flex justify-between">
          <div className="flex lg:w-1/2 gap-2">
            <TextInput placeholder="" value={isTitle} onValueChange={handleChangeTitle} />
            <Button icon={RiAddBoxLine}>Lección</Button>
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
            <div className="border-t-[2px] border-gray-400 my-4"></div>
            <div>
              <h4>Lección {lesson.order}</h4>
              <h3>{lesson.title}</h3>
            </div>
            <div className="flex items-center gap-2 mt-2 mb-4">
              <Select className="w-1/4" defaultValue="video" value={lesson.type} onValueChange={(value) => handleChangeTypeLesson(value as typeLesson, lesson.pkLesson!)}>
                <SelectItem value="video">Video</SelectItem>
                <SelectItem value="text">Texto</SelectItem>
              </Select>
              <TextInput value={lesson.title} className="Nombre de la lección" onValueChange={(value) => handleChangeTitleLesson(value, lesson.pkLesson!)} />
            </div>
            {lesson.type === 'video'
            ? 
            <h2>Tipo video</h2>
            :
            <Textarea rows={4} placeholder="Escribe tu lección" value={lesson.text ?? ''} onValueChange={value => handleChangeTextLesson(value, lesson.pkLesson!)} />
            }
          </div>
        ))}
      </AccordionBody>
    </Accordion>
  );
}

export default EditUnit;