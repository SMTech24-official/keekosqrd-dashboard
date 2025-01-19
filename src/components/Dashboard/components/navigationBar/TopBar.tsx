// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {  TUser } from "@/redux/features/auth/authSlice";
// import { useAppSelector } from "@/redux/hooks";
// import { getTopBarTitle } from "@/utils/getTopBarTitle";
import {  Menu, X } from "lucide-react";
// import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

export default function TopBar({
  isOpen,
  setIsOpen,
}: {
  user: null | TUser;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  //   const { data: user } = useUserDataQuery(undefined);
  // const user = useAppSelector(selectCurrentUser);
  // const pathname = usePathname();
  // const title = getTopBarTitle(pathname);

  return (
    <header className="  bg-white">
      <div className="flex items-center justify-between px-8 py-3 w-full">
        <button className="lg:hidden " onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          <span className="sr-only">Toggle menu</span>
        </button>

        <div>
          <h1 className="text-[25px] font-semibold">Welcome, Rony Bhai</h1>
        </div>

        
      </div>
    </header>
  );
}
