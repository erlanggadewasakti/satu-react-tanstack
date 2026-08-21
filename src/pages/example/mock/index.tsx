import {
  Alert,
  Box,
  Button,
  Card,
  Chip,
  Divider,
  Grid,
  IconButton,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography
} from '@mui/material';
import { Briefcase, Calendar, Call, DocumentText, Location, Refresh, User } from 'iconsax-reactjs';
import { useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

// third-party
import {
  ColumnDef,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  flexRender,
  PaginationState,
  SortingState,
  StockFeatures,
  stockFeatures,
  tableFeatures,
  useTable
} from '@tanstack/react-table';

// project-imports
import MainCard from 'components/MainCard';
import {
  DebouncedInput,
  EmptyTable,
  HeaderSort,
  SelectColumnSorting,
  SelectColumnVisibility,
  TablePagination
} from 'components/third-party/react-table';
import { useGetMockData } from 'hooks/queries/useMockData';
import { MockItem } from 'types/api/mock';

// Helper to format raw date string nicely
function formatDate(dateStr?: string): string {
  if (!dateStr) return '-';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  } catch {
    return dateStr;
  }
}

// Features pipeline with client-side sorting, filtering, and paginatedRowModel
const features = tableFeatures({
  ...stockFeatures,
  sortedRowModel: createSortedRowModel(),
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel()
});

// ==============================|| EXAMPLE - MOCK DATA TABLE (CLIENT-SIDE) ||============================== //

