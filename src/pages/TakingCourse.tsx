import { useContext, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import AuthContext from '../contexts/AuthContext';
import CourseService from '../services/CourseService';
import CategoriesData from '../data/CategoriesData';
import { ICoursePublic, ILessonOut } from '../interfaces/ICoursePublic';
import { AccordionList } from '@tremor/react';
import { RiGroupFill } from '@remixicon/react';
import UnitCard from '../components/course/UnitCard';
import Avatar from '../components/common/Avatar';
import BadgeDifficulty from '../components/course/BadgeDifficulty';
import ProgressService from '../services/ProgressService';
import ProgressBar from '../components/common/ProgressBar';
import LoaderCat from '../components/common/LoaderCat';

const TakingCourse = () => {
    const { courseId } = useParams();
    const [params] = useSearchParams()
    const [isCourse, setCourse] = useState<null | ICoursePublic>(null);
    const [isLesson, setLesson] = useState<null | ILessonOut>(null);
    const [isLoading, setLoading] = useState<boolean>(true);
    // const dataFetch = useRef<boolean>(false);

    const { isUser } = useContext(AuthContext);

    const getLesson = async (dataCourse: ICoursePublic | null) => {
        const lessonNumber = parseInt(params.get('number') ?? '0')
        console.log(lessonNumber)
        const response = await CourseService.getLesson(lessonNumber)
        setLesson(response)
        saveProgress(response.pkLesson, dataCourse)
    }

    const saveProgress = async (lessonId: number, dataCourse: ICoursePublic | null) => {
        try {
            await ProgressService.addProgress(lessonId)
            if (!dataCourse) return
            const newUnits = [...dataCourse.units].map(unit => {
                const newLessons = [...unit.lessons].map(lesson => {
                    if (lesson.pkLesson === lessonId) {
                        lesson.completed = true
                    }
                    return lesson
                })
                return { ...unit, lessons: newLessons }
            })

            setCourse({ ...dataCourse, units: newUnits })
        } catch (error) {
            console.log(error)
            if (error instanceof AxiosError) {
                if (error.response?.data.message === 'El progreso ya ha sido agregado') {
                    return
                }

                if (error.response?.data.message) {
                    return toast.error(error.response?.data.message);
                }
                return toast.error('Oops... Ocurrió un error, Inténtelo más tarde');
            }
        }
    }

    useEffect(() => {
        const getCourse = async () => {
            const courseIdInt = parseInt(courseId ?? '0')
            try {
                const dataCourse = await CourseService.getCoursePublic(courseIdInt)
                dataCourse.rating = Math.round(dataCourse.rating * 100) / 100
                setCourse(dataCourse)
                getLesson(dataCourse)
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
        getCourse()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params])

    if (isLoading) {
        return (
            <div className="flex-grow flex items-center justify-center">
                <LoaderCat/>
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

    const getNumbersLessons = () => {
        let countLessons = 0
        isCourse.units.forEach(unit => {
            countLessons += unit.lessons.length
        });
        return countLessons
    }

    const getNumbersLessonsCompleted = () => {
        let countLessons = 0
        isCourse.units.forEach(unit => {
            unit.lessons.forEach(lesson => {
                if (lesson.completed) {
                    countLessons++
                }
            })
        });
        return countLessons
    }

    return (
        <div className="flex flex-col lg:flex-row px-6 py-6 lg:px-24 lg:py-10 lg:gap-4">
            <div className="lg:w-[70%] lg:pr-6 flex-shrink-0">
                <p className='text-2xl mb-5'>{isCourse.title}</p>
                {isLesson?.type === 'text' &&
                    <div className='border-b-2 mb-5 lg:w-[95%] lg:border-b-tremor-content'>
                        <p className='text-xl text-secundary-text'>{isLesson?.title}</p>
                        <div className='text-md my-5 ml-5 overflow-hidden text-ellipsis'>{isLesson?.text}</div>
                    </div>
                }
                {isLesson?.type === 'video' &&
                    <div>
                        <video className='aspect-video w-full rounded-md' src={isLesson?.videoUrl} controls>
                        </video>
                        <p className='text-xl my-5'>{isLesson?.title}</p>
                    </div>
                }
                <div className='flex items-center gap-x-3'>
                    <Avatar url={isCourse.instructor.avatarUrl} />
                    <p>{isCourse.instructor.name + ' ' + isCourse.instructor.lastName}</p>
                </div>
                <div className='flex flex-wrap gap-4 items-center mt-5 lg:gap-x-5'>
                    <div className='flex gap-x-2'>
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
            <div className='lg:w-[30%] min-w-0'>
                <ProgressBar value={getNumbersLessonsCompleted() * 100 / getNumbersLessons()} className='mb-2' />
                <div className="flex mb-4 justify-between text-secundary-text">
                    <h2>Lecciones completadas</h2>
                    <span>{getNumbersLessonsCompleted()}/{getNumbersLessons()}</span>
                </div>
                <AccordionList className='overflow-auto max-h-[500px] custom-scroll-1 w-full'>
                    {isCourse.units.map(unit => (
                        <UnitCard key={unit.pkUnit} unit={unit} purchased={isCourse.purchased} />
                    ))}
                </AccordionList>
            </div>
        </div>
    );
}
export default TakingCourse;