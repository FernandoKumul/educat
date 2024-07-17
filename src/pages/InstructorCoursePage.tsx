import { RiAddBoxLine, RiLoader4Line } from "@remixicon/react";
import CourseInstructorCard from "../components/course/CourseInstructorCard";
import { useEffect, useState } from "react";
import CourseService from "../services/CourseService";
import { ICourseInstructor } from "../interfaces/ICourseInstructor";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { Button, Dialog, DialogPanel, TextInput } from "@tremor/react";

const InstructorCoursePage = () => {
	const [isCourses, setCourses] = useState<ICourseInstructor[]>([])
	const [isLoading, setLoading] = useState(true)
	const [isLoadingAdd, setLoadingAdd] = useState(false)
	const [isOpenAdd, setOpenAdd] = useState(false)

	const [isInputTitle, setInputTitle] = useState('')
	const [isDirty, setDirty] = useState(false)

	const [isLoadingDelete, setLoadingDelete] = useState(false)
	const [isOpenDelete, setOpenDelete] = useState(false)
	const [isCourseSelect, setCourseSelect] = useState({title: '', courseId: 0})

	const getCourses = async () => {
		try {
			const courses = await CourseService.getCourseByUser()
			setCourses(courses)
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

	const handleClose = (val: boolean) => {
		setOpenAdd(val)
		toast.dismiss()
		setDirty(false)
	}

	const handleAddCourse = async () => {
		setDirty(true)
		const titleTrim = isInputTitle.trim()
		if (!titleTrim) {
			toast.error("No puedes dejar el título vacío", { closeButton: false })
			return
		}

		try {
			setLoadingAdd(true)
			await CourseService.create(titleTrim)
			setInputTitle('')
			setOpenAdd(false)
			getCourses()
		} catch (error) {
			console.log(error)
			if (error instanceof AxiosError) {
				if (error.response?.data.message) {
					return toast.error(error.response?.data.message);
				}

				return toast.error('Oops... Ocurrió un error, Inténtelo más tarde');
			}
		} finally {
			setLoadingAdd(false)
			setDirty(false)
			toast.dismiss()
		}
	}

	const handleDeleteCourse = async (courseId: number) => {
		try {
			setLoadingDelete(true)
			await CourseService.delete(courseId)
			setOpenDelete(false)
			getCourses()
		} catch (error) {
			console.log(error)
			if (error instanceof AxiosError) {
				if (error.response?.data.message) {
					return toast.error(error.response?.data.message);
				}

				return toast.error('Oops... Ocurrió un error, Inténtelo más tarde');
			}
		} finally {
			setLoadingDelete(false)
			setDirty(false)
			toast.dismiss()
		}
	}

	const handleOpenModalDelete = (courseId: number, title: string) => {
		setOpenDelete(true)
		setCourseSelect({courseId, title})
	}

	useEffect(() => {
		getCourses()
	}, [])

	return (
		<main className="px-12 py-4 flex flex-col flex-grow relative">
			<h1 className="text-2xl font-medium mb-6">Tus cursos creados</h1>
			{isLoading
				?
				<div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">
					<RiLoader4Line size={48} className="animate-spin" />
				</div>
				:
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-4 gap-x-8">
					<article onClick={() => setOpenAdd(true)}
						className="flex items-center justify-center flex-col cursor-pointer group hover:bg-black-1 rounded-md min-h-36">
						<span className="w-1/2 text-center group-hover:text-slate-100 transition-colors">Crear un curso nuevo</span>
						<RiAddBoxLine className="text-primary-600 transition-colors group-hover:text-primary-700" size={36} />
					</article>
					{isCourses.map(course => (
						<CourseInstructorCard key={course.pkCourse} active={course.active} onDelete={handleOpenModalDelete}
							id={course.pkCourse} image={course.cover} price={course.price} title={course.title} />
					))}
				</div>
			}

			{/* Modal para crear curso */}
			<Dialog open={isOpenAdd} onClose={handleClose} static={true}>
				<DialogPanel>
					<h3 className="text-2xl font-semibold text-tremor-content-strong mb-6">
						Agregar curso nuevo
					</h3>
					<label htmlFor="title" className="block mb-1 text-secundary-text">Título</label>
					<TextInput id="title" value={isInputTitle} autoComplete="off" name="title"
						onChange={e => setInputTitle(e.target.value)} error={isDirty && isInputTitle.trim() === ''}
						placeholder="Título de tu curso nuevo" className="custom-border-light" />
					<footer className="mt-8 flex justify-end gap-4">
						<Button variant="secondary" className="focus:outline focus:outline-current" onClick={() => handleClose(false)}>Cancelar</Button>
						<Button className="focus:outline focus:outline-current" loading={isLoadingAdd} onClick={handleAddCourse}>
							Agregar
						</Button>
					</footer>
				</DialogPanel>
			</Dialog>

			{/* Modal de confirmación para eliminar */}
			<Dialog open={isOpenDelete} onClose={(val) => setOpenDelete(val)} static={true}>
				<DialogPanel>
					<h3 className="text-lg font-semibold text-tremor-content-strong">
						¿Estás seguro de borrar el curso "{isCourseSelect.title}"?
					</h3>
					<footer className="mt-8 flex justify-end gap-4">
						<Button disabled={isLoadingDelete} variant="secondary" onClick={() => setOpenDelete(false)}>Cancelar</Button>
						<Button className="" loading={isLoadingDelete} onClick={() => handleDeleteCourse(isCourseSelect.courseId)}>
							Borrar
						</Button>
					</footer>
				</DialogPanel>
			</Dialog>
		</main>
	);
}

export default InstructorCoursePage;