import React from 'react';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ShowToastify = ({ success, error }: { success?: string, error?: string }) => {
    console.log(error);

    if (success) {
        toast.success(success, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            // draggable: true,
            // progress: undefined,
            // theme: "colored",
            style : { backgroundColor: "#FCC734", color: "white" },
            transition: Bounce,
        });
    }
    if (error) {
        toast.warning(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            // progress: undefined,
            theme: "colored",
            transition: Bounce,
        });
    }

    return <ToastContainer />
};

export default ShowToastify;