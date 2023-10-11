import ResourceCard from '@/components/Resources/resource-card';
import ResourceHeader from '@/components/Resources/resource-header';
import Filters from '@/components/Resources/filters';
import SearchForm from '@/components/Resources/search-form';
import StickyButton from '@/components/Resources/sticky-button';
import { getProjectResources, getResources } from '@/server-action/action';

import { Categories, ResourceType } from '@prisma/client';
import { Separator } from '@/components/ui/separator';
import ProjectCard from '@/components/Resources/project-card';



interface Props {
  searchParams: { [key: string]: string | undefined };
}

const Page = async ({ searchParams }: Props) => {
  // Map the category name to the Categories enum using a function
  const category = mapCategoryNameToEnum(searchParams?.category || 'All'); // Provide an empty string as a default
  const query = searchParams?.query || "";



  // Fetch resources based on the selected category and query
  const resources = await getResources({
    type: ResourceType.EBOOK, // Specify the resource type
    query,
    category,
    page: 1, // You can set the page and perPage values as needed
    perPage: 10,
  });

  const notes = await getResources({
    type: ResourceType.NOTES, // Specify the resource type
    query,
    category,
    page: 1, // You can set the page and perPage values as needed
    perPage: 10,

  })

  const videos = await getResources({
    type: ResourceType.VIDEO, // Specify the resource type
    query,
    category,
    page: 1, // You can set the page and perPage values as needed
    perPage: 10,
  })

  const projects = await getProjectResources({
    type: ResourceType.PROJECTS, // Specify the resource type
    query,
    category,
    page: 1, // You can set the page and perPage values as needed
    perPage: 10,
  })

  const cheatsheets = await getResources({
    type: ResourceType.CHEATSHEETS, // Specify the resource type
    query,
    category,
    page: 1, // You can set the page and perPage values as needed
    perPage: 10,
  })


  return (
    <>
      <main className='flex-center paddings mx-auto w-full max-w-screen-2xl flex-col '>
        <section className='nav-padding w-full'>
          <div className="flex-center relative min-h-[274px] w-full flex-col rounded-xl bg-[url('/jsm_resources_banner.svg')] bg-cover bg-center text-center">
            <h1 className='sm:heading1 heading2 mb-6 text-center text-white '>CodersYug Resources</h1>
          </div>
          <SearchForm />
        </section>
        <Filters />
        <StickyButton />
        <section className='flex-center mt-6 w-full flex-col sm:mt-20'>
          <ResourceHeader
            query={searchParams?.query || ""}
            category={category}
          />
          <div className='mt-12 flex w-full flex-wrap justify-center gap-16 sm:justify-start'>
            {resources && resources.length > 0 ? (
              resources.map((resource: any) => (
                <ResourceCard
                  key={resource.id}
                  type={resource.type}
                  title={resource.Title}
                  AccessType={resource.accessType}
                  Price={resource.Price}
                  id={resource.id}
                  image={resource.Thumbnail}
                  downloadNumber={resource.Views}
                  slug={resource.Slug}
                  downloadLink={resource.DownloadLink}
                  author={resource.author}
                />
              ))
            ) : (
              null
            )}
          </div>
          <Separator />
          <h1 className="heading3 text-center text-white-800 mt-12">
            Coding Notes
            </h1>
          <div className='mt-12 flex w-full flex-wrap justify-center gap-16 sm:justify-start'>
            {notes && notes.length > 0 ? (
              notes.map((resource: any) => (
                <ResourceCard
                  key={resource.id}
                  type={resource.type}
                  title={resource.Title}
                  AccessType={resource.accessType}
                  Price={resource.Price}
                  id={resource.id}
                  image={resource.Thumbnail}
                  downloadNumber={resource.Views}
                  slug={resource.Slug}
                  downloadLink={resource.DownloadLink}
                  author={resource.author}
                />
              ))
            ) : (
              <p className="body-regular text-white-400">
                No resources found
              </p>
            )}
          </div>
          <h1 className="heading3 text-center text-white-800 mt-12">
            Coding Cheatsheets
            </h1>
          <div className='mt-12 flex w-full flex-wrap justify-center gap-16 sm:justify-start'>
            {cheatsheets && cheatsheets.length > 0 ? (

              cheatsheets.map((resource: any) => (
                <>
               
                  <ResourceCard
                    key={resource.id}
                    type={resource.type}
                    title={resource.Title}
                    AccessType={resource.accessType}
                    Price={resource.Price}
                    id={resource.id}
                    image={resource.Thumbnail}
                    downloadNumber={resource.Views}
                    slug={resource.Slug}
                    downloadLink={resource.DownloadLink}
                    author={resource.author}
                  />
                </>
              ))
            ) : (
              null
            )}
          </div>
          <h1 className="heading3 text-center text-white-800 mt-12">
            Coding Projects
            </h1>
          <div className='
         mt-12 flex w-full flex-wrap justify-center gap-16 sm:justify-start'
            
>
            {projects && projects.length > 0 ? (
              projects.map((resource: any) => (
                <>
                
                  <ProjectCard
                  key={resource.id}
                  id={resource.id}
                    TechStacks={JSON.parse(resource.techStack)}
                    Thumbnail={resource.Thumbnail}
                    Title={resource.Title}
                    accessType={resource.accessType}
                    author={resource.author}
                    downloadNumber={resource.Views}
                    previewLink={resource.PreviewLink}
                    price={resource.Price}
                    slug={resource.Slug}
                    sourceCodeLink={resource.SourceCodeLink}
                    type={resource.type}
                  />
                </>
              ))
            ) : (
              null
            )}
          </div>

        </section>
      </main>
    </>
  );
};

export default Page;

function mapCategoryNameToEnum(categoryName: string): Categories | "All" {
  const categoryEnum = Categories[categoryName as keyof typeof Categories];
  return categoryEnum !== undefined ? categoryEnum : "All"; // Provide a default category name here
}
