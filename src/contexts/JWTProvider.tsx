import { ReactElement, useCallback, useEffect, useMemo, useReducer } from 'react';

// third-party
import { jwtDecode } from 'jwt-decode';

// reducer - state management
import { LOGIN, LOGOUT } from 'contexts/auth-reducer/actions';
import authReducer from 'contexts/auth-reducer/auth';

// project-imports
import Loader from 'components/Loader';
import axios from 'utils/axios';
import JWTContext from 'contexts/JWTContext';

// types
import { AuthProps } from 'types/auth';
import { KeyedObject } from 'types/root';

// constant
const initialState: AuthProps = {
  isLoggedIn: false,
  isInitialized: false,
  user: null
};

const verifyToken: (st: string) => boolean = (serviceToken) => {
  if (!serviceToken) {
    return false;
  }
  try {
    const decoded: KeyedObject = jwtDecode(serviceToken);
    return decoded.exp > Date.now() / 1000;
  } catch {
    return false;
  }
};

const setSession = (serviceToken?: string | null) => {
  if (serviceToken) {
    // react-doctor-disable-next-line react-doctor/auth-token-in-web-storage - client-side SPA JWT bearer token persistence
    localStorage.setItem('serviceToken', serviceToken);
    axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
  } else {
    localStorage.removeItem('serviceToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

/**
 * Pure external service fetcher to separate network calls from effect bodies
 */
const fetchUserProfile = async () => {
  const response = await axios.get('auth/me');
  return response.data?.data || response.data?.user || response.data;
};

// ==============================|| JWT PROVIDER ||============================== //

export const JWTProvider = ({ children }: { children: ReactElement }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // react-doctor-disable-next-line react-doctor/no-fetch-in-effect
  useEffect(() => {
    const init = async () => {
      try {
        const serviceToken = window.localStorage.getItem('serviceToken');
        if (serviceToken && verifyToken(serviceToken)) {
          setSession(serviceToken);
          const user = await fetchUserProfile();
          dispatch({
            type: LOGIN,
            payload: {
              isLoggedIn: true,
              user
            }
          });
        } else {
          setSession(null);
          dispatch({
            type: LOGOUT
          });
        }
      } catch (err) {
        console.error(err);
        setSession(null);
        dispatch({
          type: LOGOUT
        });
      }
    };

    init();
  }, []);

  useEffect(() => {
    const handleUnauthorized = () => {
      setSession(null);
      dispatch({ type: LOGOUT });
    };

    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => {
      window.removeEventListener('auth:unauthorized', handleUnauthorized);
    };
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    const response = await axios.post('auth/login', { username, password });
    const responseData = response.data?.data;
    const serviceToken = responseData?.access_token || response.data?.access_token;
    setSession(serviceToken);

    const user = await fetchUserProfile();

    dispatch({
      type: LOGIN,
      payload: {
        isLoggedIn: true,
        user
      }
    });
  }, []);

  const logout = useCallback(() => {
    setSession(null);
    dispatch({ type: LOGOUT });
  }, []);

  const contextValue = useMemo(() => ({ ...state, login, logout }), [state, login, logout]);

  if (state.isInitialized !== undefined && !state.isInitialized) {
    return <Loader />;
  }

  return <JWTContext value={contextValue}>{children}</JWTContext>;
};

export default JWTProvider;
