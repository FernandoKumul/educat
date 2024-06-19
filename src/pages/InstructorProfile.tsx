

const InstructorProfile = () => {
    return (
        <div className="p-10 flex h-full justify-around items-center">
            <section className="relative bg-black-auth p-10 rounded-xl gap-y-5 text-center flex flex-col items-center max-w-sm">
                <div className="relative w-full">
                    <img
                        className="absolute left-[60px] -top-28  w-44 h-44 rounded-full object-cover"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiIWuOZ5q3JRNi_SQmnDol_QYA4oc0fF7guQ&s" // Reemplaza con la ruta a la imagen
                        alt="user image"
                    />
                </div>
                <div className="mt-14">
                    <p className="text-2xl text-white">Luis Flores</p>
                    <p className="text-sm text-secondary-text">Instructor | ocupación</p>
                </div>
                <div className="border-b border-black-2 w-full pb-5">
                    <p className="text-white">3.7 (100 Reseñas)</p>
                </div>
                <div className="grid grid-cols-2 justify-items-center gap-10 text-white">
                    <div>
                        <p className="text-xl">22</p>
                        <p className="text-sm text-gray-400">Cursos completados</p>
                    </div>
                    <div>
                        <p className="text-xl">2</p>
                        <p className="text-sm text-gray-400">Cursos impartidos</p>
                    </div>
                    <div className="col-span-2">
                        <p className="text-xl">3</p>
                        <p className="text-sm text-gray-400">Cursos en proceso</p>
                    </div>
                </div>
            </section>
            <section className="bg-black-auth mt-5">
                <p className="text-white">Descripción</p>
            </section>
        </div>
    );
}
export default InstructorProfile;