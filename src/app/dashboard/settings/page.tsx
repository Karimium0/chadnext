import { type User } from "lucia";
import { type Metadata } from "next";
import { getUser } from "~/lib/auth";
import SettingsForm from "./settings-form";

export const metadata: Metadata = {
  title: "Settings",
};

export default async function Settings() {
  const user = await getUser();
  return <SettingsForm currentUser={user as User} />;
}
