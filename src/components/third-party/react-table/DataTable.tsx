import { ReactNode } from 'react';
import {
  Alert,
  Box,
  Button,
  Divider,
  Stack,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { flexRender } from '@tanstack/react-table';
import { FormattedMessage } from 'react-intl';

// project-imports
import DataTableToolbar from './DataTableToolbar';
import DataTableBody from './DataTableBody';
import HeaderSort from './HeaderSort';
import TablePagination from './TablePagination';

// ==============================|| REUSABLE DATA TABLE COMPONENT ||============================== //

export interface DataTableToolbarConfig {
  showSortingSelect?: boolean;
  showVisibilitySelect?: boolean;
}

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
  toolbarConfig?: DataTableToolbarConfig;
  extraToolbarActions?: ReactNode;
  // Table customisation
  minWidth?: number | string;
  emptyMessage?: string;
}

export default function DataTable({
  table,
  isLoading = false,
  isFetching = false,
  isError = false,
  errorMessage,
  onRetry,
  searchValue,
  onSearchChange,
  searchPlaceholder,
  toolbarConfig,
  extraToolbarActions,
  minWidth = 700,
  emptyMessage = 'No data available'
}: DataTableProps) {
  return (
    <>
      {/* TOP SEARCH & ACTIONS TOOLBAR */}
      <DataTableToolbar
        table={table}
        searchValue={searchValue}
        onSearchChange={onSearchChange}
        searchPlaceholder={searchPlaceholder}
        showSortingSelect={toolbarConfig?.showSortingSelect ?? true}
        showVisibilitySelect={toolbarConfig?.showVisibilitySelect ?? true}
        extraToolbarActions={extraToolbarActions}
      />

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

          <DataTableBody table={table} isLoading={isLoading || isFetching} emptyMessage={emptyMessage} />
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
