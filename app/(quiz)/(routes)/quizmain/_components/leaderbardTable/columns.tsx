"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "rank",
    header: "Rank",
  },
  {
    accessorKey: "imageUrl",
    header: "Avatar",
    cell: ({ row }: any) => {
      const value = row.original.imageUrl;
      return (
        <div className="flex flex-row items-start justify-start">
          <img
            src={value}
            alt="avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "totalTimeTaken",
    header: "Total-Time Taken",
    cell: ({ row }: any) => {
      const totalTimeTaken = row.original.totalTimeTaken;

      if (typeof totalTimeTaken === "undefined") {
        return <div className="text-xl font-bold">N/A</div>; // or any other default value
      }

      // Convert seconds to minutes if totalTimeTaken is greater than or equal to 60.
      const displayTime =
        totalTimeTaken >= 60
          ? `${Math.floor(totalTimeTaken / 60)}m`
          : `${totalTimeTaken}s`;

      return <div className="text-base font-bold text-green-500">{displayTime}</div>;
    },
  },
  {
    accessorKey: "score",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex flex-row items-center justify-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Score
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }: any) => {
      const value = row.original.score;
      return (
        <div className="flex flex-row items-start justify-start">
          <code className="text-xl font-bold bg-gradient-to-r from-gray-700 via-gray-900 to-black px-4 py-2 text-white rounded-sm">
            ⭐{value}
          </code>
        </div>
      );
    },
  },
];
