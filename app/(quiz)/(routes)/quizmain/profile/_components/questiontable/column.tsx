"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "question",
    header: "question",
  },

  {
    accessorKey: "status",
    header: "status",
    cell: ({ row }:any) => {
        return (
            <Badge
            variant={"free"}
            >
                {row}
        </Badge>
        )
    }
  },
];
