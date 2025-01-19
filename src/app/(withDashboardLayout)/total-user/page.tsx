import TotalUser from "@/components/Dashboard/pages/totalUser/TotalUser";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Total User",
};

const page = () => {
  return (
    <div className="dashboard-containers relative min-h-screen">
      <TotalUser />
    </div>
  );
};

export default page;
