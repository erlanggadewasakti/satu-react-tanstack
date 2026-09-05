import { Skeleton, TableBody, TableCell, TableRow } from '@mui/material';
import { flexRender } from '@tanstack/react-table';
import EmptyTable from './EmptyTable';

interface DataTableBodyProps {
  table: any;
  isLoading?: boolean;
  emptyMessage?: string;
}

export default function DataTableBody({ table, isLoading = false, emptyMessage = 'No data available' }: DataTableBodyProps) {
  if (isLoading) {
    return (
      <TableBody>
        {Array.from({ length: table.state?.pagination?.pageSize || 10 }).map((_, index) => (
          <TableRow key={index}>
            {table.getVisibleLeafColumns().map((col: any) => (
              <TableCell key={col.id} align={(col.columnDef.meta as { align?: 'left' | 'center' | 'right' })?.align || 'left'}>
                <Skeleton
                  sx={{
                    mx: (col.columnDef.meta as { align?: string })?.align === 'center' ? 'auto' : undefined
                  }}
                  width="75%"
                />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    );
  }

  const rows = table.getRowModel().rows;
  if (rows.length > 0) {
    return (
      <TableBody>
        {rows.map((row: any) => (
          <TableRow key={row.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            {row.getVisibleCells().map((cell: any) => (
              <TableCell
                key={cell.id}
                align={(cell.column.columnDef.meta as { align?: 'left' | 'center' | 'right' })?.align || 'left'}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    );
  }

  return (
    <TableBody>
      <TableRow sx={{ '&.MuiTableRow-root:hover': { bgcolor: 'transparent' } }}>
        <TableCell colSpan={table.getVisibleLeafColumns().length} sx={{ p: 0 }}>
          <EmptyTable msg={emptyMessage} />
        </TableCell>
      </TableRow>
    </TableBody>
  );
}
