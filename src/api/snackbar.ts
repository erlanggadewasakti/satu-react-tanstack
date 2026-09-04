import { useMemo } from 'react';

// third-party
import { useQuery } from '@tanstack/react-query';

// project-imports
import { queryClient } from 'api/client';

// types
import { SnackbarProps } from 'types/snackbar';

// ==============================|| API - SNACKBAR ||============================== //

const endpoints = {
  key: 'snackbar'
};

export const snackbarQueryKey = [endpoints.key];

const initialState: SnackbarProps = {
  action: false,
  open: false,
  message: 'Note archived',
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'right'
  },
  severity: 'success',
  variant: 'default',
  alert: {
    variant: 'filled'
  },
  transition: 'Fade',
  close: false,
  actionButton: false,
  maxStack: 3,
  dense: false,
  iconVariant: 'usedefault',
  autoHideDuration: 4000
};

export function useGetSnackbar() {
  const { data } = useQuery({
    queryKey: snackbarQueryKey,
    queryFn: () => initialState,
    initialData: initialState,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false
  });

  const memoizedValue = useMemo(() => ({ snackbar: (data || initialState) as SnackbarProps }), [data]);

  return memoizedValue;
}

export function openSnackbar(snackbar: SnackbarProps) {
  // to update local state based on key

  const { action, open, message, anchorOrigin, variant, alert, transition, close, actionButton, severity, autoHideDuration } = snackbar;

  queryClient.setQueryData<SnackbarProps>(snackbarQueryKey, (currentSnackbar) => {
    const prev = currentSnackbar || initialState;
    return {
      ...prev,
      action: action !== undefined ? action : initialState.action,
      open: open !== undefined ? open : initialState.open,
      message: message || initialState.message,
      anchorOrigin: anchorOrigin || initialState.anchorOrigin,
      variant: variant || initialState.variant,
      severity: severity || initialState.severity,
      alert: { variant: alert?.variant || initialState.alert?.variant || 'filled' },
      transition: transition || initialState.transition,
      close: close !== undefined ? close : initialState.close,
      actionButton: actionButton !== undefined ? actionButton : initialState.actionButton,
      autoHideDuration: autoHideDuration !== undefined ? autoHideDuration : initialState.autoHideDuration
    };
  });
}

export function closeSnackbar() {
  // to update local state based on key
  queryClient.setQueryData<SnackbarProps>(snackbarQueryKey, (currentSnackbar) => {
    const prev = currentSnackbar || initialState;
    return { ...prev, open: false };
  });
}

export function handlerIncrease(maxStack: number) {
  // to update local state based on key
  queryClient.setQueryData<SnackbarProps>(snackbarQueryKey, (currentSnackbar) => {
    const prev = currentSnackbar || initialState;
    return { ...prev, maxStack };
  });
}

export function handlerDense(dense: boolean) {
  // to update local state based on key
  queryClient.setQueryData<SnackbarProps>(snackbarQueryKey, (currentSnackbar) => {
    const prev = currentSnackbar || initialState;
    return { ...prev, dense };
  });
}

export function handlerIconVariants(iconVariant: string) {
  // to update local state based on key
  queryClient.setQueryData<SnackbarProps>(snackbarQueryKey, (currentSnackbar) => {
    const prev = currentSnackbar || initialState;
    return { ...prev, iconVariant, hideIconVariant: iconVariant === 'hide' };
  });
}
