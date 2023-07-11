'use client'

import Image from "next/image"
import { SessionProvider } from 'next-auth/react';

import AuthForm from "./components/AuthForm"

export default function Home() {
    return (
        <div className="flex flex-col justify-center min-h-full py-12 bg-gray-100 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Image
                    height="60"
                    width="60"
                    className="w-auto mx-auto"
                    src="/images/icon.png"
                    alt="Sendoo Chat App Logo"
                />

                <h2 className="mt-6 text-3xl font-bold tracking-tight text-center text-gray-900">Sign in to your account</h2>
            </div>

            {/* AuthForm */}
            <SessionProvider>
                <AuthForm />
            </SessionProvider>
        </div>
    )
}
