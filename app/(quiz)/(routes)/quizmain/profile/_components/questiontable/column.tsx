"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "question",
    header: "question",
  },

  {
    accessorKey: "accesslevel",
    header: "accesslevel",
  },
];
