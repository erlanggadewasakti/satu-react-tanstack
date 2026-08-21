// material-ui
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';

// third-party
import { Column, RowData, StockFeatures } from '@tanstack/react-table';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

interface Props<TData extends RowData = any> {
  getVisibleLeafColumns: () => Column<StockFeatures, TData, any>[];
  getIsAllColumnsVisible: () => boolean;
  getToggleAllColumnsVisibilityHandler: () => (event: unknown) => void;
  getAllColumns: () => Column<StockFeatures, TData, any>[];
  size?: 'small' | 'medium';
}

// ==============================|| COLUMN VISIBILITY - SELECT ||============================== //

export default function SelectColumnVisibility<TData extends RowData = any>({
  getVisibleLeafColumns,
  getIsAllColumnsVisible,
  getToggleAllColumnsVisibilityHandler,
  getAllColumns,
  size = 'small'
}: Props<TData>) {
  const visibleLeafColumns = getVisibleLeafColumns();
  const allVisible = getIsAllColumnsVisible();

  return (
    <FormControl sx={{ width: 190 }} size={size}>
      <Select
        id="column-visibility"
        multiple
        displayEmpty
        value={visibleLeafColumns.map((c) => c.id)}
        input={<OutlinedInput id="select-column-visibility" placeholder="Select column" />}
        renderValue={() => {
          if (allVisible) {
            return <Typography variant="subtitle2">All columns visible</Typography>;
          }

          if (visibleLeafColumns.length === 0) {
            return <Typography variant="subtitle2">All columns hidden</Typography>;
          }

          return <Typography variant="subtitle2">{visibleLeafColumns.length} column(s) visible</Typography>;
        }}
        MenuProps={{
          slotProps: {
            paper: {
              sx: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 220
              }
            }
          }
        }}
        size={size}
      >
        <MenuItem value="all" onClick={getToggleAllColumnsVisibilityHandler()}>
          <Checkbox checked={allVisible} color="primary" size="small" />
          <ListItemText primary="All Columns" />
        </MenuItem>
        {getAllColumns().map(
          (column) =>
            (column.columnDef as { accessorKey?: string }).accessorKey && (
              <MenuItem key={column.id} value={column.id} onClick={column.getToggleVisibilityHandler()}>
                <Checkbox checked={column.getIsVisible()} color="primary" size="small" />
                <ListItemText primary={typeof column.columnDef.header === 'string' ? column.columnDef.header : column.id} />
              </MenuItem>
            )
        )}
      </Select>
    </FormControl>
  );
}
