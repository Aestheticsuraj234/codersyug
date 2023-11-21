"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
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

