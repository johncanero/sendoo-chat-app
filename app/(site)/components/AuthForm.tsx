'use client'
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { BsGithub, BsGoogle } from 'react-icons/bs';

import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import AuthSocialButton from "./AuthSocialButton";

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
    // useState
    const [variant, setVariant] = useState<Variant>('LOGIN');
    const [isLoading, setIsLoading] = useState(false);

    // useCallback
    const toggleVariant = useCallback(() => {
        if (variant === 'LOGIN') {
            setVariant('REGISTER');
        } else {
            setVariant('LOGIN');
        }
    }, [variant]);


    // useForm
    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

    // onSubmit
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        if (variant === 'REGISTER') {
            // Axios Register
        }

        if (variant === 'LOGIN') {
            // NextAuth SignIn
        }
    }

    // socialAction
    const socialAction = (action: string) => {
        setIsLoading(true);

        // NextAuth Social SignIn
    }



    return (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
                {/* Form */}
                <form
                    className="space-y-6"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {variant === 'REGISTER' && (
                        <Input
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                            required
                            id="name"
                            label="Name"
                        />
                    )}
                    <Input
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                        id="email"
                        label="Email address"
                        type="email"
                    />
                    <Input
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                        id="password"
                        label="Password"
                        type="password"
                    />
                    <div>
                        <Button
                            disabled={isLoading}
                            fullWidth
                            type="submit"
                        >
                            {variant === 'LOGIN' ? 'Sign in' : 'Register'}
                        </Button>
                    </div>
                </form>
                    
                {/* Continue with (Buttons) */}
                <div className="mt-6">
                    <div className="relative">
                        
                        <div className="absolute inset-0 flex items-center ">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 text-gray-500 bg-white">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-2 mt-6">
                        <AuthSocialButton
                            icon={BsGithub}
                            onClick={() => socialAction('github')}
                        />
                        <AuthSocialButton
                            icon={BsGoogle}
                            onClick={() => socialAction('google')}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthForm;