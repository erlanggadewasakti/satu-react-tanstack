import {
  Alert,
  Box,
  Button,
  Card,
  Chip,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import { Briefcase, Calendar, Call, CloseCircle, DocumentText, Location, Refresh, SearchNormal1, User } from 'iconsax-reactjs';
import { useMemo, useState } from 'react';

// third-party
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable
} from '@tanstack/react-table';

// project-imports
import MainCard from 'components/MainCard';
import { EmptyTable, HeaderSort, SelectColumnSorting, TablePagination } from 'components/third-party/react-table';
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

export default function MockDataViewPage() {
  const { data: rawMockData, isLoading, isError, error, refetch, isFetching } = useGetMockData();

  // Table States
  const [sorting, setSorting] = useState<SortingState>([{ id: 'id', desc: false }]);
  const [globalFilter, setGlobalFilter] = useState('');

  // Column definitions
  const columns = useMemo<ColumnDef<MockItem>[]>(
    () => [
      {
        header: 'ID',
        accessorKey: 'id',
        meta: { align: 'center' },
        cell: (cell) => <Chip label={`#${cell.getValue()}`} size="small" variant="outlined" color="secondary" sx={{ fontWeight: 600 }} />
      },
      {
        header: 'Nama',
        accessorKey: 'name',
        meta: { align: 'left' },
        cell: (cell) => (
          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary' }}>
            {cell.getValue() as string}
          </Typography>
        )
      },
      {
        header: 'Pekerjaan',
        accessorKey: 'job',
        meta: { align: 'left' },
        cell: (cell) => (
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
        header: 'Alamat',
        accessorKey: 'address',
        meta: { align: 'left' },
        cell: (cell) => (
          <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
            <Location size={14} style={{ flexShrink: 0, opacity: 0.6 }} />
            <Typography variant="body2" color="text.secondary" noWrap sx={{ maxWidth: 220 }}>
              {cell.getValue() as string}
            </Typography>
          </Stack>
        )
      },
      {
        header: 'No. Telepon',
        accessorKey: 'phone_number',
        enableSorting: false,
        meta: { align: 'left' },
        cell: (cell) => (
          <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
            <Call size={14} style={{ flexShrink: 0, opacity: 0.6 }} />
            <Typography variant="body2" color="text.secondary">
              {cell.getValue() as string}
            </Typography>
          </Stack>
        )
      },
      {
        header: 'Tgl Lahir',
        accessorKey: 'birth_date',
        meta: { align: 'center' },
        cell: (cell) => (
          <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center', justifyContent: 'center' }}>
            <Calendar size={14} style={{ opacity: 0.6 }} />
            <Typography variant="body2" color="text.secondary">
              {formatDate(cell.getValue() as string)}
            </Typography>
          </Stack>
        )
      },
      {
        header: 'Dibuat Pada',
        accessorKey: 'created_at',
        meta: { align: 'center' },
        cell: (cell) => (
          <Typography variant="caption" color="text.secondary">
            {formatDate(cell.getValue() as string)}
          </Typography>
        )
      }
    ],
    []
  );

  const data = useMemo(() => rawMockData || [], [rawMockData]);

  // TanStack Table Instance
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel()
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
                  Total Data Mock
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
                  Hasil Filter
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
                  Variasi Job Role
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
        title="Daftar Data Mock (TanStack React Table Client Side)"
        content={false}
        secondary={
          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
            <SelectColumnSorting getState={table.getState} getAllColumns={table.getAllColumns} setSorting={setSorting} size="small" />
            <Tooltip title="Refresh Data">
              <IconButton
                color="primary"
                onClick={() => refetch()}
                disabled={isFetching}
                sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1.5 }}
              >
                <Refresh size={18} className={isFetching ? 'spin' : ''} />
              </IconButton>
            </Tooltip>
          </Stack>
        }
      >
        <Stack spacing={2.5}>
          {/* SEARCH TOOLBAR */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{ justifyContent: 'space-between', alignItems: 'center', p: 2.5, pb: 0 }}
          >
            <TextField
              size="small"
              placeholder="Cari berdasarkan nama, job, alamat, atau no HP..."
              value={globalFilter ?? ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
              sx={{ width: { xs: '100%', sm: 360 } }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchNormal1 size={18} />
                    </InputAdornment>
                  ),
                  endAdornment: globalFilter ? (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={() => setGlobalFilter('')} edge="end">
                        <CloseCircle size={16} />
                      </IconButton>
                    </InputAdornment>
                  ) : null
                }
              }}
            />

            {globalFilter && (
              <Typography variant="caption" color="text.secondary">
                Ditemukan <strong>{table.getFilteredRowModel().rows.length}</strong> data sesuai kata kunci
              </Typography>
            )}
          </Stack>

          {/* ERROR ALERT */}
          {isError && (
            <Box sx={{ px: 2.5 }}>
              <Alert
                severity="error"
                action={
                  <Button color="inherit" size="small" onClick={() => refetch()}>
                    Coba Lagi
                  </Button>
                }
              >
                Gagal memuat data dari API mock: {error instanceof Error ? error.message : 'Terjadi kesalahan sistem'}
              </Alert>
            </Box>
          )}

          {/* DATA TABLE CONTAINER */}
          <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden', mx: 2.5, width: 'auto' }}>
            <Table sx={{ minWidth: 700 }} aria-label="mock data table">
              <TableHead sx={{ bgcolor: 'grey.100' }}>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableCell
                        key={header.id}
                        align={(header.column.columnDef.meta as { align?: 'left' | 'center' | 'right' })?.align || 'left'}
                        sortDirection={header.column.getIsSorted()}
                        sx={{ fontWeight: 600, py: 1.5 }}
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
                  Array.from({ length: table.getState().pagination.pageSize }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">
                        <Skeleton width={30} />
                      </TableCell>
                      <TableCell>
                        <Skeleton width={120} />
                      </TableCell>
                      <TableCell>
                        <Skeleton width={100} />
                      </TableCell>
                      <TableCell>
                        <Skeleton width={180} />
                      </TableCell>
                      <TableCell>
                        <Skeleton width={110} />
                      </TableCell>
                      <TableCell align="center">
                        <Skeleton width={80} />
                      </TableCell>
                      <TableCell align="center">
                        <Skeleton width={90} />
                      </TableCell>
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
                  <TableRow>
                    <TableCell colSpan={7} sx={{ p: 0 }}>
                      <EmptyTable msg={globalFilter ? `Tidak ada data ditemukan untuk "${globalFilter}"` : 'Tidak ada data tersedia'} />
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
              {...{
                setPageSize: table.setPageSize,
                setPageIndex: table.setPageIndex,
                getState: table.getState,
                getPageCount: table.getPageCount
              }}
            />
          </Box>
        </Stack>
      </MainCard>
    </Stack>
  );
}
