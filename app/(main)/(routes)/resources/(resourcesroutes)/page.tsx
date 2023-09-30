import ResourceCard from '@/components/Resources/resource-card';
import ResourceHeader from '@/components/Resources/resource-header';
import Filters from '@/components/Resources/filters';
import SearchForm from '@/components/Resources/search-form';
import StickyButton from '@/components/Resources/sticky-button';
import { getResources } from '@/server-action/action';

import { Categories, ResourceType } from '@prisma/client';



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
                  id={resource.id}
                  image={resource.Thumbnail}
                  downloadNumber={resource.Views}
                  slug={resource.Slug}
                  downloadLink={resource.DownloadLink}
                />
              ))
            ) : (
              <p className="body-regular text-white-400">
                No resources found
              </p>
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
