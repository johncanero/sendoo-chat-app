'use client';

import { Fragment, useMemo, useState } from 'react'
import { Conversation, User } from '@prisma/client';
import { format } from 'date-fns';
import { Dialog, Transition } from '@headlessui/react'

import useOtherUser from '@/app/hooks/useOtherUser';
import Avatar from '@/app/components/Avatar';
import Modal from '@/app/components/modals/Modal';
import ConfirmModal from './ConfirmModal';


import { IoClose, IoTrash } from 'react-icons/io5'

interface ProfileDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    data: Conversation & {
        users: User[]
    }
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
    isOpen,
    onClose,
    data,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const otherUser = useOtherUser(data);

    // joinedDate
    const joinedDate = useMemo(() => {
        return format(new Date(otherUser.createdAt), 'PP');
    }, [otherUser.createdAt]);

    // title
    const title = useMemo(() => {
        return data.name || otherUser.name;
    }, [data.name, otherUser.name]);


    // statusText
    const statusText = useMemo(() => {
        if (data.isGroup) {
            return `${data.users.length} members`;
        }

        return 'Active';
    }, [data]);


    return (
        <>
            {/* <ConfirmModal
                isOpen={confirmOpen}
                onClose={() => setConfirmOp en(false)}
            /> */}
            
            <Modal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            >
                <div className='bg-white p-5'>
                    <p>Hello Modal!</p>
                </div>
            </Modal>

            <Transition.Root show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={onClose}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-40" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="fixed inset-y-0 right-0 flex max-w-full pl-10 pointer-events-none">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel className="w-screen max-w-md pointer-events-auto">
                                        {/* Dialog Panel + Button */}
                                        <div className="flex flex-col h-full py-6 overflow-y-scroll bg-white shadow-xl">
                                            <div className="px-4 sm:px-6">
                                                <div className="flex items-start justify-end">
                                                    <div className="flex items-center ml-3 h-7">
                                                        <button
                                                            type="button"
                                                            className="text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                            onClick={onClose}
                                                        >
                                                            <span className="sr-only">Close panel</span>
                                                            <IoClose size={24} aria-hidden="true" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Avatar - title - statusText */}
                                            <div className="relative flex-1 px-4 mt-6 sm:px-6">
                                                <div className="flex flex-col items-center">
                                                    <div className="mb-2">
                                                        <Avatar user={otherUser} />
                                                    </div>

                                                    <div>
                                                        {title}
                                                    </div>

                                                    <div className="text-sm text-gray-500">
                                                        {statusText}
                                                    </div>

                                                    {/* Delete */}
                                                    <div className="flex gap-10 my-8">
                                                        <div onClick={() => setIsModalOpen(true)} className="flex flex-col gap-3 items-center cursor-pointer hover:opacity-75">
                                                            <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center">
                                                                <IoTrash size={20} />
                                                            </div>
                                                            <div className="text-sm font-light text-neutral-600">
                                                                Delete
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div className="w-full pb-5 pt-5 sm:px-0 sm:pt-0">
                                                        <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
                                                            {/* Emails */}
                                                            {!data.isGroup && (
                                                                <div>
                                                                    <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                                                                        Emails
                                                                    </dt>
                                                                    <dd className="mt-1 text-sm  text-gray-900 sm:col-span-2">
                                                                        {data.users.map((user) => user.email).join(', ')}
                                                                    </dd>
                                                                </div>
                                                            )}

                                                            {/* Email */}
                                                            {!data.isGroup && (
                                                                <div>
                                                                    <dt className="text-sm font-medium  text-gray-500 sm:w-40 sm:flex-shrink-0">
                                                                        Email
                                                                    </dt>
                                                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                                                        {otherUser.email}
                                                                    </dd>
                                                                </div>
                                                            )}

                                                            {/* Joined */}
                                                            {!data.isGroup && (
                                                                <>
                                                                    <hr />
                                                                    <div>
                                                                        <dt className="text-sm font-medium  text-gray-500 sm:w-40 sm:flex-shrink-0">
                                                                            Joined
                                                                        </dt>
                                                                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                                                            <time dateTime={joinedDate}>
                                                                                {joinedDate}
                                                                            </time>
                                                                        </dd>
                                                                    </div>
                                                                </>
                                                            )}


                                                        </dl>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
}

export default ProfileDrawer;