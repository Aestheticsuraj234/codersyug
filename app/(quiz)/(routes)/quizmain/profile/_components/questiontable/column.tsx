"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "text",
    header: "text",
  },

  {
    accessorKey: "accesslevel",
    header: "accesslevel",
  },
];
