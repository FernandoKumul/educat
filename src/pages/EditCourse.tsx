import { FormEvent, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { AxiosError } from "axios";
import { Controller, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { RiAddBoxLine, RiArrowLeftLine, RiCloseFill, RiCloseLine, RiEyeFill, RiImageAddLine, RiLoader4Line, RiSave3Fill, RiUploadCloudFill } from "@remixicon/react";
import { AccordionList, Button, NumberInput, Select, SelectItem, TextInput, Textarea } from "@tremor/react";
import { IEditCourse, IEditUnit } from "../interfaces/IEditCourse";
import CategoriesData from "../data/CategoriesData";
import FileService from "../services/FileService";
import PresentationVideo from "../components/course/PresentationVideo";
import TagInput from "../components/course/TagInput";
import units from "../data/UnitsData";
import EditUnit from "../components/course/EditUnit";
import UploadVideo from "../components/upload/UploadVideo";

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
    control,
    formState: { errors },
    getValues,
    trigger
  } = useForm<ICourseInfoP1>()
  const [isCategory, setCategory] = useState("")

  const [istags, setTags] = useState<string[]>([])

  const [learningList, setLearningList] = useState<ILearning[]>([])
  const [isDirty, setDirty] = useState<boolean>(false)

  const inputImgRef = useRef<HTMLInputElement>(null)
  const [isLoadingImg, setLoadingImg] = useState<boolean>(false)
  const [isCurrentImg, setCurrentImg] = useState<string | null>(null)

  const [isVideoUrl, setVideoUrl] = useState<string | null>(null)

  const [isEditUnits, setEditUnits] = useState<IEditUnit[]>(units)
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
			if(item.order > order) item.order--
			return item
		})
		setEditUnits(newUnits)
  }

  const handleEditCourse = async () => {
    setDirty(true) //Para la sección de aprenderas
    const isValid = await trigger()
    const data = getValues() as IEditCourse

    //Buscar en el array su id
    let categoryId = null
    if (isCategory !== '') {
      categoryId = CategoriesData.find(value => value.name === isCategory)?.id
    }

    console.log('Editando...', isValid)
    data.fkCategory = categoryId ?? null
    data.price = isNaN(data.price!) ? null : data.price
    data.videoPresentation = isVideoUrl
    console.log(data)
    console.log(isEditUnits)
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
        <section className="flex-grow w-full min-w-0">
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
          <div className="flex justify-between items-center my-4">
            <p>
							<span>
								{`${isEditUnits.length} ${isEditUnits.length === 1 ? 'Unidad' : 'Unidades'}`}
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
              <EditUnit unit={item} key={item.pkUnit} onValueChange={handleUpdateUnit} totalUnits={isEditUnits.length}
							onItemRemove={handleRemoveUnit} onUnitDown={handleDownUnit} onUnitUp={handleUpUnit} />
            ))}
          </AccordionList>
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
              <UploadVideo className="mb-4" onUploadedVideo={(url) => setVideoUrl(url)} />
          }


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
          <div className="mb-4">
            <label htmlFor="category" className="mb-1 block">Categoría</label>
            <Select name="category" id="category" value={isCategory} placeholder="Escoja una categoría" onValueChange={value => setCategory(value)} >
              {CategoriesData.map((category) => (
                <SelectItem key={category.id} value={category.name}>{category.name}</SelectItem>
              ))}
            </Select>
          </div>
          <label htmlFor="newTag" className="mb-1 block">Etiquetas</label>
          <TagInput name="newTag" id="newTag" value={istags} setTags={(tags) => setTags(tags)} />
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