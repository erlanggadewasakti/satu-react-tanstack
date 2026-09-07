import { ReactNode } from 'react';
import { Box, Stack } from '@mui/material';
import { ReactTable, RowData, StockFeatures } from '@tanstack/react-table';
import DebouncedInput from './DebouncedInput';
import SelectColumnSorting from './SelectColumnSorting';
import SelectColumnVisibility from './SelectColumnVisibility';

export interface DataTableToolbarProps<TData extends RowData = any> {
  table: ReactTable<StockFeatures, TData>;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  showSortingSelect?: boolean;
  showVisibilitySelect?: boolean;
  extraToolbarActions?: ReactNode;
}

export default function DataTableToolbar<TData extends RowData = any>({
  table,
  searchValue,
  onSearchChange,
  searchPlaceholder,
  showSortingSelect = true,
  showVisibilitySelect = true,
  extraToolbarActions
}: DataTableToolbarProps<TData>) {
  const showToolbar = Boolean(onSearchChange || showSortingSelect || showVisibilitySelect || extraToolbarActions);
  if (!showToolbar) return null;

  return (
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
  );
}
