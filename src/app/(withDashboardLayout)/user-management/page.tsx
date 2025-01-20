// import TotalDriver from "@/components/Dashboard/pages/allProducts/AllProducts";
import TotalUser from "@/components/Dashboard/pages/totalUser/TotalUser";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking list",
};

export default function Page() {
  return (
    <div className="dashboard-containers relative min-h-screen">
     {/* <TotalDriver/> */}
     <TotalUser/>
    </div>
  );
}
