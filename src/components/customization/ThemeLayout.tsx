import { ChangeEvent } from 'react';

// material-ui
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';

// project-imports
import useConfig from 'hooks/useConfig';
import { MenuOrientation } from 'config';
import { handlerDrawerOpen } from 'api/menu';
import LayoutCard from './LayoutCard';

// assets
import defaultLayout from 'assets/images/customization/ltr.svg';
import horizontalLayout from 'assets/images/customization/horizontal.svg';
import miniMenu from 'assets/images/customization/mini-menu.svg';

const layouts = [
  { value: MenuOrientation.VERTICAL, label: 'Default', img: defaultLayout },
  { value: MenuOrientation.HORIZONTAL, label: 'Horizontal', img: horizontalLayout },
  { value: MenuOrientation.MINI_VERTICAL, label: 'Mini Drawer', img: miniMenu }
];

const activeCardStyle = { borderColor: 'primary.main' };

// ==============================|| CUSTOMIZATION - THEME LAYOUT/ORIENTATION ||============================== //

export default function ThemeLayout() {
  const {
    state: { menuOrientation },
    setField
  } = useConfig();

  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setField('menuOrientation', newValue as MenuOrientation);
    handlerDrawerOpen(newValue === MenuOrientation.MINI_VERTICAL ? false : true);
  };

  return (
    <RadioGroup row aria-label="theme-layout" name="theme-layout" value={menuOrientation} onChange={handleRadioChange}>
      <Stack direction="row" sx={{ gap: 2.5, alignItems: 'center', width: '100%' }}>
        {layouts.map((layout) => (
          <LayoutCard
            key={layout.value}
            value={layout.value}
            label={layout.label}
            img={layout.img}
            isSelected={menuOrientation === layout.value}
            activeCardStyle={activeCardStyle}
          />
        ))}
      </Stack>
    </RadioGroup>
  );
}
