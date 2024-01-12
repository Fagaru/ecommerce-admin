"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"
import { DisplayDocument } from "./display-document"
import { Prescription } from "@prisma/client"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type OrderColumn = {
  id: string,
  phone: string,
  address: string,
  isPaid: boolean,
  totalPrice: string,
  prescription: string,
  products: string,
  state: string,
  status: string,
  createdAt: string
}

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
  },
  {
    accessorKey: "state",
    header: "State",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    header: "Prescription",
    id: "prescriptions",
    cell: ({ row }) => <DisplayDocument data={row.original} />
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  },
]
