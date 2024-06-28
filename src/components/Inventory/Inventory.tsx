"use client"

import * as React from "react"
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Items } from "../InventoryManager/InventoryManager"
import { useInventoryManager } from "../InventoryManager/InventoryManagerProvider"
import EditDialog from "../CLI/Dialogs/EditDialog"
  
const Inventory = () => {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  // Inventory Manager
  const { items, removeItem } = useInventoryManager();
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);
  const [editDialogItem, setEditDialogItem] = React.useState<Items | null>(null);

  const columns: ColumnDef<Items>[] = [
	{
	  accessorKey: "id",
	  header: "ID",
	  cell: ({ row }) => (
		<div className="capitalize">{row.getValue("id")}</div>
	  ),
	},
	{
	  accessorKey: "name",
	  header: ({ column }) => {
		return (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Name
			<CaretSortIcon className="ml-2 h-4 w-4" />
		  </Button>
		)
	  },
	  cell: ({ row }) => <div>{row.getValue("name")}</div>,
	},
	{
	  accessorKey: "qty",
	  header: () => <div className="text-right">Quantity</div>,
	  cell: ({ row }) => {
		return <div className="text-right font-medium">{row.getValue("qty")}</div>
	  },
	},
	{
	  accessorKey: "price",
	  header: () => <div className="text-right">Price</div>,
	  cell: ({ row }) => {
		const price = parseFloat(row.getValue("price"))
  
		// Format the price as a dollar amount
		const formatted = new Intl.NumberFormat("en-US", {
		  style: "currency",
		  currency: "USD",
		}).format(price)
  
		return <div className="text-right font-medium">{formatted}</div>
	  },
	},
	{
	  id: "actions",
	  enableHiding: false,
	  cell: ({ row }) => {
		const item = row.original
  
		return (
		  <DropdownMenu>
			<DropdownMenuTrigger asChild>
			  <Button variant="ghost" className="h-8 w-8 p-0">
				<span className="sr-only">Open menu</span>
				<DotsHorizontalIcon className="h-4 w-4" />
			  </Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
			  <DropdownMenuLabel>Actions</DropdownMenuLabel>
			  <DropdownMenuItem
				onClick={() => navigator.clipboard.writeText(item.id)}
			  >
				Copy item ID
			  </DropdownMenuItem>
			  <DropdownMenuItem
				onClick={() => {
					setEditDialogItem(item)
					setEditDialogOpen(true)
				}}
			  >
				Edit item
			  </DropdownMenuItem>
			  <DropdownMenuSeparator />
			  <DropdownMenuItem onClick={() => removeItem(item)} className="text-red-500">Remove item</DropdownMenuItem>
			</DropdownMenuContent>
		  </DropdownMenu>
		)
	  },
	},
	]

  const table = useReactTable({
    data:items,
    columns: columns as ColumnDef<Items, any>[],
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
		<EditDialog 
			open={editDialogOpen} 
			setOpen={setEditDialogOpen} 
			item={editDialogItem} 
		/>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) => {
			table.getColumn("name")?.setFilterValue(event.target.value)
		  }
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Inventory
