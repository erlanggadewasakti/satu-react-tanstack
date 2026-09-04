import { Box, Card, Chip, Grid, IconButton, Skeleton, Stack, Tooltip, Typography } from '@mui/material';
import { Briefcase, Calendar, Call, DirectSend, DocumentText, Layer, Location, Refresh } from 'iconsax-reactjs';
import { useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

// third-party
import {
  ColumnDef,
  createSortedRowModel,
  PaginationState,
  SortingState,
  StockFeatures,
  stockFeatures,
  tableFeatures,
  useTable
} from '@tanstack/react-table';

// project-imports
import MainCard from 'components/MainCard';
import { DataTable } from 'components/third-party/react-table';
import { useGetPaginatedMockData } from 'hooks/queries/useMockData';
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

// Features pipeline with sortedRowModel
const features = tableFeatures({
  ...stockFeatures,
  sortedRowModel: createSortedRowModel()
});

// ==============================|| EXAMPLE - MOCK DATA TABLE (SERVER-SIDE) ||============================== //

export default function MockServerDataViewPage() {
  const intl = useIntl();

  // Server-side query states
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });
  const [sorting, setSorting] = useState<SortingState>([{ id: 'id', desc: false }]);
  const [searchInput, setSearchInput] = useState('');

  const sortParam = sorting.length > 0 ? sorting[0] : undefined;

  // Fetch paginated data from server
  const {
    data: paginatedData,
    isLoading,
    isError,
    error,
    refetch,
    isFetching
  } = useGetPaginatedMockData({
    page: pagination.pageIndex + 1,
    per_page: pagination.pageSize,
    search: searchInput,
    sortBy: sortParam?.id,
    sortDir: sortParam?.desc ? 'desc' : 'asc'
  });

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

  const data = useMemo(() => paginatedData?.data || [], [paginatedData?.data]);

  // TanStack Table Instance with Server-Side Settings & Sorting Pipeline
  const table = useTable({
    features,
    data,
    columns,
    manualPagination: true,
    rowCount: paginatedData?.total || 0,
    pageCount: paginatedData?.last_page || 1,
    state: {
      pagination,
      sorting
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting
  });

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
                  <FormattedMessage id="example.stat-total-server" />
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {isLoading ? <Skeleton width={60} /> : (paginatedData?.total ?? 0)}
                </Typography>
              </Box>
            </Stack>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          <Card variant="outlined" sx={{ p: 2.5, borderRadius: 2 }}>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
              <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'info.lighter', color: 'info.main', display: 'flex' }}>
                <Layer size={24} />
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  <FormattedMessage id="example.stat-active-page" />
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {isLoading ? <Skeleton width={60} /> : `${paginatedData?.current_page ?? 1} / ${paginatedData?.last_page ?? 1}`}
                </Typography>
              </Box>
            </Stack>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          <Card variant="outlined" sx={{ p: 2.5, borderRadius: 2 }}>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
              <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'success.lighter', color: 'success.main', display: 'flex' }}>
                <DirectSend size={24} />
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  <FormattedMessage id="example.stat-displayed-records" />
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {isLoading ? <Skeleton width={60} /> : `${paginatedData?.data?.length ?? 0} Data`}
                </Typography>
              </Box>
            </Stack>
          </Card>
        </Grid>
      </Grid>

      {/* MAIN DATA TABLE CARD */}
      <MainCard
        title={<FormattedMessage id="example.mock-server-table-title" />}
        content={false}
        secondary={
          <Tooltip title={<FormattedMessage id="example.refresh-tooltip" />}>
            <span>
              <IconButton
                color="primary"
                onClick={() => refetch()}
                disabled={isFetching}
                sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1.5 }}
              >
                <Refresh size={18} className={isFetching ? 'spin' : ''} />
              </IconButton>
            </span>
          </Tooltip>
        }
      >
        <DataTable
          table={table}
          isLoading={isLoading}
          isFetching={isFetching}
          isError={isError}
          errorMessage={
            (
              <FormattedMessage
                id="example.error-loading-server"
                values={{
                  error: error instanceof Error ? error.message : intl.formatMessage({ id: 'example.system-error' })
                }}
              />
            ) as any
          }
          onRetry={() => refetch()}
          searchValue={searchInput}
          onSearchChange={(value) => {
            setSearchInput(String(value).trim());
            setPagination((prev) => ({ ...prev, pageIndex: 0 }));
          }}
          searchPlaceholder={intl.formatMessage({ id: 'example.mock-search-server-placeholder' })}
          emptyMessage={
            searchInput
              ? intl.formatMessage({ id: 'example.no-data-search' }, { search: searchInput })
              : intl.formatMessage({ id: 'example.no-data' })
          }
        />
      </MainCard>
    </Stack>
  );
}
