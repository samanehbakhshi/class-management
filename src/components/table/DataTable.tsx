import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./Table";
export type Column<T> = {
  key: keyof T | string;
  label: string;
  width?: string;
  render?: (row: T) => React.ReactNode;
};

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  actions?: (row: T) => React.ReactNode;
}
export default function DataTable<T>({
  data,
  columns,
  actions,
}: DataTableProps<T>) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHead key={col.key.toString()}>{col.label}</TableHead>
          ))}
          {actions && <TableHead>عملیات</TableHead>}
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((row, index) => (
          <TableRow key={index}>
            {columns.map((col) => (
              <TableCell key={col.key.toString()}>
                {col.render ? col.render(row) : (row as any)[col.key]}
              </TableCell>
            ))}

            {actions && <TableCell>{actions(row)}</TableCell>}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
