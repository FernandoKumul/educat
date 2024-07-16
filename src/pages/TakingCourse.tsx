import img from '../assets/userDefault.svg'
import Avatar from '../components/common/Avatar';
import BadgeDifficulty from '../components/course/BadgeDifficulty';

const TakingCourse = () => {
    return (
        <div className="flex lg:p-10">
            <div className="lg:w-4/5">
                <p className='text-2xl mb-5'>Titulo del curso</p>
                <div>
                    <video className='w-11/12' src='' controls>
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
                <p>Lista de reproducción</p>
                <ul>
                    <li>Video 1</li>
                    <li>Video 2</li>
                    <li>Video 3</li>
                    <li>Video 4</li>
                    <li>Video 5</li>
                    <li>Video 6</li>
                    <li>Video 7</li>
                    <li>Video 8</li>
                    <li>Video 9</li>
                    <li>Video 10</li>
                </ul>
            </div>
        </div>
    );
}
export default TakingCourse;