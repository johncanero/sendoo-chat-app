'use client';

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
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

    return (
        <div className="py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
            <HiPhoto size={30} className="text-amber-500" />

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex items-center gap-2 lg:gap-4 w-full"
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
                    className="rounded-full p-2 bg-amber-500 cursor-pointer hover:bg-amber-600 transition">
                    <HiPaperAirplane size={18} className="text-white"
                    />
                </button>

            </form>
        </div>
    );
}

export default Form;
