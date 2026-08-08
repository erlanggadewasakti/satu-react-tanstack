import { FormControl, InputLabel, Select, MenuItem, Box, Typography, SelectChangeEvent, Tooltip } from '@mui/material';

// project-imports
import useSubApp from 'hooks/useSubApp';

interface Props {
  collapsed?: boolean;
}

// ==============================|| SUB-APP SELECTOR DROPDOWN ||============================== //

export default function SubAppSelector({ collapsed }: Props) {
  const { activeSubApp, subApps, changeSubApp } = useSubApp();

  const handleChange = (event: SelectChangeEvent<string>) => {
    changeSubApp(event.target.value);
  };

  const appName = activeSubApp?.name || 'Aplikasi';
  const badgeText = appName.substring(0, 3).toUpperCase();

  if (collapsed) {
    return (
      <Tooltip title={appName} placement="right">
        <Box sx={{ py: 1.5, textAlign: 'center', cursor: 'pointer' }}>
          <Typography variant="caption" sx={{ fontWeight: 700, color: 'primary.main', fontSize: '0.75rem' }}>
            {badgeText}
          </Typography>
        </Box>
      </Tooltip>
    );
  }

  return (
    <Box sx={{ px: 2.5, py: 1.5 }}>
      <FormControl fullWidth size="small" variant="outlined">
        <InputLabel id="sub-app-select-label" sx={{ bgcolor: 'background.paper', px: 0.5 }}>
          Aplikasi
        </InputLabel>
        <Select
          labelId="sub-app-select-label"
          id="sub-app-select"
          value={activeSubApp?.id || ''}
          label="Aplikasi"
          onChange={handleChange}
          sx={{
            borderRadius: 1.5,
            fontWeight: 600,
            color: 'primary.main',
            '& .MuiSelect-select': { py: 1 }
          }}
        >
          {subApps.map((app) => (
            <MenuItem key={app.id} value={app.id}>
              {app.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

