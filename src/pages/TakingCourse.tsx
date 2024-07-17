import { useContext, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import AuthContext from '../contexts/AuthContext';
import CourseService from '../services/CourseService';
import CategoriesData from '../data/CategoriesData';
import { ICoursePublic, ILessonOut } from '../interfaces/ICoursePublic';
import { AccordionList } from '@tremor/react';
import { RiGroupFill, RiLoader4Line } from '@remixicon/react';
import UnitCard from '../components/course/UnitCard';
import Avatar from '../components/common/Avatar';
import BadgeDifficulty from '../components/course/BadgeDifficulty';

const TakingCourse = () => {
    const { courseId } = useParams();
    const [params] = useSearchParams()
    const [isCourse, setCourse] = useState<null | ICoursePublic>(null);
    const [isLesson, setLesson] = useState<null | ILessonOut>(null);
    const [isLoading, setLoading] = useState<boolean>(true);
    // const dataFetch = useRef<boolean>(false);

    const { isUser } = useContext(AuthContext);

    const getLesson = async () => {
        const lessonNumber = parseInt(params.get('number') ?? '0')
        console.log(lessonNumber)
        const response = await CourseService.getLesson(lessonNumber)
        setLesson(response)
        console.log(isLesson)
    }

    useEffect(() => {
        const getCourse = async () => {
            const courseIdInt = parseInt(courseId ?? '0')
            try {
                const dataCourse = await CourseService.getCoursePublic(courseIdInt)
                dataCourse.rating = Math.round(dataCourse.rating * 100) / 100
                setCourse(dataCourse)
                getLesson()
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
        <div className="flex flex-col lg:flex-row px-6 py-6 lg:px-24 lg:py-10 lg:gap-4 xl:px-36">
            <div className="lg:w-4/5">
                <p className='text-2xl mb-5'>{isCourse.title}</p>
                {isLesson?.type === 'text' &&
                    <div className='border-b-2 mb-5 lg:w-[95%] lg:border-b-tremor-content'>
                        <p className='text-xl text-secundary-text'>{isLesson?.title}</p>
                        <p className='text-md my-5 ml-5'>{isLesson?.text}</p>
                    </div>
                }
                {isLesson?.type === 'video' &&
                    <div>
                        <video className='aspect-video w-full lg:w-11/12 rounded-md' src={isLesson?.videoUrl} controls>
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
            <div className='lg:w-1/5'>
                <AccordionList className='overflow-auto max-h-[600px]'>
                    {isCourse.units.map(unit => (
                        <UnitCard key={unit.pkUnit} unit={unit} purchased={isCourse.purchased} />
                    ))}
                </AccordionList>
            </div>
        </div>
    );
}
export default TakingCourse;