import { useState } from "react";
import { Accordion, AccordionBody, AccordionHeader, Button, TextInput } from "@tremor/react";
import { IEditUnit } from "../../interfaces/IEditCourse";
import { RiAddBoxLine, RiArrowDownSLine, RiArrowUpSLine, RiDeleteBinLine } from "@remixicon/react";

type IProps = {
  unit: IEditUnit,
  totalUnits: number,
  onValueChange: (unit: IEditUnit) => void;
  onItemRemove: (index: number, order: number) => void
  onUnitUp: (index: number, order: number) => void
  onUnitDown: (index: number, order: number) => void
}

const EditUnit = ({ unit, onValueChange, onItemRemove, onUnitDown, onUnitUp, totalUnits }: IProps) => {
  const [isTitle, setTitle] = useState(unit.title)

  const handleChangeTitle = (inputValue: string) => {
    setTitle(inputValue)
    onValueChange({...unit, title: inputValue})
  }


  return (
    <Accordion>
      <AccordionHeader>
        <p className="text-ellipsis whitespace-nowrap overflow-hidden">
          {unit.order + '. ' + (unit.title ? unit.title : 'Sin título' )}
        </p>
      </AccordionHeader>
      <AccordionBody className="bg-black-2 py-4">
        <section className="flex justify-between">
          <div className="flex lg:w-1/2 gap-2">
            <TextInput placeholder="" value={isTitle} onValueChange={handleChangeTitle} />
            <Button icon={RiAddBoxLine}>Lección</Button>
          </div>
          <div className="flex gap-2">
            <button onClick={() => onUnitUp(unit.pkUnit!, unit.order)} disabled={unit.order === 1}
              className={`border-gray-400 border p-2 rounded-md text-gray-400 
              ${unit.order === 1 ? 'bg-gray-200/30 cursor-not-allowed' : 'hover:bg-primary-400 hover:text-white hover:border-white '}`}>
              <RiArrowUpSLine />
            </button>
            <button onClick={() => onUnitDown(unit.pkUnit!, unit.order)} disabled={unit.order === totalUnits}
               className={`border-gray-400 border p-2 rounded-md text-gray-400 
                ${unit.order === totalUnits ? 'bg-gray-200/30 cursor-not-allowed' : 'hover:bg-primary-400 hover:text-white hover:border-white '}`}>
              <RiArrowDownSLine />
            </button>
            <button onClick={() => onItemRemove(unit.pkUnit!, unit.order)}
              className="border-gray-400 border p-2 rounded-md text-gray-400 hover:bg-primary-400 hover:text-white hover:border-white">
              <RiDeleteBinLine />
            </button>
          </div>
        </section>
        {unit.lessons.map((item) => (
          <p key={item.pkLesson}>{item.title}</p>
        ))}
      </AccordionBody>
    </Accordion>
  );
}

export default EditUnit;