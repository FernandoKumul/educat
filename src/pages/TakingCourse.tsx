import { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import AuthContext from '../contexts/AuthContext';
import CourseService from '../services/CourseService';
import CategoriesData from '../data/CategoriesData';
import { ICoursePublic, ILessonOut } from '../interfaces/ICoursePublic';
import { Accordion, AccordionBody, AccordionHeader, AccordionList } from '@tremor/react';
import { RiFileTextLine, RiGroupFill, RiLoader4Line, RiVideoOnLine } from '@remixicon/react';
import Avatar from '../components/common/Avatar';
import BadgeDifficulty from '../components/course/BadgeDifficulty';
import { getFormatTimeinMinutes } from '../utils/TimeUtils';

const TakingCourse = () => {
    const { courseId } = useParams();
    const [isCourse, setCourse] = useState<null | ICoursePublic>(null);
    const [isLesson, setLesson] = useState<null | ILessonOut>(null);
    const [isLoading, setLoading] = useState<boolean>(true);
    const dataFetch = useRef<boolean>(false);

    const { isUser } = useContext(AuthContext);

    const getLesson = async (lessonId: number) => {
        const response = await CourseService.getLesson(lessonId)
        setLesson(response)
        console.log(isLesson)
    }

    useEffect(() => {
        const getCourse = async () => {
            dataFetch.current = true
            const courseIdInt = parseInt(courseId ?? '0')
            try {
                const dataCourse = await CourseService.getCoursePublic(courseIdInt)
                dataCourse.rating = Math.round(dataCourse.rating * 100) / 100
                setCourse(dataCourse)
                const initialLesson = dataCourse.units[0].lessons[0].pkLesson
                getLesson(initialLesson)
            } catch (error) {
                console.log(error)
                if (error instanceof AxiosError) {
                    if (error.response?.data.message) {
                        return toast.error(error.response?.data.message);
                    }
                    return toast.error('Oops... Ocurrió un error, Inténtelo más tarde');
                }
            } finally {
                setLoading(false)
            }
        }
        if (!dataFetch.current) {
            getCourse()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (isLoading) {
        return (
            <div className="flex-grow flex items-center justify-center">
                <RiLoader4Line size={48} className="animate-spin" />
            </div>
        )
    }
    if (!isCourse) {
        return (
            <div className="flex-grow flex items-center justify-center">
                <h1 className="text-lg">Curso no encontrado</h1>
            </div>
        )
    }
    if (!isCourse.purchased && isUser) {
        return (
            <div className="flex-grow flex items-center justify-center">
                <h1 className="text-lg">¡Usted no ha comprado este curso!</h1>
            </div>
        )
    }
    console.log(isLesson)
    return (
        <div className="flex lg:p-10">
            <div className="lg:w-4/5">
                <p className='text-2xl mb-5'>{isCourse.title}</p>
                {isLesson?.type === 'text' &&
                    <div>
                        <p className='text-xl my-5 text-secundary-text'>{isLesson?.title}</p>
                        <p className='text-md my-5 ml-5'>{isLesson?.text}</p>
                    </div>
                }
                {isLesson?.type === 'video' &&
                    <div>
                        <video className='aspect-video w-11/12 rounded-md' src={isLesson?.videoUrl} controls>
                        </video>
                        <p className='text-xl my-5'>{isLesson?.title}</p>
                    </div>
                }
                <div className='flex items-center gap-x-3'>
                    <Avatar url={isCourse.instructor.avatarUrl} />
                    <p>{isCourse.instructor.name + ' ' + isCourse.instructor.lastName}</p>
                </div>
                <div className='flex mt-5 lg:gap-x-5 lg:items-center'>
                    <div className='flex lg:gap-x-2'>
                        <RiGroupFill size={20} />
                        <p>{isCourse.numberStudents} {isCourse.numberStudents === 1 ? 'Estudiante' : 'Estudiantes'}</p>
                    </div>
                    <BadgeDifficulty value={isCourse.difficulty || ''} />
                    <div className="bg-black/[0.3] rounded-full py-1 px-4 w-fit">
                        {CategoriesData.find(item => item.id === isCourse.fkCategory)?.name}
                    </div>
                </div>
                <p className='w-full my-5'>{isCourse.description}</p>
            </div>
            <div className='lg:w-1/5'>
                <AccordionList>
                    {isCourse.units.map(unit => (
                        <Accordion key={unit.pkUnit} className="mb-4 bg-header">
                            <AccordionHeader className="text-white">
                                <p className="text-ellipsis whitespace-nowrap overflow-hidden">
                                    {unit.order + '. ' + (unit.title ? unit.title : 'Sin título')}
                                </p>
                            </AccordionHeader>
                            <AccordionBody className="py-4 pt-0 text-white">
                                <p className="text-secundary-text mb-2">{unit.lessons.length} {unit.lessons.length === 1 ? 'Lección' : 'Lecciones'}</p>
                                <div className="flex flex-col gap-4 rounded-md">
                                    {unit.lessons.map(lesson => (
                                        <article key={lesson.pkLesson} onClick={() => getLesson(lesson.pkLesson)} className={`${isLesson?.pkLesson === lesson.pkLesson ? 'text-details' : 'text-white'} ' bg-black-2 flex rounded-md cursor-pointer hover:bg-black-auth hover:transition-colors'`}>
                                            <div
                                                className={`text-slate-100 bg-gradient-to-r from-purple-500 via-violet-600 to-indigo-400 w-[100px] flex items-center justify-center rounded-s-md flex-shrink-0`}>
                                                {lesson.type === 'text' ? <RiFileTextLine /> : <RiVideoOnLine />}
                                            </div>
                                            <div className="flex-grow min-w-0 px-4 py-2">
                                                <h4 className="text-base font-medium whitespace-nowrap text-ellipsis overflow-hidden">
                                                    {lesson.title}
                                                </h4>
                                                <p>{getFormatTimeinMinutes(lesson.timeDuration)} min</p>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </AccordionBody>
                        </Accordion>
                    ))}
                </AccordionList>
            </div>
        </div>
    );
}
export default TakingCourse;