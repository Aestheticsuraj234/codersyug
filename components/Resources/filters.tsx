"use client";
import { useState } from "react";
import { Categories } from "@prisma/client";
import { ScrollBar, ScrollArea } from "@/components/ui/scroll-area";
import { formUrlQuery } from "@/lib/utils";
import { useSearchParams, useRouter } from "next/navigation";

const AllCategories:any = ["All" ,...Object.values(Categories).map((category) => category)];

function mapCategoryNameToEnum(categoryName: string): Categories | undefined {
  const categoryEnum = Categories[categoryName as keyof typeof Categories];
  return categoryEnum !== undefined ? categoryEnum : undefined;
}

const Filters = () => {
  const [active, setActive] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleFilter = (categoryName: string) => {
    let newUrl = '';
    
    if (active === categoryName) {
      setActive('');

      newUrl = formUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ['category'],
      });
    } else {
      setActive(categoryName);

      // Use the mapped enum value
      const categoryEnum = mapCategoryNameToEnum(categoryName);
      if (categoryEnum !== undefined) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'category',
          value: categoryEnum,
        });
      }
    }
    
    router.push(newUrl, { scroll: false });
  };

  return (
    <ScrollArea className="no-scrollbar">
      <ul className="dark:text-zinc-100 text-zinc-800 body-text no-scrollba  flex max-w-full gap-2  py-12 sm:max-w-2xl">
        {AllCategories.map((categoryName:any) => (
          <button
            key={categoryName}
            onClick={() => handleFilter(categoryName)}
            className={`${active === categoryName ? "bg-gradient-to-r from-gray-700 via-gray-900 to-black dark:from-indigo-300 dark:to-purple-400 text-white font-semibold" : ""} whitespace-nowrap rounded-lg px-8 py-2.5 capitalize `}
          >
            {categoryName}
          </button>
        ))}
        <ScrollBar orientation="horizontal" />
      </ul>
    </ScrollArea>
  );
};

export default Filters;
