// material-ui
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

// ==============================|| DRAWER HEADER - STYLED ||============================== //

const DrawerHeaderStyled = styled(Box, { shouldForwardProp: (prop) => prop !== 'open' })<{ open: boolean }>(({ theme }) => ({
  ...theme.mixins.toolbar,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingLeft: 0,
  width: '100%',
  variants: [
    {
      props: ({ open }) => open,
      style: {
        justifyContent: 'center',
        paddingLeft: 0
      }
    }
  ]
}));

export default DrawerHeaderStyled;