export default function MockDataViewPage() {
  const intl = useIntl();
  const { data: rawMockData, isLoading, isError, error, refetch, isFetching } = useGetMockData();

  // Table States
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });
  const [sorting, setSorting] = useState<SortingState>([{ id: 'id', desc: false }]);
  const [globalFilter, setGlobalFilter] = useState('');

  // Column definitions
  const columns = useMemo<ColumnDef<StockFeatures, MockItem, any>[]>(
    () => [
      {
        header: intl.formatMessage({ id: 'example.column.id' }),
        accessorKey: 'id',
        meta: { align: 'center' },
        cell: (cell: any) => (
          <Chip label={`#${cell.getValue()}`} size="small" variant="outlined" color="secondary" sx={{ fontWeight: 600 }} />
        )
      },
      {
        header: intl.formatMessage({ id: 'example.column.name' }),
        accessorKey: 'name',
        meta: { align: 'left' },
        cell: (cell: any) => (
          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary' }}>
            {cell.getValue() as string}
          </Typography>
        )
      },
      {
        header: intl.formatMessage({ id: 'example.column.job' }),
        accessorKey: 'job',
        meta: { align: 'left' },
        cell: (cell: any) => (
          <Chip
            icon={<Briefcase size={14} />}
            label={cell.getValue() as string}
            size="small"
            color="primary"
            variant="light"
            sx={{ fontWeight: 500 }}
          />
        )
      },
      {
        header: intl.formatMessage({ id: 'example.column.address' }),
        accessorKey: 'address',
        meta: { align: 'left' },
        cell: (cell: any) => (
          <Stack direction="row" spacing={0.75} sx={{ alignItems: 'center' }}>
            <Location size={14} style={{ flexShrink: 0, opacity: 0.6 }} />
            <Typography variant="body2" color="text.secondary" noWrap sx={{ maxWidth: 220 }}>
              {cell.getValue() as string}
            </Typography>
          </Stack>
        )
      },
      {
        header: intl.formatMessage({ id: 'example.column.phone' }),
        accessorKey: 'phone_number',
        enableSorting: false,
        meta: { align: 'left' },
        cell: (cell: any) => (
          <Stack direction="row" spacing={0.75} sx={{ alignItems: 'center' }}>
            <Call size={14} style={{ flexShrink: 0, opacity: 0.6 }} />
            <Typography variant="body2" color="text.secondary">
              {cell.getValue() as string}
            </Typography>
          </Stack>
        )
      },
      {
        header: intl.formatMessage({ id: 'example.column.birth_date' }),
        accessorKey: 'birth_date',
        meta: { align: 'center' },
        cell: (cell: any) => (
          <Stack direction="row" spacing={0.75} sx={{ alignItems: 'center', justifyContent: 'center' }}>
            <Calendar size={14} style={{ opacity: 0.6 }} />
            <Typography variant="body2" color="text.secondary">
              {formatDate(cell.getValue() as string)}
            </Typography>
          </Stack>
        )
      },
      {
        header: intl.formatMessage({ id: 'example.column.created_at' }),
        accessorKey: 'created_at',
        meta: { align: 'center' },
        cell: (cell: any) => (
          <Typography variant="caption" color="text.secondary">
            {formatDate(cell.getValue() as string)}
          </Typography>
        )
      }
    ],
    [intl]
  );

  const data = useMemo(() => rawMockData || [], [rawMockData]);

  // TanStack Table Instance with Client-Side Slicing & Sorting Pipeline
  const table = useTable({
    features,
    data,
    columns,
    state: {
      pagination,
      sorting,
      globalFilter
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onGlobalFilterChange: (updater) => {
      setGlobalFilter(updater);
      setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    }
  });

  // Job role counts for stats
  const uniqueJobsCount = useMemo(() => {
    if (!rawMockData) return 0;
    return new Set(rawMockData.map((d) => d.job.trim())).size;
  }, [rawMockData]);

  return (
    <Stack spacing={3}>
      {/* HEADER SUMMARY CARDS */}
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card variant="outlined" sx={{ p: 2.5, borderRadius: 2 }}>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
              <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'primary.lighter', color: 'primary.main', display: 'flex' }}>
                <DocumentText size={24} />
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  <FormattedMessage id="example.stat-total-mock" />
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {isLoading ? <Skeleton width={60} /> : rawMockData?.length || 0}
                </Typography>
              </Box>
            </Stack>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          <Card variant="outlined" sx={{ p: 2.5, borderRadius: 2 }}>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
              <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'info.lighter', color: 'info.main', display: 'flex' }}>
                <User size={24} />
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  <FormattedMessage id="example.stat-filtered-records" />
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {isLoading ? <Skeleton width={60} /> : table.getFilteredRowModel().rows.length}
                </Typography>
              </Box>
            </Stack>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          <Card variant="outlined" sx={{ p: 2.5, borderRadius: 2 }}>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
              <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'success.lighter', color: 'success.main', display: 'flex' }}>
                <Briefcase size={24} />
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  <FormattedMessage id="example.stat-job-roles" />
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {isLoading ? <Skeleton width={60} /> : uniqueJobsCount}
                </Typography>
              </Box>
            </Stack>
          </Card>
        </Grid>
      </Grid>

      {/* MAIN DATA TABLE CARD */}
      <MainCard
        title={<FormattedMessage id="example.mock-table-title" />}
        content={false}
        secondary={
          <Tooltip title={<FormattedMessage id="example.refresh-tooltip" />}>
            <IconButton
              color="primary"
              onClick={() => refetch()}
              disabled={isFetching}
              sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1.5 }}
            >
              <Refresh size={18} className={isFetching ? 'spin' : ''} />
            </IconButton>
          </Tooltip>
        }
      >
        {/* TOP SEARCH & ACTIONS TOOLBAR */}
        <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ gap: 2, alignItems: 'center', justifyContent: 'space-between', p: 2.5 }}>
          <DebouncedInput
            value={globalFilter ?? ''}
            onFilterChange={(value) => {
              setGlobalFilter(String(value));
              setPagination((prev) => ({ ...prev, pageIndex: 0 }));
            }}
            placeholder={intl.formatMessage({ id: 'example.mock-search-placeholder' })}
            sx={{ width: { xs: '100%', sm: 340 } }}
          />

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
            <SelectColumnSorting state={table.state} getAllColumns={table.getAllColumns} setSorting={setSorting} size="small" />
            <SelectColumnVisibility
              getVisibleLeafColumns={table.getVisibleLeafColumns}
              getIsAllColumnsVisible={table.getIsAllColumnsVisible}
              getToggleAllColumnsVisibilityHandler={table.getToggleAllColumnsVisibilityHandler}
              getAllColumns={table.getAllColumns}
              size="small"
            />
          </Stack>
        </Stack>

        {/* ERROR ALERT */}
        {isError && (
          <Box sx={{ px: 2.5, pb: 2 }}>
            <Alert
              severity="error"
              action={
                <Button color="inherit" size="small" onClick={() => refetch()}>
                  <FormattedMessage id="example.retry-btn" />
                </Button>
              }
            >
              <FormattedMessage
                id="example.error-loading-mock"
                values={{
                  error: error instanceof Error ? error.message : intl.formatMessage({ id: 'example.system-error' })
                }}
              />
            </Alert>
          </Box>
        )}

        {/* FULL-WIDTH TABLE CONTAINER */}
        <TableContainer>
          <Table sx={{ minWidth: 700 }} aria-label="mock client table">
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
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
                Array.from({ length: table.state.pagination.pageSize }).map((_, index) => (
                  <TableRow key={index}>
                    {table.getVisibleLeafColumns().map((col) => (
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
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    {row.getVisibleCells().map((cell) => (
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
                    <EmptyTable
                      msg={
                        globalFilter
                          ? intl.formatMessage({ id: 'example.no-data-search' }, { search: globalFilter })
                          : intl.formatMessage({ id: 'example.no-data' })
                      }
                    />
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
      </MainCard>
    </Stack>
  );
}
