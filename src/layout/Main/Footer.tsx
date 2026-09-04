// material-ui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// ==============================|| MAIN LAYOUT - FOOTER ||============================== //

export default function Footer() {
  return (
    <Stack direction={{ sm: 'row' }} sx={{ gap: 1, justifyContent: 'space-between', alignItems: 'center', pt: 3, mt: 'auto' }}>
      <Typography variant="caption" color="text.secondary">
        &copy; Handcrafted by Erlangga Dewa.
      </Typography>
    </Stack>
  );
}
