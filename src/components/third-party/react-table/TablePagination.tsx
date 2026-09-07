import { ChangeEvent, useEffect, useState } from 'react';

// material-ui
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// third-party
import { FormattedMessage } from 'react-intl';
import { StockFeatures, TableState, Updater } from '@tanstack/react-table';

interface TablePaginationProps {
  setPageSize: (updater: Updater<number>) => void;
  setPageIndex: (updater: Updater<number>) => void;
  getState?: () => TableState<StockFeatures>;
  state?: TableState<StockFeatures> | { pagination?: { pageIndex: number; pageSize: number } } | any;
  getPageCount: () => number;
  initialPageSize?: number;
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
}

// ==============================|| TABLE PAGINATION ||============================== //

export default function TablePagination({
  getPageCount,
  setPageIndex,
  setPageSize,
  getState,
  state,
  initialPageSize,
  color = 'primary'
}: TablePaginationProps) {
  const [open, setOpen] = useState(false);
  let options: number[] = [10, 25, 50, 100];

  if (initialPageSize) {
    options = [...options, initialPageSize]
      .filter((item, index) => [...options, initialPageSize].indexOf(item) === index)
      .sort((a, b) => a - b);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setPageSize(initialPageSize || 10), []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChangePagination = (event: ChangeEvent<unknown>, value: number) => {
    setPageIndex(value - 1);
  };

  const handleChange = (event: SelectChangeEvent<any>) => {
    setPageSize(Number(event.target.value));
  };

  const currentState = state || (getState ? getState() : undefined);
  const paginationState = currentState?.pagination || { pageIndex: 0, pageSize: initialPageSize || 10 };

  return (
    <Grid spacing={1} container sx={{ alignItems: 'center', justifyContent: 'space-between', width: 'auto' }}>
      <Grid>
        <Stack direction="row" sx={{ gap: 1.5, alignItems: 'center' }}>
          <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
              <FormattedMessage id="pagination.rows-per-page" />
            </Typography>
            <FormControl sx={{ m: 0.5 }}>
              <Select
                id="demo-controlled-open-select"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={paginationState.pageSize}
                onChange={handleChange}
                size="small"
                slotProps={{ input: { sx: { py: 0.75, px: 1.25, fontWeight: 600 } } }}
                sx={{
                  borderRadius: 1.5,
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: `${color}.main`
                  }
                }}
              >
                {options.map((option: number) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
            <FormattedMessage id="pagination.go-to-page" />
          </Typography>
          <TextField
            size="small"
            type="number"
            value={paginationState.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              setPageIndex(page);
            }}
            slotProps={{ htmlInput: { sx: { py: 0.75, px: 1.25, width: 44, textAlign: 'center', fontWeight: 600 } } }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 1.5,
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: `${color}.main`
                }
              }
            }}
          />
        </Stack>
      </Grid>

      <Grid sx={{ mt: { xs: 2, sm: 0 } }}>
        <Pagination
          sx={{
            '& .MuiPaginationItem-root': {
              my: 0.5,
              borderRadius: 1.5,
              fontWeight: 500,
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                bgcolor: `${color}.lighter`,
                color: `${color}.main`
              }
            },
            '& .MuiPaginationItem-root.Mui-selected': {
              bgcolor: `${color}.main`,
              color: `${color}.contrastText`,
              fontWeight: 700,
              boxShadow: (theme) => `0 2px 8px ${theme.palette[color]?.main || theme.palette.primary.main}40`,
              '&:hover': {
                bgcolor: `${color}.dark`
              }
            }
          }}
          count={getPageCount()}
          page={paginationState.pageIndex + 1}
          onChange={handleChangePagination}
          color={color}
          variant="combined"
          showFirstButton
          showLastButton
        />
      </Grid>
    </Grid>
  );
}
