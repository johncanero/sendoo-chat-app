'use client';

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { CldUploadButton } from "next-cloudinary";
import axios from "axios";


import useConversation from "@/app/hooks/useConversation";
import MessageInput from "./MessageInput";

import {
    HiPaperAirplane,
    HiPhoto
} from "react-icons/hi2";

const Form = () => {
    const { conversationId } = useConversation();

    const {
        register,
        handleSubmit,
        setValue,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            message: ''
        }
    });

    // onSubmit
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setValue('message', '', { shouldValidate: true });
        axios.post('/api/messages', {
            ...data,
            conversationId: conversationId
        })
    }

    // handleUpload
    const handleUpload = (result: any) => {
        axios.post('/api/messages', {
            image: result.info.secure_url,
            conversationId: conversationId
        })
    }

    return (
        <div className="flex items-center w-full gap-2 px-4 py-4 bg-white border-t lg:gap-4">

            <CldUploadButton
                options={{ maxFiles: 1 }}
                onUpload={handleUpload}
                uploadPreset="xqvgloiu"
            >
                <HiPhoto size={30} className="text-amber-500" />
            </CldUploadButton>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex items-center w-full gap-2 lg:gap-4"
            >
                {/* MessageInput */}
                <MessageInput
                    id="message"
                    register={register}
                    errors={errors}
                    required
                    placeholder="Write a message"
                />

                {/* SubmitButton */}
                <button
                    type="submit"
                    className="p-2 transition rounded-full cursor-pointer bg-amber-500 hover:bg-amber-600">
                    <HiPaperAirplane size={18} className="text-white"
                    />
                </button>

            </form>
        </div>
    );
}

export default Form;
