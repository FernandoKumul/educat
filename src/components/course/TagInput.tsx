import { FormEvent, useEffect, useState } from "react";
import { RiCloseCircleFill } from "@remixicon/react";
import { TextInput } from "@tremor/react";

type IProps = {
  value?: string[]
  name?: string
  id?: string
  setTags: (tags: string[]) => void;
}

const TagInput = ({value = [], setTags, name, id}: IProps) => {
  const [isInputTag, setInputTag] = useState<string>('')
  const [isErrorTagRepeat, setErrorTagRepeat] = useState<boolean>(false)


  const handleAddTag = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isInputTag.trim() === '') return


    const newTagLowerCase = isInputTag.trim().toLowerCase();
    const tagsLowerCase = value.map(tag => tag.toLowerCase());

    if (tagsLowerCase.includes(newTagLowerCase)) {
      setErrorTagRepeat(true)
      return
    }

    setTags([...value, isInputTag.trim()])
    setInputTag('')
    setErrorTagRepeat(false)
  }

  const handleRemoveTag = (index: number) => {
    const tags = [...value]
    tags.splice(index, 1)
    setTags(tags)
  }

  useEffect(() => {
    if (!isErrorTagRepeat) return

    const newTagLowerCase = isInputTag.trim().toLowerCase();
    const tagsLowerCase = value.map(tag => tag.toLowerCase());

    if (tagsLowerCase.includes(newTagLowerCase)) {
      return
    }

    setErrorTagRepeat(false)
  }, [isErrorTagRepeat, isInputTag, value])

  return (
    <form onSubmit={handleAddTag}>
      <TextInput errorMessage="No pueden haber etiquetas repetidas" autoComplete="off" error={isErrorTagRepeat} value={isInputTag}
        id={id} name={name} placeholder="Escribe alguna etiqueta" onValueChange={valueChange => setInputTag(valueChange)} />
      <div className="flex gap-2 flex-wrap mt-3">
        {value.map((item, index) => (
          <span className="bg-slate-600 rounded-full px-3 py-1 text-[15px] flex gap-1" key={item}>
            {item}
            <RiCloseCircleFill className="cursor-pointer hover:text-slate-400 transition-colors" onClick={() => handleRemoveTag(index)} />
          </span>
        ))}
      </div>
    </form>
  );
}

export default TagInput;