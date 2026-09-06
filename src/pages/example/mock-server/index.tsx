import { Button, IconButton, Stack, Tooltip } from '@mui/material';
import { Add, DirectSend, DocumentText, Layer, Refresh } from 'iconsax-reactjs';
import { useCallback, useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

// third-party
import { createSortedRowModel, PaginationState, SortingState, stockFeatures, tableFeatures, useTable } from '@tanstack/react-table';

// project-imports
import { openSnackbar } from 'api/snackbar';
import MainCard from 'components/MainCard';
import { DataTable } from 'components/third-party/react-table';
import { useCreateMockData, useDeleteMockData, useGetPaginatedMockData, useUpdateMockData } from 'hooks/queries/useMockData';
import MockDeleteModal from 'sections/example/MockDeleteModal';
import MockFormModal from 'sections/example/MockFormModal';
import MockStatsCards, { StatItem } from 'sections/example/MockStatsCards';
import { useMockTableColumns } from 'sections/example/useMockTableColumns';
import { CreateMockItemPayload, MockItem } from 'types/api/mock';

// Features pipeline with sortedRowModel
const features = tableFeatures({
  ...stockFeatures,
  sortedRowModel: createSortedRowModel()
});

// ==============================|| EXAMPLE - MOCK DATA TABLE (SERVER-SIDE) ||============================== //

export default function MockServerDataViewPage() {
  const intl = useIntl();

  // Mutations
  const createMutation = useCreateMockData();
  const updateMutation = useUpdateMockData();
  const deleteMutation = useDeleteMockData();

  // Modal states
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MockItem | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<MockItem | null>(null);

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

  const statItems = useMemo<StatItem[]>(
    () => [
      {
        id: 'total-server',
        icon: <DocumentText size={24} />,
        color: 'primary',
        label: <FormattedMessage id="example.stat-total-server" />,
        value: paginatedData?.total ?? 0
      },
      {
        id: 'active-page',
        icon: <Layer size={24} />,
        color: 'info',
        label: <FormattedMessage id="example.stat-active-page" />,
        value: `${paginatedData?.current_page ?? 1} / ${paginatedData?.last_page ?? 1}`
      },
      {
        id: 'displayed-records',
        icon: <DirectSend size={24} />,
        color: 'success',
        label: <FormattedMessage id="example.stat-displayed-records" />,
        value: `${paginatedData?.data?.length ?? 0} Data`
      }
    ],
    [paginatedData]
  );

  return (
    <Stack spacing={3}>
      <MockStatsCards items={statItems} isLoading={isLoading} />

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
            searchInput
              ? intl.formatMessage({ id: 'example.no-data-search' }, { search: searchInput })
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
