// material-ui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

// assets
import { ArrowDown2, ArrowUp2 } from 'iconsax-reactjs';

// types
import { CellData, Column, RowData, StockFeatures } from '@tanstack/react-table';

enum SortType {
  ASC = 'asc',
  DESC = 'desc'
}

function SortToggler({ type }: { type?: SortType }) {
  return (
    <Stack
      sx={{
        color: 'secondary.light',
        ...(type === SortType.ASC && { '& .caret-up': { color: 'secondary.main' } }),
        ...(type === SortType.DESC && { '& .caret-down': { color: 'secondary.main' } })
      }}
    >
      <ArrowUp2 className="caret-up" size={12} variant="Bold" />
      <ArrowDown2 className="caret-down" size={12} variant="Bold" style={{ marginTop: -4 }} />
    </Stack>
  );
}

interface HeaderSortProps<TData extends RowData = any, TValue extends CellData = any> {
  column: Column<StockFeatures, TData, TValue>;
  sort?: boolean;
}

// ==============================|| SORT HEADER ||============================== //

export default function HeaderSort<TData extends RowData = any, TValue extends CellData = any>({
  column,
  sort = true
}: HeaderSortProps<TData, TValue>) {
  return (
    <Box {...(sort && { onClick: column.getToggleSortingHandler(), sx: { cursor: 'pointer' } })}>
      {{
        asc: <SortToggler type={SortType.ASC} />,
        desc: <SortToggler type={SortType.DESC} />
      }[column.getIsSorted() as string] ?? <SortToggler />}
    </Box>
  );
}
