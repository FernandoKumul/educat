import { RiCloseCircleLine} from "@remixicon/react";
import { ICartItemCourse } from "../../interfaces/ICartItemCourse";
import { CurrencyFormat } from "../../utils/CurrencyUtils";
import { useState } from "react";
import LoaderCat from "../common/LoaderCat";

type IProps = {
  item: ICartItemCourse,
  onDelete: (itemId: number) => void
}

const CartRow = ({ item, onDelete }: IProps) => {
  const [isLoadingDelete, setLoadingDelete] = useState(false)

  const handleDelete = () => {
    setLoadingDelete(true)
    onDelete(item.pkCartWishList)
  }
  
  return (
    <tr className="border-b border-[#787081]">
      <td className="py-4 px-6">
        <div className="w-32 bg-gradient-to-r from-purple-500 via-violet-600 to-indigo-400 lg:w-40 aspect-video rounded-md">
          {item.course.cover &&
            <img className="w-full h-full rounded-md object-cover" src={item.course.cover} alt={item.course.title} />
          }
        </div>
      </td>
      <td className="py-4">{item.course.title}</td>
      <td className="py-4 text-center font-semibold">{CurrencyFormat(item.course.price ?? 0)} MXN</td>
      <td className="py-4">
        <div className={`flex justify-center ${!isLoadingDelete && 'cursor-pointer'}`}>
          {isLoadingDelete
          ? <LoaderCat/>
          : <RiCloseCircleLine onClick={handleDelete} />
          }
        </div>
      </td>
    </tr>
  );
}

export default CartRow;