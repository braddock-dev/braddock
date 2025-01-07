import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import * as React from "react";
import { ITreatment } from "@/app/backend/business/treatments/data/TreatmentsData";
import { Constants } from "@/app/utils/Constants";
import dayJsWrapper from "@/app/utils/dayjs";

interface ITreatmentColumnsProps {
  onEditTreatment: (treatment: ITreatment) => void;
  onDeleteTreatment: (treatment: ITreatment) => void;
}
export const TreatmentColumns = (
  props: ITreatmentColumnsProps,
): ColumnDef<ITreatment>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Nome do serviço",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "durationInMinutes",
    header: "Duração",
    cell: ({ row }) => (
      <div className="lowercase">
        {row.getValue("durationInMinutes")} Minutos
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="">Data de Criação</div>,
    cell: ({ row }) =>
      dayJsWrapper(row.getValue("createdAt")).format(
        Constants.DATE_FORMAT.FULL_DATE,
      ),
  },
  {
    id: "actions",
    header: "Acções",
    enableHiding: false,
    cell: ({ row }) => {
      const treatment = row.original;

      return (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acções</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => props.onEditTreatment(treatment)}>
              Editar
            </DropdownMenuItem>

            <DropdownMenuItem
              className={"text-red-600"}
              onClick={() => props.onDeleteTreatment(treatment)}
            >
              Remover
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
