"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: "id",
  },
  {
    accessorKey: "question",
    header: "question",
  },

  {
    accessorKey: "correctAnswer",
    header: "correctAnswer",
    cell: ({ row }: any) => {
      return (
        <div className={"blur-md"}>
          {row.original.correctAnswer}
        </div>
      );
    },
  },
  
  {
    accessorKey: "status",
    header: "status",
    cell: ({ row }: any) => {
      return (
        <Badge variant={"free"}>
          {row.original.status} {/* Access the 'status' property of the original row */}
        </Badge>
      );
    },
  },
];

