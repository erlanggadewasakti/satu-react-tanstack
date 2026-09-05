import CardMedia from '@mui/material/CardMedia';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { SxProps, Theme } from '@mui/material/styles';

// project-imports
import MainCard from 'components/MainCard';

// ==============================|| CUSTOMIZATION - LAYOUT CARD ||============================== //

interface LayoutCardProps {
  value: string;
  label: string;
  img: string;
  isSelected: boolean;
  activeCardStyle?: SxProps<Theme>;
}

export default function LayoutCard({ value, label, img, isSelected, activeCardStyle }: LayoutCardProps) {
  return (
    <FormControlLabel
      value={value}
      sx={{ width: 1, m: 0, display: 'flex' }}
      control={<Radio sx={{ display: 'none' }} />}
      label={
        <Stack sx={{ gap: 0.5, alignItems: 'center' }}>
          <MainCard
            content={false}
            sx={{
              borderWidth: 2,
              p: 1,
              ...(isSelected && activeCardStyle)
            }}
          >
            <CardMedia component="img" src={img} alt={label} />
          </MainCard>
          <Typography variant="caption">{label}</Typography>
        </Stack>
      }
    />
  );
}
