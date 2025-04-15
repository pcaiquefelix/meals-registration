import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import MainLayout from "@/components/layout/MainLayout";
import Footer from "@/components/layout/Footer";
import { cookies } from "next/headers";

export const metadata = {
  title: "Cafeteria Menu",
  description:
    "System for registering menus for the cafeteria, allowing users to record their meals and view their history.",
};

const permissions = {
  admin: [
    "/",
    "profile/",
    "proteins",
    "record-meal",
    "recorded-meals",
    "update-meal/",
    "users",
  ],
  employee: ["/", "profile/", "record-meal", "recorded-meals", "update-meal"],
};

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  const role = cookieStore.get("role");

  return (
    <html lang="en">
      <body className="vsc-initialized">
        {token?.value && (
          <Navbar allowedPaths={token && permissions[role.value]} />
        )}
        <MainLayout>{children}</MainLayout>
        {token?.value && (
          <Footer allowedPaths={token && permissions[role.value]} />
        )}
      </body>
    </html>
  );
}
