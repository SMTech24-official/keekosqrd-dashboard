import LoginComponent from '@/components/Auth/login/login-component';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'LogIn  ',
}


const LoginPage = () => {
    return (
        <>
            <LoginComponent/>
        </>
    );
};

export default LoginPage;