import { ChangeEvent } from 'react';

// material-ui
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import { useColorScheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

// project-imports
import MainCard from 'components/MainCard';
import { ThemeMode } from 'config';
import useConfig from 'hooks/useConfig';

// types
import { PresetColor } from 'types/config';

// assets
import { TickSquare } from 'iconsax-react';

// ==============================|| CUSTOMIZATION - COLOR SCHEME ||============================== //

const COLOR_CONFIG: Record<PresetColor, { light: { primary: string; darker: string }; dark: { primary: string; darker: string } }> = {
  default: {
    light: { primary: '#4680FF', darker: '#2F63FF' },
    dark: { primary: '#4680FF', darker: '#2F63FF' }
  },
  theme1: {
    light: { primary: '#3366FF', darker: '#102693' },
    dark: { primary: '#305bdd', darker: '#a9c5f8' }
  },
  theme2: {
    light: { primary: '#7265E6', darker: '#5549DB' },
    dark: { primary: '#655ac8', darker: '#c3baf4' }
  },
  theme3: {
    light: { primary: '#068e44', darker: '#001c0f' },
    dark: { primary: '#0a7d3e', darker: '#173123' }
  },
  theme4: {
    light: { primary: '#3c64d0', darker: '#0d1b5e' },
    dark: { primary: '#5d7dcb', darker: '#212841' }
  },
  theme5: {
    light: { primary: '#f27013', darker: '#802800' },
    dark: { primary: '#d26415', darker: '#f8c48c' }
  },
  theme6: {
    light: { primary: '#2aa1af', darker: '#06323d' },
    dark: { primary: '#288d99', darker: '#96d0d0' }
  },
  theme7: {
    light: { primary: '#00a854', darker: '#003620' },
    dark: { primary: '#05934c', darker: '#61ca8b' }
  },
  theme8: {
    light: { primary: '#009688', darker: '#002424' },
    dark: { primary: '#058478', darker: '#59b8a5' }
  },
  satu: {
    light: { primary: '#B53D3D', darker: '#8A2E2E' },
    dark: { primary: '#f05545', darker: '#ffcdcf' }
  }
};

const COLOR_IDS: PresetColor[] = ['default', 'theme1', 'theme2', 'theme3', 'theme4', 'theme5', 'theme6', 'theme7', 'theme8', 'satu'];

export default function ColorScheme() {
  const { colorScheme } = useColorScheme();
  const {
    state: { presetColor },
    setField
  } = useConfig();

  const mode = colorScheme === ThemeMode.DARK ? 'dark' : 'light';

  const handlePresetColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    setField('presetColor', event.target.value as PresetColor);
  };

  return (
    <RadioGroup row aria-label="payment-card" name="payment-card" value={presetColor} onChange={handlePresetColorChange}>
      <Stack direction="row" sx={{ gap: 0.5, alignItems: 'center', width: 1 }}>
        {COLOR_IDS.map((id) => {
          const color = { id, ...COLOR_CONFIG[id][mode] };
          return (
            <FormControlLabel
              key={color.id}
              control={<Radio value={color.id} sx={{ display: 'none' }} />}
              sx={{ m: 0, width: presetColor === color.id ? '100%' : 'auto', display: 'flex' }}
              slotProps={{ typography: { sx: { flex: 1 } } }}
              label={
                <MainCard
                  content={false}
                  sx={{
                    bgcolor: color.primary,
                    p: 1,
                    borderRadius: 0.5,
                    borderWidth: 4,
                    borderColor: presetColor === color.id ? color.darker : color.primary,
                    '&:hover': { borderColor: color.darker }
                  }}
                >
                  <Stack
                    direction="row"
                    sx={{ alignItems: 'center', justifyContent: 'center', width: presetColor === color.id ? '100%' : 1, height: 44 }}
                  >
                    {presetColor === color.id && (
                      <Stack
                        sx={(theme) => ({
                          alignItems: 'center',
                          color: 'background.paper',
                          ...theme.applyStyles('dark', { color: 'text.primary' })
                        })}
                      >
                        <TickSquare variant="Bulk" />
                        <Typography variant="caption">{color.id}</Typography>
                      </Stack>
                    )}
                  </Stack>
                </MainCard>
              }
            />
          );
        })}
      </Stack>
    </RadioGroup>
  );
}
