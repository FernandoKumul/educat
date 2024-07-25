import { Accordion, AccordionBody, AccordionHeader } from "@tremor/react";
import { IUnitProgram } from "../../interfaces/ICoursePublic";
import { RiEyeFill, RiEyeOffFill, RiFileTextLine, RiVideoOnLine } from "@remixicon/react";
import { getFormatTimeinMinutes } from "../../utils/TimeUtils";
import { Link } from "react-router-dom";

type IProps = {
  unit: IUnitProgram,
  purchased: boolean
}

const UnitCard = ({ unit, purchased }: IProps) => {

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
              <div className="flex-grow min-w-0 px-4 gap-2 py-2 flex justify-between">
                <div className="min-w-0 flex-grow">
                  {purchased
                    ?
                    <Link to={`/course/${unit.fkCourse}/lesson?number=${lesson.pkLesson}`} title={lesson.title}
                      className="block text-base font-medium whitespace-nowrap text-ellipsis overflow-hidden hover:underline w-fit max-w-full">
                      {lesson.title}
                    </Link>
                    :
                    <h4 className="text-base font-medium whitespace-nowrap text-ellipsis overflow-hidden">
                      {lesson.title}
                    </h4>
                  }
                  <p className="text-secundary-text">{getFormatTimeinMinutes(lesson.timeDuration)} min</p>
                </div>
                {purchased && 
                  (lesson.completed ? <RiEyeFill className="flex-shrink-0" /> : <RiEyeOffFill className="flex-shrink-0" />)
                }
              </div>
            </article>
          ))}
        </div>
      </AccordionBody>
    </Accordion>
  );
}

export default UnitCard;