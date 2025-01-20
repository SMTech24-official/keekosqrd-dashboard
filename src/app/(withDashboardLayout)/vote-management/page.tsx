// import BookingList from "@/components/Dashboard/pages/bookingList/BookingList";
import VoteManagement from "@/components/Dashboard/pages/voteManagement/VoteManagement";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Total Driver",
};

export default function Page() {
  return (
    <div className="dashboard-containers relative min-h-screen">
     <VoteManagement/>
    </div>
  );
}
