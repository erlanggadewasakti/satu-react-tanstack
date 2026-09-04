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
        boxShadow: {
          xs: (theme) => theme.vars.customShadows.z1,
          md: '0 24px 48px -12px rgba(0, 0, 0, 0.5), 0 0 1px 1px rgba(255, 255, 255, 0.12)'
        },
        borderColor: { xs: 'divider', md: 'rgba(255, 255, 255, 0.12)' },
        bgcolor: 'background.paper',
        position: 'relative',
        zIndex: 10,
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
