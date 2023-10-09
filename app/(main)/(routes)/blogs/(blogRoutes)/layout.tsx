import BlogSideBar from "@/components/Blogs/blog-sidebar";
import BlogBottomBar from "@/components/Blogs/mobile-blog-bottombar";


const BlogLayout = ({ children }: {
    children: React.ReactNode
}) => {

    return (
        <>
        <div className='flex flex-row flex-1 '>
            <BlogSideBar /> 
            {children}
        </div>
            <div className="md:hidden items-center justify-center flex text-center mx-4 ">
            <BlogBottomBar />
            </div>
            </>
    )
}

export default BlogLayout;