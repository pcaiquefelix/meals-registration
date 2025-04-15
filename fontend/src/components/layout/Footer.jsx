"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import menuItems from "@/components/config/menuItems";
import { usePathname } from "next/navigation";
import CustomPageLoader from "@/components/common/CustomPageLoader";
import { navigationAndLoaderValidator } from "@/components/config/functions/navigationAndLoaderValidator";
import Image from "next/image";

const Footer = ({ allowedPaths }) => {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, [pathname]);

  const handleClick = (e) => {
    const href = e.currentTarget.getAttribute("href");
    const navigation = navigationAndLoaderValidator(
      allowedPaths,
      href,
      pathname
    );

    setIsLoading(navigation);
  };

  return (
    <footer className="bg-gray-800 text-white py-8 px-6">
      <CustomPageLoader loading={isLoading} />
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-around gap-8">
          {/* Company Logo */}
          <div className="flex justify-center items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.jpg"
                alt="Lunch Today Restaurant logo"
                className="h-1/3 w-auto"
                width={600}
                height={600}
              />
            </Link>
          </div>
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
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
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="hover:text-blue-400 text-sm"
                        onClick={handleClick}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                }
              })}
            </ul>
          </div>
          {/* Company Information */}
          <div>
            <h3 className="text-xl font-bold mb-4">Lunch Today Restaurant</h3>

            <div className="flex items-center space-x-2 mb-2">
              <Phone size={18} />
              <span className="text-sm">IT Extension: 5103</span>
            </div>

            <div className="flex items-center space-x-2">
              <Mail size={18} />
              <span className="text-sm">sistemas@usjp.com.br</span>
            </div>
          </div>
        </div>
        <div>
          <div className="mt-6 text-sm text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} Lunch Today Restaurant. All
              rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
