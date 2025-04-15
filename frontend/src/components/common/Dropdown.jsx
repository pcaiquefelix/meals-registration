"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Dropdown = ({
  children,
  icon,
  onOpenIcon,
  wrapperClassName,
  buttonClassName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleDropdownMenuOnBlur = (e) => {
    if (isOpen && !e.currentTarget.contains(e.relatedTarget)) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div
      className={`relative ${wrapperClassName}`}
      onBlur={handleDropdownMenuOnBlur}
    >
      {onOpenIcon ? (
        <button
          onClick={toggleMenu}
          className="text-gray-700 hover:text-gray-900 focus:outline-none"
        >
          {isOpen ? <>{onOpenIcon}</> : <>{icon}</>}
        </button>
      ) : (
        <button
          title="More Options"
          onClick={toggleMenu}
          className={`${buttonClassName} ${isOpen && "text-blue-600"}`}
        >
          {icon}
        </button>
      )}

      {isOpen && (
        <div className="absolute z-10 right-0 mt-1 w-48 bg-white border rounded-md shadow-lg p-2 space-y-1">
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
