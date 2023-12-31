"use client"

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Conversation, Message, User } from "@prisma/client";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import clsx from "clsx";

import { FullConversationType } from "@/app/types";
import useOtherUser from "@/app/hooks/useOtherUser";
import Avatar from "@/app/components/Avatar";
import AvatarGroup from "@/app/components/AvatarGroup";

interface ConversationBoxProps {
    data: FullConversationType,
    selected?: boolean;
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
    data,
    selected
}) => {
    const otherUser = useOtherUser(data);
    const session = useSession();
    const router = useRouter();

    // handleCLick
    const handleClick = useCallback(() => {
        router.push(`/conversations/${data.id}`);
    }, [data, router]);

    // lastMessage
    const lastMessage = useMemo(() => {
        const messages = data.messages || [];

        return messages[messages.length - 1];
    }, [data.messages]);

    // userEmail
    const userEmail = useMemo(() => session.data?.user?.email,
        [session.data?.user?.email]);

    // hasSeen
    const hasSeen = useMemo(() => {
        if (!lastMessage) {
            return false;
        }

        const seenArray = lastMessage.seen || [];

        if (!userEmail) {
            return false;
        }

        return seenArray
            .filter((user) => user.email === userEmail).length !== 0;
    }, [userEmail, lastMessage]);

    // lastMessageText
    const lastMessageText = useMemo(() => {
        if (lastMessage?.image) {
            return 'Sent an image';
        }

        if (lastMessage?.body) {
            return lastMessage?.body
        }

        return 'Started a conversation';
    }, [lastMessage]);


    return (
        <div onClick={handleClick}
            className={clsx(`w-full relative flex items-center space-x-3  p-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer`,
                selected ? 'bg-neutral-100' : 'bg-white')}>
                    
            {data.isGroup ? (
                <AvatarGroup users={data.users} />
            ) : (
                <Avatar user={otherUser} />
            )}

            <div className="flex-1 min-w-0">
                <div className="focus:outline-none">

                    <div className="flex items-center justify-between mb-1">
                        {/* data.name */}
                        <p className="font-medium text-gray-900 text-md">
                            {data.name || otherUser.name}
                        </p>

                        {/* lastMessage */}
                        {lastMessage?.createdAt && (
                            <p className="text-xs font-light text-gray-400">
                                {format(new Date(lastMessage.createdAt), 'p')}
                            </p>
                        )}
                    </div>
                            
                        {/* lastMessageText */}
                    <p
                        className={clsx(`truncate text-sm`,
                            hasSeen ? 'text-gray-500' : 'text-black font-medium'
                        )}>
                        {lastMessageText}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ConversationBox; 