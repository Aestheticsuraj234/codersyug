import BlogSideBar from "@/components/Blogs/blog-sidebar";


const BlogLayout = ({ children }: {
    children: React.ReactNode
}) => {

    return (
        <div className='flex flex-row flex-1'>
            <BlogSideBar />

            {children}
        </div>
    )
}

export default BlogLayout;