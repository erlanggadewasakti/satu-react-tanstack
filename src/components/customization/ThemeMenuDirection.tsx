// material-ui
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';

// project-imports
import useConfig from 'hooks/useConfig';
import { ThemeDirection } from 'config';
import LayoutCard from './LayoutCard';

// assets
import defaultLayout from 'assets/images/customization/ltr.svg';
import rtlLayout from 'assets/images/customization/rtl.svg';

const layouts = [
  { value: ThemeDirection.LTR, label: 'LTR', img: defaultLayout },
  { value: ThemeDirection.RTL, label: 'RTL', img: rtlLayout }
];

const activeCardStyle = {
  borderColor: 'primary.main',
  '&:hover': { borderColor: 'primary.darker' }
};

// ==============================|| CUSTOMIZATION - MENU DIRECTION ||============================== //

export default function ThemeMenuDirection() {
  const {
    state: { themeDirection },
    setField
  } = useConfig();

  return (
    <RadioGroup
      row
      aria-label="theme-layout"
      name="theme-layout"
      value={themeDirection}
      onChange={(e) => setField('themeDirection', e.target.value as ThemeDirection)}
    >
      <Stack direction="row" sx={{ gap: 2.5, alignItems: 'center', width: '100%' }}>
        {layouts.map((layout) => (
          <LayoutCard
            key={layout.value}
            value={layout.value}
            label={layout.label}
            img={layout.img}
            isSelected={themeDirection === layout.value}
            activeCardStyle={activeCardStyle}
          />
        ))}
      </Stack>
    </RadioGroup>
  );
}
