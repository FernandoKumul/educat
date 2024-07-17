import { FormEvent, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AxiosError } from "axios";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { RiAddBoxLine, RiArrowLeftLine, RiCloseFill, RiCloseLine, RiEyeFill, RiImageAddLine, RiLoader4Line, RiSave3Fill, RiUploadCloudFill } from "@remixicon/react";
import { AccordionList, Button, NumberInput, Select, SelectItem, TextInput, Textarea } from "@tremor/react";
import { IEditCourse, IEditUnit } from "../interfaces/IEditCourse";
import CategoriesData from "../data/CategoriesData";
import FileService from "../services/FileService";
import PresentationVideo from "../components/course/PresentationVideo";
import TagInput from "../components/course/TagInput";
import EditUnit from "../components/course/EditUnit";
import UploadVideo from "../components/upload/UploadVideo";
import { getFormatTime } from "../utils/TimeUtils";
import CourseService from "../services/CourseService";

interface ICourseInfoP1 {
  title: string;
  summary: string | null;
  language: string | null;
  difficulty: string | null;
  price: number | null;
  requeriments: string | null;
  description: string | null;
}

interface ILearning {
  id: number
  text: string
}

let learningId = 1
let unitId = -1

const EditCourse = () => {
  const { courseId } = useParams()
  const {
    register,
    reset,
    control,
    formState: { errors },
    getValues,
    setValue,
    handleSubmit,
    trigger
  } = useForm<ICourseInfoP1>()
  const [isCourse, setCourse] = useState<IEditCourse | null>(null)
  const [isLoading, setLoading] = useState<boolean>(true)
  const [isLoadingSave, setLoadingSave] = useState<boolean>(false)

  const [isCategory, setCategory] = useState("")
  const [istags, setTags] = useState<string[]>([])
  const [learningList, setLearningList] = useState<ILearning[]>([])
  const [isDirty, setDirty] = useState<boolean>(false)
  const [isCurrentImg, setCurrentImg] = useState<string | null>(null)
  const [isVideoUrl, setVideoUrl] = useState<string | null>(null)

  const inputImgRef = useRef<HTMLInputElement>(null)
  const [isLoadingImg, setLoadingImg] = useState<boolean>(false)

  const [isEditUnits, setEditUnits] = useState<IEditUnit[]>([])
  const hasFetchedData = useRef(false)

  const [isLoadingPublish, setLoadingPublish] = useState(false)

  //publish
  const handlePublish = async () => {
		try {
			setLoadingPublish(true)
			await CourseService.publish(isCourse?.pkCourse ?? 0)
      toast.success('Curso publicado con éxito', { pauseOnHover: false, autoClose: 3000 })
      getData()
		} catch (error) {
			console.log(error)
			if (error instanceof AxiosError) {
				if (error.response?.data.message) {
					return toast.error(error.response?.data.message);
				}

				return toast.error('Oops... Ocurrió un error, Inténtelo más tarde');
			}
		} finally {
			setLoadingPublish(false)
		}
  }

  //Learning
  const handleAddLearn = () => {
    setLearningList([...learningList, { id: learningId, text: '' }])
    learningId++
  }

  const handleAddLearnChange = (index: number, text: string) => {
    const currentInputs = [...learningList]
    currentInputs[index].text = text
    setLearningList(currentInputs)
  };

  const handleRemoveLearnChange = (index: number) => {
    const currentInputs = [...learningList]
    currentInputs.splice(index, 1)
    setLearningList(currentInputs)
  }

  //Imagen
  const handleSubmitImage = async (e: FormEvent<HTMLInputElement>) => {
    const target = e.currentTarget
    const files = target.files;

    if (!files || files.length === 0) {
      //Mostrar toast
      console.error('No se seleccionó ningún archivo.');
      return
    }
    try {
      const file = files[0];
      const formData = new FormData();
      formData.append('file', file);

      setLoadingImg(true)
      const newUrl = await FileService.submitImage(formData)
      setCurrentImg(newUrl)
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError) {
        toast.error('La imagen no se logró subir');
      }
    } finally {
      setLoadingImg(false)
    }
  };

  //Units
  const handleUpdateUnit = (newUnit: IEditUnit) => {
    const updateUnits = isEditUnits.map(item =>
      item.pkUnit === newUnit.pkUnit ? newUnit : item
    );
    setEditUnits(updateUnits);
  };

  const handleAddUnit = () => {
    const newUnit: IEditUnit = {
      pkUnit: unitId,
      title: '',
      fkCourse: parseInt(courseId ?? '0'),
      lessons: [],
      order: isEditUnits.length + 1
    }

    unitId--

    setEditUnits([
      ...isEditUnits,
      newUnit
    ])
  }

  const handleUpUnit = (id: number, order: number) => {
    const newEditUnits = [...isEditUnits]
    const findIndex = newEditUnits.findIndex(item => item.pkUnit === id)

    if (findIndex == -1) return

    const findIndexOther = newEditUnits.findIndex(item => item.order === order - 1)

    if (findIndexOther == -1) return

    newEditUnits[findIndex].order--
    newEditUnits[findIndexOther].order++
    newEditUnits.sort((a, b) => a.order - b.order);
    setEditUnits(newEditUnits)
  }

  const handleDownUnit = (id: number, order: number) => {
    const newEditUnits = [...isEditUnits]
    const findIndex = newEditUnits.findIndex(item => item.pkUnit === id)

    if (findIndex == -1) return

    const findIndexOther = newEditUnits.findIndex(item => item.order === order + 1)

    if (findIndexOther == -1) return

    newEditUnits[findIndex].order++
    newEditUnits[findIndexOther].order--
    newEditUnits.sort((a, b) => a.order - b.order);
    setEditUnits(newEditUnits)
  }

  const handleRemoveUnit = (id: number, order: number) => {
    let newUnits = isEditUnits.filter(item => item.pkUnit !== id);

    newUnits = newUnits.map(item => {
      if (item.order > order) item.order--
      return item
    })
    setEditUnits(newUnits)
  }

  const getNumbersLessons = () => {
    let countLessons = 0
    isEditUnits.forEach(unit => {
      countLessons += unit.lessons.length
    });
    return countLessons
  }

  const getTimeByLessons = () => {
    let totalTime = 0
    isEditUnits.forEach(unit => {
      unit.lessons.forEach(lesson => totalTime += lesson.timeDuration)
    });
    return getFormatTime(totalTime)
  }


  const handleSaveCourse = async () => {
    handleSubmit(() => { })()
    
    const isValidTitle = await trigger('title')
    setDirty(true)

    if (!isValidTitle) {
      return toast.error('El título es obligatorio')
    }

    for (const learning of learningList) {
      if (learning.text.trim() === '') {
        return toast.error('Un campo de la sección que aprenderán está vacío.')
      }
    }

    for (const unit of isEditUnits) {
      if (unit.title.trim() === '') {
        return toast.error(`El titulo de la unidad ${unit.order} está vacío.`)
      }

      for (const lesson of unit.lessons) {
        if (lesson.title.trim() === '') {
          return toast.error(`El titulo de la lección ${lesson.order} de la unidad ${unit.order} está vacío.`)
        }

        if (lesson.type === 'text') {
          if (!lesson.text?.trim()) {
            return toast.error(`El texto de la lección ${lesson.order} de la unidad ${unit.order} está vacío.`)
          }
        } else {
          if (!lesson.videoUrl) {
            return toast.error(`No has subido un video en la lección ${lesson.order} de la unidad ${unit.order}.`)
          }
        }
      }
    }


    const updateUnits = isEditUnits.map(({ pkUnit, ...unit }) => {
      if (pkUnit! <= -1) {
        return { ...unit }
      }
      return { ...unit, pkUnit }
    })

    const dataForm = getValues()
    console.log({ dataForm })
    const data: IEditCourse = { ...isCourse } as IEditCourse
    data.fkCategory = parseInt(isCategory) ?? null
    data.title = dataForm.title
    data.summary = dataForm.summary
    data.language = dataForm.language
    data.difficulty = dataForm.difficulty
    data.price = isNaN(dataForm.price!) ? null : dataForm.price
    data.videoPresentation = isVideoUrl
    data.cover = isCurrentImg
    data.requeriments = dataForm.requeriments
    data.description = dataForm.description
    data.tags = istags.length === 0 ? null : istags.join(',')
    data.learnText = learningList.length === 0 ? null : learningList.map(item => item.text).join(',')
    data.units = updateUnits
    console.log({ data })

    try {
      setLoadingSave(true)
      await CourseService.saveDraft(isCourse?.pkCourse ?? 0, data)
      toast.success('Curso actualizado con éxito', { pauseOnHover: false, autoClose: 3000 })
      setDirty(false)
      reset()
      setLoading(true)
      getData()
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError) {
        if (error.response?.data.message) {
          return toast.error(error.response?.data.message);
        }

        return toast.error('Oops... Ocurrió un error, Intentelo más tarde');
      }
    } finally {
      setLoadingSave(false)
    }
  }

  const getData = async () => {
    try {
      const numCourseId = parseInt(courseId ?? '')
      const dataCourse = await CourseService.getCourseToEdit(numCourseId)
      dataCourse.units.sort((a, b) => a.order - b.order);
      dataCourse.units.forEach(unit => unit.lessons.sort((a, b) => a.order - b.order))
      setCourse({ ...dataCourse, units: [] })
      setEditUnits(dataCourse.units)
      setValue('description', dataCourse.description ?? '')
      setValue('difficulty', dataCourse.difficulty)
      setValue('language', dataCourse.language)
      setValue('price', dataCourse.price)
      setValue('requeriments', dataCourse.requeriments ?? '')
      setValue('summary', dataCourse.summary ?? '')
      setValue('title', dataCourse.title)
      setCategory(dataCourse.fkCategory?.toString() ?? '')
      setTags(dataCourse.tags?.split(',') ?? [])
      setCurrentImg(dataCourse.cover)
      setVideoUrl(dataCourse.videoPresentation)

      const learningArray: ILearning[] = dataCourse.learnText?.split(',').map(text => {
        const learn: ILearning = { id: learningId, text }
        learningId++
        return learn
      }) ?? []
      setLearningList(learningArray)
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError) {
        if (error.response?.data.message) {
          return toast.error(error.response?.data.message);
        }

        return toast.error('Oops... Ocurrió un error, Intentelo más tarde');
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!hasFetchedData.current) {
      hasFetchedData.current = true
      getData()
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

  return (
    <main className="">
      <div className="bg-black-1 h-16 flex justify-between items-center px-6">
        <Link to={'/instructor/courses'}><RiArrowLeftLine size={28} /></Link>
        <div className="flex gap-3 items-center">
          <Button icon={RiEyeFill} className="px-[10px]"></Button>
          <Button className="px-[10px] lg:px-4 lg:py-2" onClick={handleSaveCourse} loading={isLoadingSave}>
            <div className="flex items-center gap-1" >
              <RiSave3Fill size={20} />
              <span className="hidden lg:inline">
                Guardar
              </span>
            </div>
          </Button>
          <Button className="px-[10px] lg:px-4 lg:py-2"  loading={isLoadingPublish} onClick={handlePublish} disabled={isCourse.active} >
            <div className="flex items-center gap-1">
              <RiUploadCloudFill size={20} />
              <span className="hidden lg:inline">
                Publicar
              </span>
            </div>
          </Button>
        </div>
      </div>
      <div className="px-6 py-5 lg:flex lg:gap-8 lg:items-start lg:px-12 lg:py-8">
        <section className="flex-grow w-full min-w-0">
          <h2 className="bg-black-1 px-4 p-2 rounded-t-md text-lg">Datos del curso</h2>
          <section className="bg-black-2 p-4 rounded-b-md">
            <div className="mb-4">
              <label htmlFor="title" className="block mb-1">Título <span className="text-red-600">*</span></label>
              <TextInput error={!!errors.title} errorMessage="El título es requerido" id="title" max={100}
                {...register('title', { required: true, setValueAs: (value: string) => value.trim() })}
                placeholder="Curso sin título" />
              <span className="text-slate-300 text-sm">Máximo 100 carateres</span>
            </div>
            <div className="mb-4">
              <label htmlFor="summary" className="block mb-1">Resumen</label>
              <Controller
                name='summary'
                defaultValue={null}
                control={control}
                render={({ field }) => (
                  <Textarea id="summary" {...field} value={field.value ?? ''} className="text-tremor-content-emphasis"
                    onChange={field.onChange}
                    placeholder="Habla un poco sobre tu curso" />
                )}
              />
              <span className="text-slate-300 text-sm">Máximo 255 carateres</span>
            </div>
            <div className="md:flex md:gap-2 md:flex-wrap">
              <div className="mb-4 md:flex-grow">
                <label htmlFor="language" className="block mb-1">Idioma</label>
                <Controller
                  name='language'
                  defaultValue={null}
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      placeholder="Escoja el idioma"
                      onValueChange={field.onChange}
                      value={field.value ?? ""}
                    >
                      <SelectItem value="spanish">Español</SelectItem>
                      <SelectItem value="english">Inglés</SelectItem>
                    </Select>
                  )}
                />
              </div>
              <div className="mb-4 md:flex-grow">
                <label htmlFor="difficulty" className="block mb-1">Dificultad</label>
                <Controller
                  name='difficulty'
                  defaultValue={null}
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      placeholder="Escoja la dificultad"
                      onValueChange={field.onChange}
                      value={field.value ?? ""}
                    >
                      <SelectItem value="easy">Fácil</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="hard">Difícil</SelectItem>
                      <SelectItem value="expert">Experto</SelectItem>
                    </Select>
                  )}
                />
              </div>
              <div className="mb-4 md:flex-grow">
                <label htmlFor="price" className="block mb-1">Precio</label>
                <NumberInput id="price" enableStepper={false}
                  {...register('price', { valueAsNumber: true })}
                  placeholder="MXN" min={0} />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="requeriments" className="block mb-1">Requerimientos</label>
              <Controller
                name='requeriments'
                defaultValue={null}
                control={control}
                render={({ field }) => (
                  <Textarea id="requeriments" rows={4} {...field} value={field.value ?? ''}
                    className="text-tremor-content-emphasis"
                    onChange={field.onChange}
                    placeholder="Lo necesario para tu curso" />
                )}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block mb-1">Descripción</label>
              <Controller
                name='description'
                defaultValue={null}
                control={control}
                render={({ field }) => (
                  <Textarea id="description" rows={4} {...field} value={field.value ?? ''}
                    className="text-tremor-content-emphasis"
                    onChange={field.onChange}
                    placeholder="Describe de que trata tu curso" />
                )}
              />
            </div>
            <article>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="">¿Qué aprenderán los estudiantes?</h3>
                <RiAddBoxLine color="#845ec2" className="cursor-pointer" size={28} onClick={handleAddLearn}></RiAddBoxLine>
              </div>
              <div className="grid gap-2 md:grid-cols-2 md:gap-x-4">
                {learningList.map((item, index) => (
                  <div className="flex items-center gap-2" key={item.id}>
                    <TextInput error={item.text.trim() === '' && isDirty} placeholder="" value={item.text} onValueChange={value => handleAddLearnChange(index, value)} />
                    <RiCloseFill size={32} className="cursor-pointer" onClick={() => handleRemoveLearnChange(index)} />
                  </div>
                ))}
              </div>
            </article>
          </section>
          <div className="flex justify-between items-center my-4 flex-wrap gap-y-2">
            <p>
              <span>
                {`${isEditUnits.length} ${isEditUnits.length === 1 ? 'Unidad' : 'Unidades'} | `}
                {`${getNumbersLessons()} ${getNumbersLessons() === 1 ? 'Lección' : 'Lecciones'} | `}
                {`${getTimeByLessons()}`}
              </span>
            </p>
            <Button onClick={handleAddUnit}>
              <div className="flex gap-2">
                <RiAddBoxLine />
                <p className="text-base">
                  Nueva Unidad
                </p>
              </div>
            </Button>
          </div>
          <AccordionList>
            {isEditUnits.map(item => (
              <EditUnit unit={item} dirtyForm={isDirty} key={item.pkUnit} onValueChange={handleUpdateUnit} totalUnits={isEditUnits.length}
                onItemRemove={handleRemoveUnit} onUnitDown={handleDownUnit} onUnitUp={handleUpUnit} />
            ))}
          </AccordionList>
        </section>

        <section className="bg-black-2 p-4 rounded-md mt-8 lg:mt-0 lg:w-80">
          <div className="sm:flex sm:gap-2 lg:block">
            <div className="sm:w-1/2 lg:w-auto">
              <h3 className="mb-1">Video de presentación</h3>
              {
                isVideoUrl
                  ?
                  <div className="relative mb-4">
                    <PresentationVideo url={isVideoUrl} />
                    <span
                      onClick={() => setVideoUrl(null)}
                      className="cursor-pointer bg-slate-900/80 rounded-full p-1 hover:text-slate-400 transition-colors absolute top-1 right-1">
                      <RiCloseLine />
                    </span>
                  </div>
                  :
                  <UploadVideo className="mb-4" onUploadedVideo={(url) => setVideoUrl(url)} />
              }
            </div>
            <div className="sm:w-1/2 lg:w-auto">
              <h3 className="mb-1">Miniatura</h3>
              <div className="border aspect-video rounded-md relative border-secundary-text mb-4 flex items-center justify-center">
                {isLoadingImg
                  ? <RiLoader4Line size={48} className="animate-spin" />
                  : isCurrentImg
                    ? null
                    :
                    <>
                      <div className="size-full cursor-pointer absolute" onClick={() => inputImgRef.current?.click()}></div>
                      <RiImageAddLine size={48} />
                    </>
                }
                {isCurrentImg &&
                  <>
                    <img src={isCurrentImg} className="h-full w-full object-cover rounded-md" />
                    <span
                      onClick={() => setCurrentImg('')}
                      className="cursor-pointer bg-slate-900/80 rounded-full p-1 hover:text-slate-400 transition-colors absolute top-1 right-1">
                      <RiCloseLine />
                    </span>
                  </>
                }
                <input type="file" ref={inputImgRef} className="hidden" accept="image/*" onChange={handleSubmitImage} />
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="mb-1 block">Categoría</label>
            <Select name="category" id="category" value={isCategory} placeholder="Escoja una categoría" onValueChange={value => setCategory(value)} >
              {CategoriesData.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>{category.name}</SelectItem>
              ))}
            </Select>
          </div>
          <label htmlFor="newTag" className="mb-1 block">Etiquetas</label>
          <TagInput name="newTag" id="newTag" value={istags} setTags={(tags) => setTags(tags)} />
        </section>
      </div>
    </main>
  );
}

export default EditCourse;