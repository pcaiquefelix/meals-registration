"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import menuItems from "@/components/config/menuItems";
import CustomPageLoader from "@/components/common/CustomPageLoader";
import { navigationAndLoaderValidator } from "@/components/config/functions/navigationAndLoaderValidator";
import { User, LogOut, MenuIcon, X } from "lucide-react";
import logoutClient from "@/services/logoutClient";
import Image from "next/image";
import Dropdown from "@/components/common/Dropdown";

const Navbar = ({ allowedPaths }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownButtonClassName =
    "bg-gray-100 hover:text-blue-600 px-3 py-3 rounded-full flex items-center space-x-2";

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsLoading(false);
    navigationAndLoaderValidator(allowedPaths, pathname);
  }, [pathname]);

  const handleClick = async (e) => {
    const href = e.currentTarget.getAttribute("href");
    let conditionalPath;
    if (href === "/profile") {
      e.preventDefault();
      const userId = JSON.parse(localStorage.getItem("user_info")).id;
      conditionalPath = `${href}/${userId}`;
      router.push(conditionalPath);
    }
    const navigation = navigationAndLoaderValidator(
      allowedPaths,
      conditionalPath ? conditionalPath : href,
      pathname
    );
    setIsLoading(navigation);
  };

  const logoutOnClick = async () => {
    await logoutClient();
  };

  const mainMenuRender = () => {
    const itemClassName =
      "text-gray-700 hover:bg-gray-100 hover:text-blue-600 px-3 py-2 rounded-md flex items-center space-x-2";
    const highlightMenuItem =
      "text-blue-600 font-semibold hover:bg-gray-100 px-3 py-2 rounded-md flex items-center space-x-2";

    return (
      <>
        {menuItems.items.map((item) => {
          const isItemAllowed = allowedPaths.reduce((validator, path) => {
            if (path === "/") {
              return item.href === path;
            } else if (!validator && item.href.includes(path)) {
              return true;
            }
            return validator;
          }, false);

          if (isItemAllowed) {
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleClick}
                className={
                  item.href === "/"
                    ? pathname === item.href
                      ? highlightMenuItem
                      : itemClassName
                    : pathname.startsWith(item.href)
                    ? highlightMenuItem
                    : itemClassName
                }
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          }
        })}
      </>
    );
  };

  const profileAndLogoutRender = () => {
    const highlightProfile = pathname.includes("/profile")
      ? "text-blue-600 font-semibold hover:bg-gray-100 px-3 py-2 rounded-md flex items-center space-x-2"
      : "text-gray-700";

    return (
      <>
        <Link
          href="/profile"
          className={`hover:bg-gray-100 hover:text-blue-600 px-3 py-2 rounded-md flex items-center space-x-2 ${highlightProfile}`}
          onClick={handleClick}
        >
          <User size={20} />
          <span className="ml-2">Profile</span>
        </Link>
        <button
          className="w-full text-left text-red-600 hover:bg-red-50 px-3 py-2 rounded-md flex items-center space-x-2"
          onClick={logoutOnClick}
        >
          <LogOut size={20} />
          <span className="ml-2">Logout</span>
        </button>
      </>
    );
  };

  const moreOptionsRender = () => {
    return (
      <>
        {menuItems.moreOptions.map((item, i) => {
          const isItemAllowed = allowedPaths.reduce((validator, path) => {
            if (path === "/") {
              return item.href === path;
            } else if (!validator && item.href.includes(path)) {
              return true;
            }
            return validator;
          }, false);

          if (isItemAllowed) {
            const highlightMenuItem =
              pathname === item.href
                ? "text-blue-600 font-semibold hover:bg-gray-100 px-3 py-2 rounded-md flex items-center space-x-2"
                : "";
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleClick}
                className={
                  highlightMenuItem ||
                  "text-gray-700 hover:bg-gray-100 hover:text-blue-600 px-3 py-2 rounded-md flex items-center space-x-2"
                }
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          }
        })}
      </>
    );
  };

  const renderDropdownOptions = (isMobile = false) => {
    const result = moreOptionsRender();

    return (
      <>
        {isMobile && mainMenuRender()}
        {result.props.children && result.props.children[0] ? (
          <>
            {result}
            <hr className="pb-4 border-gray-200" />
            {profileAndLogoutRender()}
          </>
        ) : (
          <>
            {isMobile && <hr className="pb-4 border-gray-200" />}
            {profileAndLogoutRender()}
          </>
        )}
      </>
    );
  };

  const dropdownMainOptionsRender = () => renderDropdownOptions(false);

  const dropdownMobileOptionsRender = () => renderDropdownOptions(true);

  return (
    <header
      className={`w-full z-50 transition-all duration-300 ease-in-out ${
        isScrolled && "fixed top-0 left-0 bg-white shadow-md"
      }`}
    >
      <CustomPageLoader loading={isLoading} />
      <nav className="grid grid-cols-navbar-mobile items-center navtransition:grid-cols-navbar-max max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" onClick={handleClick}>
          <Image
            src="/logo.jpg"
            alt="Lunch Today Restaurant"
            width={50}
            height={50}
            className="w-14"
          />
        </Link>

        <div className="flex navtransition:justify-center justify-end items-center h-16">
          {/* Desktop Navigation */}
          <div className="hidden navtransition:flex navtransition:w-full justify-evenly space-x-4">
            {mainMenuRender()}
          </div>

          {/* Mobile Menu Button */}
          <Dropdown
            wrapperClassName="navtransition:hidden"
            icon={<MenuIcon size={24} />}
            onOpenIcon={<X size={24} />}
          >
            {dropdownMobileOptionsRender()}
          </Dropdown>
        </div>

        {/* Dropdown Menu */}
        <Dropdown
          wrapperClassName="hidden navtransition:block justify-self-end"
          buttonClassName={dropdownButtonClassName}
          icon={<User size={30} />}
        >
          {dropdownMainOptionsRender()}
        </Dropdown>
      </nav>
    </header>
  );
};

export default Navbar;
