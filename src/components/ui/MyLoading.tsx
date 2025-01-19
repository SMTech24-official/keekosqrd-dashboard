import Lottie from "lottie-react";
import loading from "@/lib/loading.json";

const MyLoading = () => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <Lottie className="h-96 pt-5" animationData={loading} loop={true} />
    </div>
  );
};

export default MyLoading;
