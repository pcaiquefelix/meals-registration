import Link from "next/link";
import { MoreVertical, Copy, Trash, Pencil } from "lucide-react";
import Dropdown from "@/components/common/Dropdown";
import PrintCurrentMealButton from "@/components/meals/print/PrintCurrentMealButton";

const MealOptions = ({ meal, setIsChangingPath, onDelete }) => {
  return (
    <>
      <Dropdown
        buttonClassName="align-middle"
        icon={<MoreVertical className="cursor-pointer hover:text-blue-600" />}
      >
        <Link
          href={`/update-meal/${meal.id}`}
          onClick={() => setIsChangingPath(true)}
          className="flex items-center px-4 py-2 hover:bg-gray-100"
        >
          <Pencil size={16} className="mr-2" />
          Edit
        </Link>
        <Link
          href={`/record-meal/${meal.id}`}
          onClick={() => setIsChangingPath(true)}
          className="flex items-center px-4 py-2 hover:bg-gray-100"
        >
          <Copy size={16} className="mr-2" />
          Copy
        </Link>
        <button
          onClick={() => onDelete(meal)}
          className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
        >
          <Trash size={16} className="mr-2" />
          Delete
        </button>
        <PrintCurrentMealButton meal={meal} />
      </Dropdown>
    </>
  );
};

export default MealOptions;
