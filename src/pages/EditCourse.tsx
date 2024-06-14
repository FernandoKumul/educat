import { RiAddBoxLine, RiArrowLeftLine, RiCloseCircleFill, RiCloseFill, RiCloseLine, RiEyeFill, RiImageAddLine, RiLoader4Line, RiSave3Fill, RiUploadCloudFill, RiVideoAddFill } from "@remixicon/react";
import { Button, NumberInput, Select, SelectItem, TextInput, Textarea } from "@tremor/react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import CategoriesData from "../data/CategoriesData";
import { CourseEditOutDTO } from "../interfaces/ICourse";
import { AxiosError } from "axios";
import FileService from "../services/FileService";
import { ToastContainer, toast } from "react-toastify";
import PresentationVideo from "../components/course/PresentationVideo";

interface ICourseInfoP1 {
  title: string;
  summary: string | null;
  language: string | null;
  difficulty: string | null;
  price: number | null;
  requeriments: string | null;
  description: string | null;
  fkCategory: number | null;
}

interface ILearning {
  id: number
  text: string
}

let learningId = 1

const EditCourse = () => {
  const { courseId } = useParams()
  const {
    register,
    control,
    formState: { errors },
    getValues,
    trigger
  } = useForm<ICourseInfoP1>()
  const [isCategory, setCategory] = useState("")

  const [istags, setTags] = useState<string[]>([])
  const [isInputTag, setInputTag] = useState<string>('')
  const [isErrorTagRepeat, setErrorTagRepeat] = useState<boolean>(false)

  const [learningList, setLearningList] = useState<ILearning[]>([])
  const [isDirty, setDirty] = useState<boolean>(false)

  const inputImgRef = useRef<HTMLInputElement>(null)
  const [isLoadingImg, setLoadingImg] = useState<boolean>(false)
  const [isCurrentImg, setCurrentImg] = useState<string | null>(null)

  const inputVideoRef = useRef<HTMLInputElement>(null)
  const [isLoadingVideo, setLoadingVideo] = useState<boolean>(false)
  const [isVideoUrl, setVideoUrl] = useState<string | null>(null)


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

  //Tags
  const handleAddTag = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isInputTag.trim() === '') return


    const newTagLowerCase = isInputTag.trim().toLowerCase();
    const tagsLowerCase = istags.map(tag => tag.toLowerCase());

    if (tagsLowerCase.includes(newTagLowerCase)) {
      setErrorTagRepeat(true)
      return
    }

    setTags([...istags, isInputTag.trim()])
    setInputTag('')
    setErrorTagRepeat(false)
  }

  const handleRemoveTag = (index: number) => {
    const tags = [...istags]
    tags.splice(index, 1)
    setTags(tags)
  }

  useEffect(() => {
    if (!isErrorTagRepeat) return

    const newTagLowerCase = isInputTag.trim().toLowerCase();
    const tagsLowerCase = istags.map(tag => tag.toLowerCase());

    if (tagsLowerCase.includes(newTagLowerCase)) {
      return
    }

    setErrorTagRepeat(false)
  }, [isErrorTagRepeat, isInputTag, istags])

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
      if (error instanceof AxiosError) {
        toast.error('La imagen no se logró subir');
      }
    } finally {
      setLoadingImg(false)
    }
  };

  //Video
  const handleSubmitVideo = async (e: FormEvent<HTMLInputElement>) => {
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
      formData.append('video', file);

      setLoadingVideo(true)
      const newUrlVideo = (await FileService.submitVideo(formData)).url
      setVideoUrl(newUrlVideo)
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error('El video no se logró subir: ' + error.response?.data.message);
      }
    } finally {
      setLoadingVideo(false)
    }
  };

  const handleEditCourse = async () => {
    setDirty(true) //Para la sección de aprenderas
    const isValid = await trigger()
    const data = getValues() as CourseEditOutDTO

    //Buscar en el array su id
    let categoryId = null
    if (isCategory !== '') {
      categoryId = CategoriesData.find(value => value.name === isCategory)?.id
    }

    console.log('Editando...', isValid)
    data.fkCategory = categoryId ?? null
    data.price = isNaN(data.price!) ? null : data.price
    console.log(data)
  }

  return (
    <main className="">
      <div className="bg-black-1 h-16 flex justify-between items-center px-6">
        <RiArrowLeftLine size={28} />
        <div className="flex gap-3 items-center">
          <Button icon={RiEyeFill} className="px-[10px]"></Button>
          <Button className="px-[10px] lg:px-4 lg:py-2" onClick={handleEditCourse}>
            <div className="flex items-center gap-1">
              <RiSave3Fill size={20} />
              <span className="hidden lg:inline">
                Guardar
              </span>
            </div>
          </Button>
          <Button className="px-[10px] lg:px-4 lg:py-2">
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
        <section className="flex-grow">
          <h2 className="bg-black-1 px-4 p-2 rounded-t-md text-lg">Datos del curso</h2>
          <section className="bg-black-2 p-4 rounded-b-md">
            <div className="mb-4">
              <label htmlFor="title" className="block mb-1">Título <span className="text-red-600">*</span></label>
              <TextInput error={!!errors.title} errorMessage="El título es requerido" id="title"
                {...register('title', { required: true, setValueAs: (value: string) => value.trim() })}
                placeholder="Curso sin título" />
            </div>
            <div className="mb-4">
              <label htmlFor="summary" className="block mb-1">Resumen</label>
              <Textarea id="summary"
                {...register('summary', { setValueAs: (value: string) => value.trim() })}
                placeholder="Habla un poco sobre tu curso" />
            </div>
            <div className="md:flex md:gap-2">
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
              <Textarea id="requeriments" rows={4}
                {...register('requeriments', { setValueAs: (value: string) => value.trim() })}
                placeholder="Lo necesario para tu curso" />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block mb-1">Descripción</label>
              <Textarea id="description" rows={4}
                {...register('description', { setValueAs: (value: string) => value.trim() })}
                placeholder="Describe de que trata tu curso" />
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
        </section>

        <section className="bg-black-2 p-4 rounded-md mt-8 lg:mt-0 lg:w-80">
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
              <div className="mb-4">
                <div className="border aspect-video rounded-md mb-1 relative border-secundary-text flex items-center justify-center">
                  {isLoadingVideo
                    ? <RiLoader4Line size={48} className="animate-spin" />
                    : isVideoUrl ? null : <RiVideoAddFill size={48} onClick={() => inputVideoRef.current?.click()} />
                  }
                  <input type="file" ref={inputVideoRef} className="hidden" accept="video/*" onChange={handleSubmitVideo} />
                </div>
                <p className="text-secundary-text text-sm">Puedes subir hasta 100MB en cualquier formato de video. Suele tomar algunos minutos.</p>
              </div>
          }


          <h3 className="mb-1">Miniatura</h3>
          <div className="border aspect-video rounded-md relative border-secundary-text mb-4 flex items-center justify-center">
            {isLoadingImg
              ? <RiLoader4Line size={48} className="animate-spin" />
              : isCurrentImg ? null : <RiImageAddLine size={48} onClick={() => inputImgRef.current?.click()} />
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
          <div className="mb-4">
            <label htmlFor="category" className="mb-1 block">Categoría</label>
            <Select name="category" id="category" value={isCategory} onValueChange={value => setCategory(value)} >
              {CategoriesData.map((category) => (
                <SelectItem key={category.id} value={category.name}>{category.name}</SelectItem>
              ))}
            </Select>
          </div>
          <form onSubmit={handleAddTag}>
            <label htmlFor="newTag" className="mb-1 block">Etiquetas</label>
            <TextInput errorMessage="No pueden haber etiquetas repetidas" autoComplete="off" error={isErrorTagRepeat} value={isInputTag}
              id="newTag" name="newTag" placeholder="Escribe alguna etiqueta" onValueChange={value => setInputTag(value)} />
            <div className="flex gap-2 flex-wrap mt-3">
              {istags.map((item, index) => (
                <span className="bg-slate-600 rounded-full px-3 py-1 text-[15px] flex gap-1" key={item}>
                  {item}
                  <RiCloseCircleFill className="cursor-pointer hover:text-slate-400 transition-colors" onClick={() => handleRemoveTag(index)} />
                </span>
              ))}
            </div>
          </form>
        </section>
      </div>
      <h1>{courseId}</h1>
      <ToastContainer
        className="text-sm"
        position="top-right"
        theme="dark"
      />
    </main>
  );
}

export default EditCourse;