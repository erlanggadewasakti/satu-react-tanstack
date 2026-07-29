import { createContext, useEffect, useReducer, ReactElement } from 'react';

// third-party
import { CognitoUser, CognitoUserPool, CognitoUserSession, CognitoUserAttribute, AuthenticationDetails } from 'amazon-cognito-identity-js';

// project-imports
import Loader from 'components/Loader';
import { LOGIN, LOGOUT } from 'contexts/auth-reducer/actions';
import authReducer from 'contexts/auth-reducer/auth';

// types
import { AWSCognitoContextType, InitialLoginContextProps } from 'types/auth';

// constant
const initialState: InitialLoginContextProps = {
  isLoggedIn: false,
  isInitialized: false,
  user: null
};

export const userPool = new CognitoUserPool({
  UserPoolId: import.meta.env.VITE_APP_AWS_POOL_ID || '',
  ClientId: import.meta.env.VITE_APP_AWS_APP_CLIENT_ID || ''
});

const setSession = (serviceToken?: string | null) => {
  if (serviceToken) {
    localStorage.setItem('serviceToken', serviceToken);
  } else {
    localStorage.removeItem('serviceToken');
  }
};

// ==============================|| AWS COGNITO - CONTEXT & PROVIDER ||============================== //

const AWSCognitoContext = createContext<AWSCognitoContextType | null>(null);

export const AWSCognitoProvider = ({ children }: { children: ReactElement }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const init = async () => {
      try {
        const serviceToken = window.localStorage.getItem('serviceToken');
        if (serviceToken) {
          setSession(serviceToken);
          dispatch({
            type: LOGIN,
            payload: {
              isLoggedIn: true,
              user: {
                name: 'Betty'
              }
            }
          });
        } else {
          dispatch({
            type: LOGOUT
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: LOGOUT
        });
      }
    };

    init();
  }, []);

  const login = async (email: string, password: string) => {
    const usr = new CognitoUser({
      Username: email,
      Pool: userPool
    });

    const authData = new AuthenticationDetails({
      Username: email,
      Password: password
    });

    return new Promise<any>((success, rej) => {
      usr.authenticateUser(authData, {
        onSuccess: (session: CognitoUserSession) => {
          setSession(session.getAccessToken().getJwtToken());

          dispatch({
            type: LOGIN,
            payload: {
              isLoggedIn: true,
              user: {
                email: authData.getUsername(),
                name: 'John AWS'
              }
            }
          });
          success(session);
        },
        onFailure: (err) => {
          rej(err);
        },
        newPasswordRequired: () => {
          // // User was signed up by an admin and must provide new
          // // password and required attributes, if any, to complete
          // // authentication.
          // // the api doesn't accept this field back
          // delete userAttributes.email_verified;
          // // unsure about this field, but I don't send this back
          // delete userAttributes.phone_number_verified;
          // // Get these details and call
          // usr.completeNewPasswordChallenge(password, userAttributes, requiredAttributes);
        }
      });
    });
  };

  const register = (email: string, password: string, firstName: string, lastName: string) =>
    new Promise<void>((success, rej) => {
      userPool.signUp(
        email,
        password,
        [
          new CognitoUserAttribute({ Name: 'email', Value: email }),
          new CognitoUserAttribute({ Name: 'name', Value: `${firstName} ${lastName}` })
        ],
        [],
        async (err, result) => {
          if (err) {
            rej(err);
            return;
          }
          localStorage.setItem('email', email);
          success();
        }
      );
    });

  const logout = () => {
    const loggedInUser = userPool.getCurrentUser();
    if (loggedInUser) {
      setSession(null);
      loggedInUser.signOut();
      dispatch({ type: LOGOUT });
    }
  };

  const forgotPassword = async (email: string) => {
    const user = new CognitoUser({
      Username: email,
      Pool: userPool
    });
    user.forgotPassword({
      onSuccess: function () {},
      onFailure: function () {}
    });
  };

  const awsResetPassword = async (verificationCode: string, newPassword: string): Promise<void> => {
    const email = localStorage.getItem('email');
    const user = new CognitoUser({
      Username: email as string,
      Pool: userPool
    });
    return new Promise<void>((resolve, reject) => {
      user.confirmPassword(verificationCode, newPassword, {
        onSuccess: function () {
          localStorage.removeItem('email');
          resolve();
        },
        onFailure: function (error) {
          reject(error.message);
        }
      });
    });
  };

  const codeVerification = async (verificationCode: string): Promise<void> => {
    const email = localStorage.getItem('email');
    if (email === null || email === undefined) {
      return new Promise<void>((_, reject) => {
        reject('Username and Pool information are required');
      });
    }

    const user = new CognitoUser({
      Username: email as string,
      Pool: userPool
    });

    return new Promise<void>((resolve, reject) => {
      user.confirmRegistration(verificationCode, true, (error) => {
        if (error) {
          reject(error.message || JSON.stringify(error));
          return;
        } else {
          localStorage.removeItem('email');
          resolve();
        }
      });
    });
  };

  const resendConfirmationCode = async (): Promise<void> => {
    const email = localStorage.getItem('email');
    if (email === null || email === undefined) {
      return new Promise<void>((_, reject) => {
        reject('Username and Pool information are required');
      });
    }

    const user = new CognitoUser({
      Username: email as string,
      Pool: userPool
    });

    return new Promise<void>((resolve, reject) => {
      user.resendConfirmationCode((error) => {
        if (error) {
          reject(error.message || JSON.stringify(error));
          return;
        } else {
          resolve();
        }
      });
    });
  };

  const updateProfile = () => {};

  if (state.isInitialized !== undefined && !state.isInitialized) {
    return <Loader />;
  }

  return (
    <AWSCognitoContext
      value={{
        ...state,
        login,
        logout,
        register,
        forgotPassword,
        awsResetPassword,
        updateProfile,
        codeVerification,
        resendConfirmationCode
      }}
    >
      {children}
    </AWSCognitoContext>
  );
};

export default AWSCognitoContext;
