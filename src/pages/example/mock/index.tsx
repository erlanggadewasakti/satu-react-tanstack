import { Button, IconButton, Stack, Tooltip } from '@mui/material';
import { Add, Briefcase, DocumentText, Refresh, User } from 'iconsax-reactjs';
import { useCallback, useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

// third-party
import {
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  PaginationState,
  SortingState,
  stockFeatures,
  tableFeatures,
  useTable
} from '@tanstack/react-table';

// project-imports
import { openSnackbar } from 'api/snackbar';
import MainCard from 'components/MainCard';
import { DataTable } from 'components/third-party/react-table';
import { useCreateMockData, useDeleteMockData, useGetMockData, useUpdateMockData } from 'hooks/queries/useMockData';
import MockDeleteModal from 'sections/example/MockDeleteModal';
import MockFormModal from 'sections/example/MockFormModal';
import MockStatsCards, { StatItem } from 'sections/example/MockStatsCards';
import { useMockTableColumns } from 'sections/example/useMockTableColumns';
import { CreateMockItemPayload, MockItem } from 'types/api/mock';

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

  // Mutations
  const createMutation = useCreateMockData();
  const updateMutation = useUpdateMockData();
  const deleteMutation = useDeleteMockData();

  // Modal states
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MockItem | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<MockItem | null>(null);

  // Table States
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });
  const [sorting, setSorting] = useState<SortingState>([{ id: 'id', desc: false }]);
  const [globalFilter, setGlobalFilter] = useState('');

  // Handlers for CRUD modals
  const handleOpenCreate = () => {
    setSelectedItem(null);
    setFormModalOpen(true);
  };

  const handleOpenEdit = useCallback((item: MockItem) => {
    setSelectedItem(item);
    setFormModalOpen(true);
  }, []);

  const handleOpenDelete = useCallback((item: MockItem) => {
    setItemToDelete(item);
    setDeleteModalOpen(true);
  }, []);

  const handleSubmitForm = async (values: CreateMockItemPayload) => {
    try {
      if (selectedItem) {
        await updateMutation.mutateAsync({ id: selectedItem.id, ...values });
        openSnackbar({
          open: true,
          message: intl.formatMessage({ id: 'example.snackbar-update-success' }),
          variant: 'alert',
          alert: { color: 'success' },
          close: false
        });
      } else {
        await createMutation.mutateAsync(values);
        openSnackbar({
          open: true,
          message: intl.formatMessage({ id: 'example.snackbar-create-success' }),
          variant: 'alert',
          alert: { color: 'success' },
          close: false
        });
      }
    } catch (err: any) {
      const errorMsg = err?.response?.data?.error || err?.message || intl.formatMessage({ id: 'example.system-error' });
      openSnackbar({
        open: true,
        message: selectedItem
          ? intl.formatMessage({ id: 'example.snackbar-update-error' }, { error: errorMsg })
          : intl.formatMessage({ id: 'example.snackbar-create-error' }, { error: errorMsg }),
        variant: 'alert',
        alert: { color: 'error' },
        close: false
      });
      throw err;
    }
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      await deleteMutation.mutateAsync(itemToDelete.id);
      openSnackbar({
        open: true,
        message: intl.formatMessage({ id: 'example.snackbar-delete-success' }),
        variant: 'alert',
        alert: { color: 'success' },
        close: false
      });
    } catch (err: any) {
      const errorMsg = err?.response?.data?.error || err?.message || intl.formatMessage({ id: 'example.system-error' });
      openSnackbar({
        open: true,
        message: intl.formatMessage({ id: 'example.snackbar-delete-error' }, { error: errorMsg }),
        variant: 'alert',
        alert: { color: 'error' },
        close: false
      });
      throw err;
    }
  };

  const columns = useMockTableColumns({
    intl,
    onEdit: handleOpenEdit,
    onDelete: handleOpenDelete
  });

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

  const statItems = useMemo<StatItem[]>(
    () => [
      {
        id: 'total-mock',
        icon: <DocumentText size={24} />,
        color: 'primary',
        label: <FormattedMessage id="example.stat-total-mock" />,
        value: rawMockData?.length || 0
      },
      {
        id: 'filtered-records',
        icon: <User size={24} />,
        color: 'info',
        label: <FormattedMessage id="example.stat-filtered-records" />,
        value: table.getFilteredRowModel().rows.length
      },
      {
        id: 'job-roles',
        icon: <Briefcase size={24} />,
        color: 'success',
        label: <FormattedMessage id="example.stat-job-roles" />,
        value: uniqueJobsCount
      }
    ],
    [rawMockData?.length, table, uniqueJobsCount]
  );

  return (
    <Stack spacing={3}>
      <MockStatsCards items={statItems} isLoading={isLoading} />

      <MainCard
        title={<FormattedMessage id="example.mock-table-title" />}
        content={false}
        secondary={
          <Tooltip title={<FormattedMessage id="example.refresh-tooltip" />}>
            <span>
              <IconButton
                color="primary"
                onClick={() => refetch()}
                disabled={isFetching}
                sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1.5 }}
                aria-label={intl.formatMessage({ id: 'example.refresh-tooltip' })}
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
          isError={isError}
          errorMessage={
            (
              <FormattedMessage
                id="example.error-loading-mock"
                values={{
                  error: error instanceof Error ? error.message : intl.formatMessage({ id: 'example.system-error' })
                }}
              />
            ) as any
          }
          onRetry={() => refetch()}
          searchValue={globalFilter ?? ''}
          onSearchChange={(value) => {
            setGlobalFilter(String(value));
            setPagination((prev) => ({ ...prev, pageIndex: 0 }));
          }}
          searchPlaceholder={intl.formatMessage({ id: 'example.mock-search-placeholder' })}
          extraToolbarActions={
            <Button
              variant="contained"
              color="primary"
              startIcon={<Add size={18} />}
              onClick={handleOpenCreate}
              size="large"
              sx={{ borderRadius: 1.5, textTransform: 'none', fontWeight: 600, whiteSpace: 'nowrap' }}
            >
              <FormattedMessage id="example.add-data-btn" />
            </Button>
          }
          emptyMessage={
            globalFilter
              ? intl.formatMessage({ id: 'example.no-data-search' }, { search: globalFilter })
              : intl.formatMessage({ id: 'example.no-data' })
          }
        />
      </MainCard>

      <MockFormModal
        open={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        onSubmit={handleSubmitForm}
        initialData={selectedItem}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />

      <MockDeleteModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        item={itemToDelete}
        isLoading={deleteMutation.isPending}
      />
    </Stack>
  );
}
