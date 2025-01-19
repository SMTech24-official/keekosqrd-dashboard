import VehiclesTrackList from "@/components/Dashboard/pages/vehicleTrackList/VehiclesTrackList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vehicles Track list",
};

export default function Page() {
  return (
    <div className="dashboard-containers relative min-h-screen">
      <VehiclesTrackList />
    </div>
  );
}
