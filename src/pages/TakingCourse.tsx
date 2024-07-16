import { Accordion, AccordionBody, AccordionHeader, AccordionList } from '@tremor/react';
import img from '../assets/userDefault.svg'
import Avatar from '../components/common/Avatar';
import BadgeDifficulty from '../components/course/BadgeDifficulty';

const TakingCourse = () => {
    return (
        <div className="flex lg:p-10">
            <div className="lg:w-4/5">
                <p className='text-2xl mb-5'>Titulo del curso</p>
                <div>
                    <video className='aspect-video w-11/12 rounded-md' src='' controls>
                    </video>
                </div>
                <p className='text-xl my-5'>Titulo del video - video videoso</p>
                <div className='flex items-center gap-x-3'>
                    <Avatar url={img} />
                    <p>Instructor</p>
                </div>
                <div className='flex lg:gap-x-5 mt-5'>
                    <p>1,000 estudiantes</p>
                    <BadgeDifficulty value='easy' />
                    <div className="bg-black/[0.3] rounded-full py-1 px-4 w-fit">
                        {/* {CategoriesData.find(item => item.id === isCourse.fkCategory)?.name} */}Música
                    </div>
                </div>
                <p className='w-full'>description</p>
            </div>
            <div className='lg:w-1/5'>
                <AccordionList>
                    <Accordion>
                        <AccordionHeader>
                            <p>Nombre Unidad</p>
                        </AccordionHeader>
                        <AccordionBody>
                            <div className='flex'>
                                <div className='aspect-video h-[40px] rounded-md bg-gradient-to-r from-purple-500 via-violet-600 to-indigo-400' />
                                <div className='mx-3 min-w-0'>
                                    <p className='truncate'>Titulo de Lección safuvysfjkjhdsdfghjklsdfysdhfjsdkfsojfsdufsdjfnjjnsdfnskdfksmfmksfmksfmk</p>
                                    <p>15:00 Minutos</p>
                                </div>
                                <div>

                                </div>
                            </div>
                        </AccordionBody>
                    </Accordion>
                </AccordionList>
            </div>
        </div>
    );
}
export default TakingCourse;