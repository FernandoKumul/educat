import { RiAddBoxLine, RiArrowLeftLine, RiCloseFill, RiEyeFill, RiSave3Fill, RiUploadCloudFill } from "@remixicon/react";
import { Button, NumberInput, Select, SelectItem, TextInput, Textarea } from "@tremor/react";
import { FormEvent, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

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
  const [istags, setTags] = useState<string[]>([])
  const [isInputTag, setInputTag] = useState<string>('')
  const [isErrorTagRepeat, setErrorTagRepeat] = useState<boolean>(false)
  
  const [learningList, setLearningList] = useState<ILearning[]>([])
  const [isDirty, setDirty] = useState<boolean>(false)

  const handleEditCourse = async () => {
    setDirty(true)
    const isValid = await trigger()
    console.log(isValid)
    console.log(getValues())
    console.log(learningList)
  }

  const handleAddLearn = () => {
    setLearningList([...learningList, {id: learningId, text: ''}])
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

  const handleAddTag = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if(isInputTag.trim() === '') return


    const newTagLowerCase = isInputTag.trim().toLowerCase();
    const tagsLowerCase = istags.map(tag => tag.toLowerCase());
    //Agregar verificación por Mayusculas
    if(tagsLowerCase.includes(newTagLowerCase)) {
      setErrorTagRepeat(true)
      return
    }

    setTags([...istags, isInputTag.trim()])
    setInputTag('')
    setErrorTagRepeat(false)
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
      <div className="px-6 py-5">
        <section>
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

        <section className="bg-black-2 p-4 rounded-md mt-8">
          <form onSubmit={handleAddTag}>
            <label htmlFor="newTag" className="mb-1 block">Etiquetas</label>
            <TextInput errorMessage="No pueden haber etiquetas repetidas" autoComplete="off" error={isErrorTagRepeat} value={isInputTag}
            id="newTag" name="newTag" placeholder="Escribe alguna etiqueta" onValueChange={value => setInputTag(value)} />
            <div className="flex gap-2 flex-wrap mt-3">
              {istags.map((item) => (
                <span className="bg-slate-600 rounded-full px-2 py-1 text-[15px]" key={item}>{item}</span>
              ))}
            </div>
            
          </form>
        </section>
      </div>
      <h1>{courseId}</h1>
    </main>
  );
}

export default EditCourse;