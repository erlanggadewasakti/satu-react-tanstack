import { ReactNode } from 'react';
import {
  Alert,
  Box,
  Button,
  Divider,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { flexRender } from '@tanstack/react-table';
import { FormattedMessage } from 'react-intl';

// project-imports
import DebouncedInput from './DebouncedInput';
import EmptyTable from './EmptyTable';
import HeaderSort from './HeaderSort';
import SelectColumnSorting from './SelectColumnSorting';
import SelectColumnVisibility from './SelectColumnVisibility';
import TablePagination from './TablePagination';

// ==============================|| REUSABLE DATA TABLE COMPONENT ||============================== //

export interface DataTableProps {
  table: any;
  isLoading?: boolean;
  isFetching?: boolean;
  isError?: boolean;
  errorMessage?: ReactNode;
  onRetry?: () => void;
  // Toolbar controls
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  showSortingSelect?: boolean;
  showVisibilitySelect?: boolean;
  extraToolbarActions?: ReactNode;
  // Table customisation
  minWidth?: number | string;
  emptyMessage?: string;
}

export default function DataTable({
  table,
  isLoading = false,
  isError = false,
  errorMessage,
  onRetry,
  searchValue,
  onSearchChange,
  searchPlaceholder,
  showSortingSelect = true,
  showVisibilitySelect = true,
  extraToolbarActions,
  minWidth = 700,
  emptyMessage = 'No data available'
}: DataTableProps) {
  const showToolbar = Boolean(onSearchChange || showSortingSelect || showVisibilitySelect || extraToolbarActions);

  return (
    <>
      {/* TOP SEARCH & ACTIONS TOOLBAR */}
      {showToolbar && (
        <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ gap: 2, alignItems: 'center', justifyContent: 'space-between', p: 2.5 }}>
          {onSearchChange ? (
            <DebouncedInput
              value={searchValue ?? ''}
              onFilterChange={(val) => onSearchChange(String(val))}
              placeholder={searchPlaceholder}
              sx={{ width: { xs: '100%', sm: 340 } }}
            />
          ) : (
            <Box />
          )}

          <Stack
            direction="row"
            sx={{
              gap: 1.5,
              alignItems: 'center',
              flexWrap: 'wrap',
              width: { xs: '100%', sm: 'auto' },
              justifyContent: { xs: 'space-between', sm: 'flex-end' }
            }}
          >
            {showSortingSelect && table.getAllColumns && (
              <SelectColumnSorting state={table.state} getAllColumns={table.getAllColumns} setSorting={table.setSorting} size="small" />
            )}
            {showVisibilitySelect && table.getVisibleLeafColumns && (
              <SelectColumnVisibility
                getVisibleLeafColumns={table.getVisibleLeafColumns}
                getIsAllColumnsVisible={table.getIsAllColumnsVisible}
                getToggleAllColumnsVisibilityHandler={table.getToggleAllColumnsVisibilityHandler}
                getAllColumns={table.getAllColumns}
                size="small"
              />
            )}
            {extraToolbarActions}
          </Stack>
        </Stack>
      )}

      {/* ERROR ALERT */}
      {isError && (
        <Box sx={{ px: 2.5, pb: 2 }}>
          <Alert
            severity="error"
            action={
              onRetry ? (
                <Button color="inherit" size="small" onClick={onRetry}>
                  <FormattedMessage id="example.retry-btn" />
                </Button>
              ) : undefined
            }
          >
            {errorMessage || <FormattedMessage id="example.system-error" />}
          </Alert>
        </Box>
      )}

      {/* TABLE CONTAINER */}
      <TableContainer>
        <Table sx={{ minWidth }} aria-label="data table">
          <TableHead>
            {table.getHeaderGroups().map((headerGroup: any) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header: any) => (
                  <TableCell
                    key={header.id}
                    align={(header.column.columnDef.meta as { align?: 'left' | 'center' | 'right' })?.align || 'left'}
                    sortDirection={header.column.getIsSorted()}
                  >
                    {header.isPlaceholder ? null : (
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                          alignItems: 'center',
                          justifyContent:
                            (header.column.columnDef.meta as { align?: string })?.align === 'center'
                              ? 'center'
                              : (header.column.columnDef.meta as { align?: string })?.align === 'right'
                                ? 'flex-end'
                                : 'flex-start'
                        }}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && <HeaderSort column={header.column} />}
                      </Stack>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>

          <TableBody>
            {isLoading ? (
              Array.from({ length: table.state?.pagination?.pageSize || 10 }).map((_, index) => (
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
              ))
            ) : table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row: any) => (
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
              ))
            ) : (
              <TableRow sx={{ '&.MuiTableRow-root:hover': { bgcolor: 'transparent' } }}>
                <TableCell colSpan={table.getVisibleLeafColumns().length} sx={{ p: 0 }}>
                  <EmptyTable msg={emptyMessage} />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* BOTTOM PAGINATION CONTROLS */}
      <Divider />
      <Box sx={{ p: 2 }}>
        <TablePagination
          setPageSize={table.setPageSize}
          setPageIndex={table.setPageIndex}
          state={table.state}
          getPageCount={table.getPageCount}
        />
      </Box>
    </>
  );
}
