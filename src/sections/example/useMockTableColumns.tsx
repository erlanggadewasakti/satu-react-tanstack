import { Chip, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { CellContext, ColumnDef, StockFeatures } from '@tanstack/react-table';
import { Briefcase, Calendar, Call, Edit, Location, Trash } from 'iconsax-reactjs';
import { useMemo } from 'react';
import { IntlShape } from 'react-intl';

// project-imports
import { MockItem } from 'types/api/mock';

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

export interface UseMockTableColumnsProps {
  intl: IntlShape;
  onEdit: (item: MockItem) => void;
  onDelete: (item: MockItem) => void;
}

export function useMockTableColumns({ intl, onEdit, onDelete }: UseMockTableColumnsProps) {
  return useMemo<ColumnDef<StockFeatures, MockItem, any>[]>(
    () => [
      {
        header: intl.formatMessage({ id: 'example.column.id' }),
        accessorKey: 'id',
        meta: { align: 'center' },
        cell: (cell: CellContext<StockFeatures, MockItem, any>) => (
          <Chip label={`#${cell.getValue()}`} size="small" variant="outlined" color="secondary" sx={{ fontWeight: 600 }} />
        )
      },
      {
        header: intl.formatMessage({ id: 'example.column.name' }),
        accessorKey: 'name',
        meta: { align: 'left' },
        cell: (cell: any) => (
          <Typography variant="subtitle1" sx={{ color: 'text.primary' }}>
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
            <Typography variant="body1" color="text.secondary" noWrap sx={{ maxWidth: 220 }}>
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
            <Typography variant="body1" color="text.secondary" sx={{ fontVariantNumeric: 'tabular-nums' }}>
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
            <Typography variant="body1" color="text.secondary" sx={{ fontVariantNumeric: 'tabular-nums' }}>
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
          <Typography variant="body1" color="text.secondary" sx={{ fontVariantNumeric: 'tabular-nums' }}>
            {formatDate(cell.getValue() as string)}
          </Typography>
        )
      },
      {
        id: 'actions',
        header: intl.formatMessage({ id: 'example.column.actions' }),
        meta: { align: 'center' },
        enableSorting: false,
        cell: (cell: any) => (
          <Stack direction="row" spacing={0.5} sx={{ justifyContent: 'center', alignItems: 'center' }}>
            <Tooltip title={intl.formatMessage({ id: 'example.action-edit' })}>
              <IconButton
                size="medium"
                color="primary"
                onClick={() => onEdit(cell.row.original)}
                aria-label={intl.formatMessage({ id: 'example.action-edit' })}
              >
                <Edit size={16} />
              </IconButton>
            </Tooltip>
            <Tooltip title={intl.formatMessage({ id: 'example.action-delete' })}>
              <IconButton
                size="medium"
                color="error"
                onClick={() => onDelete(cell.row.original)}
                aria-label={intl.formatMessage({ id: 'example.action-delete' })}
              >
                <Trash size={16} />
              </IconButton>
            </Tooltip>
          </Stack>
        )
      }
    ],
    [intl, onEdit, onDelete]
  );
}
