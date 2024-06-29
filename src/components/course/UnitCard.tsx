import { Accordion, AccordionBody, AccordionHeader } from "@tremor/react";
import { IUnitProgram } from "../../interfaces/ICoursePublic";
import { RiFileTextLine, RiVideoOnLine } from "@remixicon/react";
import { getFormatTimeinMinutes } from "../../utils/TimeUtils";

type IProps = {
  unit: IUnitProgram,
}

const UnitCard = ({ unit }: IProps) => {
  //Calcular el tiempo de la unidad


  return (
    <Accordion className="mb-4 bg-header">
      <AccordionHeader className="text-white">
        <p className="text-ellipsis whitespace-nowrap overflow-hidden">
          {unit.order + '. ' + (unit.title ? unit.title : 'Sin título')}
        </p>
      </AccordionHeader>
      <AccordionBody className="py-4 pt-0 text-white">
        <p className="text-secundary-text mb-2">{unit.lessons.length} {unit.lessons.length === 1 ? 'Lección' : 'Lecciones'}</p>
        <div className="flex flex-col gap-4 rounded-md">
          {unit.lessons.map(lesson => (
            <article key={lesson.pkLesson} className="bg-[#443C50] flex rounded-md">
              <div
                className={`text-slate-100 bg-gradient-to-r from-purple-500 via-violet-600 to-indigo-400 w-[100px] flex 
              items-center justify-center rounded-s-md flex-shrink-0`}>
                {lesson.type === 'text' ? <RiFileTextLine /> : <RiVideoOnLine />}
              </div>
              <div className="flex-grow min-w-0 px-4 py-2">
                <h4 className="text-base font-medium whitespace-nowrap text-ellipsis overflow-hidden">
                  {lesson.title}
                </h4>
                <p className="text-secundary-text">{getFormatTimeinMinutes(lesson.timeDuration)} min</p>
              </div>
            </article>
          ))}
        </div>
      </AccordionBody>
    </Accordion>
  );
}

export default UnitCard;