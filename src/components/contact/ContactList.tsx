import * as React from "react";
import {
  CaretSortIcon,
  ChevronDownIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
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
} from "@tanstack/react-table";
import dayjs from "dayjs";
import { cpf } from "cpf-cnpj-validator";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { CreateSheetTrigger } from "./CreateSheetTrigger";
import EditDropdown from "./EditDropdown";

import { useUser } from "@/contexts/UserContext";
import { useMaps } from "@/contexts/MapsContext";
import { FullContact } from "@/contexts/UserContext/types";

export default function ContentsList() {
  const { currentUser } = useUser();
  const { handleMapPosition } = useMaps();

  const filterType = React.useRef<"name" | "cpf" | null>(null);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: currentUser?.contacts || [],
    columns,
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
  });

  // This change handle functions makes possible to filter contacts by name and cpf number getting type of initial values
  const handleChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.match(/^-?\d+(\.\d+)?/)) {
      table.getColumn("cpf")?.setFilterValue(event.target.value);
      filterType.current = "cpf";
    } else if (!event.target.value && filterType.current == "cpf") {
      table.getColumn("cpf")?.setFilterValue("");
      filterType.current = null;
    } else {
      table.getColumn("name")?.setFilterValue(event.target.value);
      filterType.current = "name";
    }
  };

  // Listening for rows selected in the table to use map context and change location
  React.useEffect(() => {
    const selectedRowKeysIndex = Object.keys(rowSelection);
    if (selectedRowKeysIndex.length > 0) {
      const indexSelected = Number(selectedRowKeysIndex[0]);

      if (currentUser) {
        const contactSelected = currentUser.contacts[indexSelected];
        if (contactSelected) {
          handleMapPosition(contactSelected.location);
        }
      }
    } else {
      handleMapPosition(null);
    }
  }, [rowSelection, currentUser]);

  return (
    <div className="w-full h-[600px] bg-white px-4 rounded-xl shadow-md overflow-y-auto">
      <div className="flex justify-between items-center py-4 lg:flex-row flex-col">
        <Input
          placeholder="Filter name or CPF..."
          value={
            (table.getColumn("name")?.getFilterValue() as string) ??
            (table.getColumn("cpf")?.getFilterValue() as string) ??
            ""
          }
          onChange={handleChangeEvent}
          className="lg:max-w-sm w-full"
        />
        <div className="flex justify-between mt-4 lg:mt-0 lg:justify-end max-[1024px]:w-full max-[400px]:flex-col">
          <CreateSheetTrigger>
            <Button className="mr-2 max-[400px]:mr-0">
              Create a new contact <PlusIcon className="ml-2 h-4 w-4" />
            </Button>
          </CreateSheetTrigger>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="max-[400px]:mt-2">
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
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
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
                  );
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
  );
}

export const columns: ColumnDef<FullContact>[] = [
  {
    id: "select",

    cell: ({ row, table }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => {
          table.toggleAllPageRowsSelected(false);
          row.toggleSelected(!!value);
        }}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "cpf",
    header: "CPF",
    cell: ({ row }) => (
      <div className="capitalize">{cpf.format(row.getValue("cpf"))}</div>
    ),
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => (
      <div className="capitalize w-[200px]">{row.getValue("address")}</div>
    ),
  },
  {
    accessorKey: "phone",
    header: "Phone number",
    cell: ({ row }) => (
      <div className="capitalize w-[200px]">{row.getValue("phone")}</div>
    ),
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = dayjs(row.getValue("created_at")).format(
        "HH:MM  -  DD/MM/YYYY"
      );
      return <div className="lowercase">{date}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return <EditDropdown contact={row.original} />;
    },
  },
];
