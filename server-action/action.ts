"use server"
import { Prisma, Categories as PrismaCategories, ResourceType } from '@prisma/client';
import { db } from '@/lib/db';

interface BuildPrismaQueryParams {
  type: ResourceType;
  query: string;
  category: PrismaCategories | 'All'; // Use the Prisma enum type
  page: number;
  perPage: number;
}

export async function getResources(params: BuildPrismaQueryParams) {
  const { type, query, category, page, perPage } = params;
  const offset = (page - 1) * perPage;

  // Define the where object with Prisma's type
  const where: Prisma.ResourcesWhereInput = {
    type,
  };

  // Create an array to hold filter conditions
  const conditions: Prisma.ResourcesWhereInput[] = [];

  if (query) {
    conditions.push({
      Title: {
        contains: query,
      },
    });
  }

  if (category && category !== 'All') {
    conditions.push({
      category: category as PrismaCategories, // Use the Prisma enum value directly
      //   mode: 'insensitive',
    });
  }

  // Combine filter conditions with the 'AND' operator
  if (conditions.length > 0) {
    where.AND = conditions;
  }

  const resources = await db.resources.findMany({
    where,
    select: {
      id: true,
      Title: true,
      Description: true,
      Slug: true,
      DownloadLink: true,
      Views: true,
      category: true,
      Thumbnail: true,
      type: true,
      author:true
    },
    skip: offset,
    take: perPage,
    
  });

  return resources;
}


export async function incrementViewOnDownload(slug: any) {
  await db.resources.update({
    where: {
      Slug: slug,
    },
    data: {
      Views: {
        increment: 1,
      },
    },
  });
}

export const deleteResource = async (id: number) => {
  const resource = await db.resources.delete({
    where: { id },
  });
  return resource;
}

export const getResourcesBySlug = async (slug: string) => {
  const resource = await db.resources.findUnique({
    where: { Slug: slug },
    select: {
      id: true,
      Title: true,
      Description: true,
      Slug: true,
      DownloadLink: true,
      Views: true,
      category: true,
      Thumbnail: true,
      type: true,
    },
  });
  return resource;
}