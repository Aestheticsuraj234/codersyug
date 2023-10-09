import React from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
interface CurrentLoggedInUserInterFace {
    imageUrl: string,
    name: string,
}

const CurrentUserComment = ({
    imageUrl,
    name,

}: CurrentLoggedInUserInterFace) => {

    return (
        <>
            <Avatar>
                <AvatarImage
                    src={imageUrl}
                />
                <AvatarFallback>
                    {name.charAt(0) as string}
                </AvatarFallback>
            </Avatar>
            <p className="text-zinc-700 dark:text-zinc-100 font-bold text-base">
                {name}
            </p>
        </>
    )
}

export default CurrentUserComment