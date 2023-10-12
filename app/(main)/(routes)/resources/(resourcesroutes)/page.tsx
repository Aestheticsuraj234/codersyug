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
  const category = mapCategoryNameToEnum(searchParams?.category || 'All');
  const query = searchParams?.query || "";

  const resourceTypes = [ResourceType.EBOOK, ResourceType.NOTES, ResourceType.VIDEO, ResourceType.CHEATSHEETS];
  const resources = await Promise.all(
    resourceTypes.map((type) => getResources({ type, query, category, page: 1, perPage: 10 }))
  );

  const projects = await getProjectResources({
    type: ResourceType.PROJECTS,
    query,
    category,
    page: 1,
    perPage: 10,
  });

  const resourceCards = (resourceList: any[], isProject = false) => {
    return (
      <div className='mt-12 flex w-full flex-wrap justify-center gap-16 sm:justify-start'>
        {resourceList && resourceList.length > 0
          ? resourceList.map((resource: any) => (
              isProject ? (
                <ProjectCard
                id={resource.id}
                  key={resource.id}
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
              ) : (
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
              )
            ))
          : null}
      </div>
    );
  };

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
    <ResourceHeader query={query} category={category} />
    {resourceCards(resources[0])}
    {resources[1].length > 0 && (
      <>
        <h1 className="heading3 text-center text-white-800 mt-12">Coding Notes</h1>
        {resourceCards(resources[1])}
      </>
    )}
    {resources[3].length > 0 && (
      <>
        <h1 className="heading3 text-center text-white-800 mt-12">Coding Cheatsheets</h1>
        {resourceCards(resources[3])}
      </>
    )}
    {projects.length > 0 && (
      <>
        <h1 className="heading3 text-center text-white-800 mt-12">Coding Projects</h1>
        {resourceCards(projects, true)} {/* Pass true to indicate projects */}
      </>
    )}
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
