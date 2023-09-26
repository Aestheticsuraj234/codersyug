import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { X, MoreVertical } from 'lucide-react';
import Link from 'next/link';

interface VisitedCardProps {
    imageUrl: string;
    title: string;
    avatarImageUrl: string;
    authorName: string;
    readTime: string;
    slug: string;
}

const VisitedCard: React.FC<VisitedCardProps> = ({
    imageUrl,
    title,
    avatarImageUrl,
    authorName,
    readTime,
    slug
}) => {
    return (
        <Link href={`/blogs/${slug}`} className="w-full flex flex-row flex-1 justify-between items-center px-4 py-2 cursor-pointer">

            <div className="flex flex-row justify-center items-center gap-4">
                <div className="relative rounded-lg">
                    <img
                        src={imageUrl}
                        alt={`Thumbnail for ${title}`}
                        className=" hidden md:flex md:object-cover w-24 h-16 rounded-md"
                        loading="lazy"
                    />
                </div>
                <Avatar className="hidden  md:flex md:absolute top-6 left-2">
                    <AvatarImage src={avatarImageUrl} />
                    <AvatarFallback>{authorName.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <span className="text-sm font-semibold">{title}</span>
                    <span className="text-xs text-gray-400">{readTime}m Read-time</span>
                </div>
            </div>
            <div className="flex flex-row justify-center items-center gap-1">
                <Button variant="ghost" size="icon" shape="pill" className="hover:bg-zinc-200">
                    <X size={16} className="text-zinc-700" />
                </Button>
                <Button variant="ghost" size="icon" shape="pill" className="hover:bg-zinc-200">
                    <MoreVertical size={16} className="text-zinc-700" />
                </Button>
            </div>

        </Link>
    );
};

export default VisitedCard;
