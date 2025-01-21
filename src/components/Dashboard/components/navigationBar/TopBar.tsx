import { Menu, X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { useGetMeUserQuery } from "@/redux/features/profile/profileApi";

export default function TopBar({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { data, isLoading } = useGetMeUserQuery({});
  const user = data?.data?.user;

  return (
    <header className="bg-white shadow">
      <div className="flex items-center justify-between px-8 py-3 w-full">
        {/* Toggle Button */}
        <button className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          <span className="sr-only">Toggle menu</span>
        </button>

        {/* Welcome Message */}
        <div>
          {isLoading ? (
            <h1 className="text-[25px] font-semibold">Loading...</h1>
          ) : (
            <h1 className="text-[25px] font-semibold">
              Welcome, {user?.first_name} {user?.last_name}
            </h1>
          )}
        </div>
      </div>
    </header>
  );
}
