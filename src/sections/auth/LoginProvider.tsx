import { useNavigate } from '@tanstack/react-router';

// material-ui
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';

// project-imports
import { APP_AUTH, AuthProvider } from 'config';

// assets
import Jwt from 'assets/images/icons/jwt.svg';
import Firebase from 'assets/images/icons/firebase.svg';
import Auth0 from 'assets/images/icons/auth0.svg';
import Aws from 'assets/images/icons/aws.svg';
import Supabase from 'assets/images/icons/supabase.svg';

interface LoginProps {
  currentLoginWith: string;
}

// ==============================|| SOCIAL BUTTON ||============================== //

export default function LoginProvider({ currentLoginWith }: LoginProps) {
  const downSM = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const loginHandlers = {
    Jwt: () => navigate({ to: APP_AUTH === AuthProvider.JWT ? '/login' : '/jwt/login', search: { auth: 'jwt' } }),
    Firebase: () => navigate({ to: APP_AUTH === AuthProvider.FIREBASE ? '/login' : '/firebase/login', search: { auth: 'firebase' } }),
    Auth0: () => navigate({ to: APP_AUTH === AuthProvider.AUTH0 ? '/login' : '/auth0/login', search: { auth: 'auth0' } }),
    Aws: () => navigate({ to: APP_AUTH === AuthProvider.AWS ? '/login' : '/aws/login', search: { auth: 'aws' } }),
    Supabase: () => navigate({ to: APP_AUTH === AuthProvider.SUPABASE ? '/login' : '/supabase/login', search: { auth: 'supabase' } })
  };

  const buttonData = [
    { name: 'jwt', icon: Jwt, handler: loginHandlers.Jwt },
    { name: 'firebase', icon: Firebase, handler: loginHandlers.Firebase },
    { name: 'auth0', icon: Auth0, handler: loginHandlers.Auth0 },
    { name: 'aws', icon: Aws, handler: loginHandlers.Aws },
    { name: 'supabase', icon: Supabase, handler: loginHandlers.Supabase }
  ];

  const currentLoginExists = buttonData.some((button) => button.name === currentLoginWith);

  return (
    <Stack
      direction="row"
      sx={{
        gap: { xs: 1, sm: 2 },
        justifyContent: { xs: 'space-around', sm: 'space-between' },
        '& .MuiButton-startIcon': { mr: { xs: 0, sm: 1 }, ml: { xs: 0, sm: -0.5 } }
      }}
    >
      {buttonData
        .filter((button) => {
          if (currentLoginExists) {
            return button.name !== currentLoginWith;
          }
          return button.name !== APP_AUTH;
        })
        .map((button) => (
          <Tooltip title={button.name} key={button.name}>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              startIcon={<CardMedia component="img" sx={{ width: 26 }} src={button.icon} alt={button.name} />}
              onClick={button.handler}
            >
              {!downSM && button.name}
            </Button>
          </Tooltip>
        ))}
    </Stack>
  );
}
