"use server";

import { redirect } from "next/navigation";

export default async function serverRedirect(path = "/") {
  "use server";

  redirect(path);
}
