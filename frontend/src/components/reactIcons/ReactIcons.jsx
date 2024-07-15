import { FaTrashAlt } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

const ReactIcons = () => {
    const trashIcon = <FaTrashAlt />
    const editIcon = <MdEditSquare />
    const closeIcon = <IoMdClose />
  return{trashIcon, editIcon, closeIcon}
}

export default ReactIcons
