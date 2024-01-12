"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type UserColumn = {
  id: string
  name: string
  isAdmin: boolean
  isMerchant: boolean
  isDriver: boolean
  isCustomer: boolean
  createdAt: string
}

export const columns: ColumnDef<UserColumn>[] = [
  {
    accessorKey: "id",
    header: "id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "isAdmin",
    header: "Admin",
  },
  {
    accessorKey: "isMerchant",
    header: "Merchant",
  },
  {
    accessorKey: "isDriver",
    header: "Driver",
  },
  {
    accessorKey: "isCustomer",
    header: "Customer",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  },
]
