import { ReactNode, SetStateAction } from 'react';

// material-ui
import FormControl from '@mui/material/FormControl';
import { InputBaseProps } from '@mui/material/InputBase';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';

// third-party
import { Column, RowData, SortingState, StockFeatures, TableState } from '@tanstack/react-table';

interface Props<T extends RowData = any> {
  getState?: () => TableState<StockFeatures>;
  state?: TableState<StockFeatures>;
  setSorting: (value: SetStateAction<SortingState>) => void;
  getAllColumns: () => Column<StockFeatures, T, any>[];
  size?: InputBaseProps['size'];
}

// ==============================|| COLUMN SORTING - SELECT ||============================== //

export default function SelectColumnSorting<T extends RowData = any>({
  getState,
  state,
  getAllColumns,
  setSorting,
  size = 'medium'
}: Props<T>) {
  const handleChange = (event: SelectChangeEvent<string>) => {
    setSorting([{ id: event.target.value, desc: false }]);
  };

  const currentState = state || (getState ? getState() : undefined);
  const sortingState = currentState?.sorting || [];
  const selectedColumnId = sortingState.length > 0 ? sortingState[0].id : '';

  return (
    <FormControl sx={{ width: 200 }} size={size}>
      <Select
        id="column-sorting"
        displayEmpty
        onChange={handleChange}
        value={selectedColumnId}
        input={<OutlinedInput id="select-column-sorting" placeholder="Select column" />}
        renderValue={(value) => {
          const selectedColumn = getAllColumns().find((col) => col.id === value);
          return (
            <Typography variant="subtitle2">
              {selectedColumn
                ? `Sort by (${typeof selectedColumn.columnDef.header === 'string' ? selectedColumn.columnDef.header : '#'})`
                : 'Sort By'}
            </Typography>
          );
        }}
      >
        {getAllColumns().reduce<ReactNode[]>((acc, col) => {
          if ((col.columnDef as { accessorKey?: string }).accessorKey && col.getCanSort()) {
            acc.push(
              <MenuItem key={col.id} value={col.id}>
                <ListItemText primary={typeof col.columnDef.header === 'string' ? col.columnDef.header : '#'} />
              </MenuItem>
            );
          }
          return acc;
        }, [])}
      </Select>
    </FormControl>
  );
}
