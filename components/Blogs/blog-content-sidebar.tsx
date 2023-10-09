
import React from 'react'
import {
    MessageCircle,
    Heart,
    BookMarked,
}
from 'lucide-react'


const blogContentSidebar = [
    {
        id: 1,
        Icon: Heart,
        Count: 0,
    },
    {
        id: 2,
        Icon: MessageCircle,
        Count: 0,
    },
    {
        id: 3,
        Icon: BookMarked,
        Count: 0,
    }
]

interface blogContentSidebarProps {
    id: number,
    Icon: React.FC<any>,
    Count?: number,
}

const SidebarLink = ({ id, Icon, Count }: blogContentSidebarProps) => {
    return (
        <div key={id} className='leftsidebar__link  flex-col items-center justify-center space-y-6 hover:bg-zinc-100 px-4 py-2  rounded-md'>
            <div className="flex items-center flex-col justify-center">
                <Icon size={34} /> {/* Adjust the size as needed */}
                <span className="ml-2">{Count}</span>
            </div>
        </div>
    );
};
// Wanted to build a blog sidebar here
const BlogSideBarContent = () => {
    return (
        <section className='cursor-scrollbar leftsidebar_blog z-50'>
            <div className='flex w-full flex-1 flex-col gap-6 px-6 '>
                {blogContentSidebar.map((link) => (
                    <SidebarLink
                        key={link.id}
                        id={link.id}
                        Icon={link.Icon} 
                        Count={link.Count}
                    />
                ))}
            </div>
        </section>
    )
}

export default BlogSideBarContent