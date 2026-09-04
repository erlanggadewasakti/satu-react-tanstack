// material-ui
import Box from '@mui/material/Box';

// project-imports
import MainCard, { MainCardProps } from 'components/MainCard';

// ==============================|| AUTHENTICATION - CARD ||============================== //

export default function AuthCard({ children, ...other }: MainCardProps) {
  return (
    <MainCard
      sx={{
        width: '100%',
        borderRadius: 2.5,
        boxShadow: (theme) => theme.vars.customShadows.z1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
        '& > *': {
          flexGrow: 1
        }
      }}
      content={false}
      {...other}
    >
      <Box sx={{ p: { xs: 3, sm: 4, md: 4.5 } }}>{children}</Box>
    </MainCard>
  );
}
