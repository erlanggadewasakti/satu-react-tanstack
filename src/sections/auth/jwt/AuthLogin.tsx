import { SyntheticEvent, useState } from 'react';

// material-ui
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// third-party
import { Formik } from 'formik';
import { FormattedMessage, useIntl } from 'react-intl';
import * as Yup from 'yup';

// project-imports
import { openSnackbar } from 'api/snackbar';
import AnimateButton from 'components/@extended/AnimateButton';
import IconButton from 'components/@extended/IconButton';
import useAuth from 'hooks/useAuth';

// assets
import { Eye, EyeSlash } from 'iconsax-reactjs';

// ============================|| LOGIN FORM ||============================ //

const handleMouseDownPassword = (event: SyntheticEvent) => {
  event.preventDefault();
};

export default function AuthLogin() {
  const intl = useIntl();
  const [checked, setChecked] = useState(true);

  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Formik
        initialValues={{
          username: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string()
            .max(255)
            .required(intl.formatMessage({ id: 'login.username-required' })),
          password: Yup.string()
            .required(intl.formatMessage({ id: 'login.password-required' }))
            .test('no-leading-trailing-whitespace', intl.formatMessage({ id: 'login.password-no-spaces' }), (value) =>
              Boolean(value && value === value.trim())
            )
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            const trimmedUsername = values.username.trim();
            await login(trimmedUsername, values.password);
            setStatus({ success: true });
            setSubmitting(false);
            openSnackbar({
              open: true,
              message: intl.formatMessage({ id: 'login.success' }),
              variant: 'alert',
              alert: {
                variant: 'filled'
              },
              severity: 'success',
              close: true
            });
          } catch (err: any) {
            console.error(err);
            setStatus({ success: false });

            const status = err.statusCode || err.status || err.response?.status;
            const rawMessage =
              typeof err.message === 'string'
                ? err.message
                : Array.isArray(err.message) && typeof err.message[0] === 'string'
                  ? err.message[0]
                  : typeof err.response?.data?.message === 'string'
                    ? err.response.data.message
                    : Array.isArray(err.response?.data?.message) && typeof err.response?.data?.message[0] === 'string'
                      ? err.response.data.message[0]
                      : '';

            let submitError = '';

            if (status === 401 && rawMessage) {
              // Split by koma dan ambil index ke-0
              const firstPart = rawMessage.split(',')[0].trim();
              const normalized = firstPart.toLowerCase();

              if (normalized === 'username not found') {
                submitError = intl.formatMessage({ id: 'login.error.username-not-found' });
              } else if (normalized === 'incorrect password') {
                submitError = intl.formatMessage({ id: 'login.error.incorrect-password' });
              } else {
                submitError = firstPart.charAt(0).toUpperCase() + firstPart.slice(1);
              }
            } else if (status === 500 || rawMessage === 'Internal server error' || rawMessage?.includes('Internal server error')) {
              submitError = intl.formatMessage({ id: 'login.invalid-credentials-hint' });
            } else {
              submitError = rawMessage || intl.formatMessage({ id: 'login.failed' });
            }

            setErrors({ submit: submitError });
            setSubmitting(false);
            openSnackbar({
              open: true,
              message: submitError,
              variant: 'alert',
              alert: {
                variant: 'filled'
              },
              severity: 'error',
              close: true
            });
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2.5}>
              {/* USERNAME FIELD */}
              <Grid size={12}>
                <Stack sx={{ gap: 1 }}>
                  <InputLabel htmlFor="username-login" sx={{ fontWeight: 500 }}>
                    <FormattedMessage id="login.username" />
                  </InputLabel>
                  <OutlinedInput
                    id="username-login"
                    type="text"
                    value={values.username}
                    name="username"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder={intl.formatMessage({ id: 'login.username-placeholder' })}
                    fullWidth
                    error={Boolean(touched.username && errors.username)}
                  />
                </Stack>
                {touched.username && errors.username && (
                  <FormHelperText error id="standard-weight-helper-text-username-login">
                    {errors.username}
                  </FormHelperText>
                )}
              </Grid>

              {/* PASSWORD FIELD */}
              <Grid size={12}>
                <Stack sx={{ gap: 1 }}>
                  <InputLabel htmlFor="password-login" sx={{ fontWeight: 500 }}>
                    <FormattedMessage id="login.password" />
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="password-login"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          color="secondary"
                        >
                          {showPassword ? <Eye size={20} /> : <EyeSlash size={20} />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder={intl.formatMessage({ id: 'login.password-placeholder' })}
                  />
                </Stack>
                {touched.password && errors.password && (
                  <FormHelperText error id="standard-weight-helper-text-password-login">
                    {errors.password}
                  </FormHelperText>
                )}
              </Grid>

              {/* REMEMBER ME CHECKBOX */}
              <Grid sx={{ mt: -0.5 }} size={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={(event) => setChecked(event.target.checked)}
                      name="checked"
                      color="primary"
                      size="small"
                    />
                  }
                  label={
                    <Typography variant="body2" sx={{ color: 'text.secondary', userSelect: 'none' }}>
                      <FormattedMessage id="login.keep-signed-in" />
                    </Typography>
                  }
                />
              </Grid>

              {/* ERROR ALERT */}
              {errors.submit && (
                <Grid size={12}>
                  <Alert severity="error" sx={{ py: 0.5, borderRadius: 1.5 }}>
                    {errors.submit}
                  </Alert>
                </Grid>
              )}

              {/* SUBMIT BUTTON */}
              <Grid size={12}>
                <AnimateButton>
                  <Button
                    disableElevation
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{
                      py: 1.25,
                      fontSize: '1rem',
                      fontWeight: 600,
                      borderRadius: 1.5,
                      textTransform: 'none'
                    }}
                  >
                    <FormattedMessage id="login.submit-btn" />
                  </Button>
                </AnimateButton>
              </Grid>

              {/* VERSION TEXT */}
              <Grid size={12}>
                <Typography
                  variant="caption"
                  sx={{
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.secondary',
                    mt: 0.5
                  }}
                >
                  <FormattedMessage id="login.version" values={{ version: import.meta.env.VITE_APP_VERSION || '1.0.0' }} />
                </Typography>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}
