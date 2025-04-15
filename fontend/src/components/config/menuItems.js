import { Drumstick, Home as HomeIcon, NotepadText, User, Utensils } from "lucide-react";

// Definindo o objeto menuItems com o tipo correto
const menuItems = {
  items: [
    { href: "/", icon: <HomeIcon size={20} />, label: "Home" },
    {
      href: "/record-meal",
      icon: <Utensils size={20} />,
      label: "Record Meal",
    },
    {
      href: "/recorded-meals",
      icon: <NotepadText size={20} />,
      label: "Recorded Meals",
    },
  ],
  moreOptions: [
    {
      href: "/proteins",
      icon: <Drumstick size={20} />,
      label: "Proteins",
    },
    {
      href: "/users",
      icon: <User size={20} />,
      label: "Users",
    },
  ],
};

export default menuItems;