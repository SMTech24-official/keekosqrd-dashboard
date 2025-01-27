/* eslint-disable @typescript-eslint/no-explicit-any */

import { setUser } from "@/redux/features/auth/authSlice";
import { toast } from "sonner";
import { verifyToken } from "./verifyToken";
import Cookies from "js-cookie";
// import Cookies from "js-cookie";

// Now handleAsyncWithToast accepts dispatch as an argument
export const handleAsyncWithToast = async (
  asyncCallback: () => Promise<any>,
  loadingMessage: string,
  successMessage?: string,
  errorMessage?: string,
  isSetUserToRedux: boolean = false, // New parameter to determine if the user should be set
  dispatch?: any, // Accept the dispatch function as a parameter
  redirectTo?: string, // URL to redirect after success
  router?: any // Accept the router instance as a parameter
) => {
  const toastInit = toast.loading(loadingMessage);

  try {
    const res = await asyncCallback();

    if (res?.data?.status) {
      toast.success(res.data.message || successMessage, {
        id: toastInit,
      });

      // If isSetUserToRedux is true, dispatch the setUser action
      if (isSetUserToRedux && dispatch && res?.data?.data?.token) {
        const user = await verifyToken(res?.data?.data?.token);
        await dispatch(setUser({ user: user, token: res?.data?.data?.token }));
        // dispatch(setUser({ user: res.data.user, token: res.data.accessToken }));
      }
        console.log("res login", res);
    const token = res?.data?.data?.token;
    Cookies.set("token", token);
    console.log("token in login", token);

      // Redirect if redirectTo is provided
      if (redirectTo && router) {
        router.push(redirectTo);
      }
    }

    if (res?.message) {
      toast.success(res.message, {
        id: toastInit,
      });
    }

    if (!res?.data?.status) {
      toast.error(res?.error?.data?.errorSources?.[0]?.message, {
        id: toastInit,
      });
    }

    return res; // Return response if needed
  } catch (error) {
    toast.error(
      (error as any)?.errorSources?.[0]?.message ||
        errorMessage ||
        "Something went wrong",
      {
        id: toastInit,
      }
    );
    throw error; // Rethrow error if further handling is needed
  } finally {
    // Delay for 2 seconds before dismissing the toast
    setTimeout(() => {
      toast.dismiss(toastInit);
    }, 3500);
  }
};
