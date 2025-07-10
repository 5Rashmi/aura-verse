import ProfileSummary from "@/components/profile/ProfileSummary";
import { SideBarType } from "@/types/Sidebar";
import DeleteAccount from "./delete/page";

export const sideBarItems: SideBarType[] = [
  { name: "Summary", value: <ProfileSummary /> },
  { name: "Delete Account", value: <DeleteAccount /> },
];
