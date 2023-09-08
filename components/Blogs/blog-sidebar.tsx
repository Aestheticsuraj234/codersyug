import { sidebarLinks } from '@/constants'
import Link from 'next/link'
import React from 'react'

interface SidebarLinkProps {
    Icon: React.FC<any>;
    route: string;
    label: string;

}

const SidebarLink = ({ Icon, route, label }: SidebarLinkProps) => {
    return (
        <Link href={route} className='leftsidebar__link  flex-col items-center justify-center space-y-6 hover:bg-zinc-100 px-4 py-2  rounded-md'>
            <div className="flex items-center">
                <Icon size={24} /> {/* Adjust the size as needed */}
                <span className="ml-2">{label}</span>
            </div>
        </Link>
    );
};
// Wanted to build a blog sidebar here
const BlogSideBar = () => {
    return (
        <section className='cursor-scrollbar leftsidebar z-50'>
            <div className='flex w-full flex-1 flex-col gap-6 px-6 '>
                {sidebarLinks.map((link) => (
                    <SidebarLink
                        key={link.label}
                        Icon={link.Icon} // Pass the Lucide icon component
                        route={link.route}
                        label={link.label}
                    />
                ))}
            </div>
        </section>
    )
}

export default BlogSideBar