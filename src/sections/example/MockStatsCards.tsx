import { Box, Card, Grid, Skeleton, Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';

export interface StatItem {
  id: string;
  icon: ReactNode;
  color: 'primary' | 'info' | 'success' | 'warning' | 'error';
  label: ReactNode;
  value: ReactNode;
}

export interface MockStatsCardsProps {
  items: StatItem[];
  isLoading?: boolean;
}

export default function MockStatsCards({ items, isLoading = false }: MockStatsCardsProps) {
  return (
    <Grid container spacing={2}>
      {items.map((stat) => (
        <Grid size={{ xs: 12, sm: 4 }} key={stat.id}>
          <Card variant="outlined" sx={{ p: 2.5, borderRadius: 2 }}>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: `${stat.color}.lighter`,
                  color: `${stat.color}.main`,
                  display: 'flex'
                }}
              >
                {stat.icon}
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  {stat.label}
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
                  {isLoading ? <Skeleton width={60} /> : stat.value}
                </Typography>
              </Box>
            </Stack>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
