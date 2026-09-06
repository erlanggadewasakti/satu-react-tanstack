import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
  Typography
} from '@mui/material';
import { Trash } from 'iconsax-reactjs';
import { FormattedMessage } from 'react-intl';

// project-imports
import AnimateButton from 'components/@extended/AnimateButton';
import { MockItem } from 'types/api/mock';

// ==============================|| EXAMPLE - MOCK DATA DELETE CONFIRMATION MODAL ||============================== //

export interface MockDeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  item?: MockItem | null;
  isLoading?: boolean;
}

export default function MockDeleteModal({ open, onClose, onConfirm, item, isLoading = false }: MockDeleteModalProps) {
  const handleConfirm = async () => {
    await onConfirm();
    onClose();
  };

  return (
    <Dialog open={open} onClose={isLoading ? undefined : onClose} maxWidth="xs" fullWidth aria-labelledby="mock-delete-dialog-title">
      <DialogContent sx={{ pt: 3.5, pb: 2, px: 3, textAlign: 'center' }}>
        <Stack spacing={2} sx={{ alignItems: 'center' }}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'error.lighter',
              color: 'error.main'
            }}
          >
            <Trash size={28} />
          </Box>

          <Typography variant="h4" id="mock-delete-dialog-title" sx={{ fontWeight: 700 }}>
            <FormattedMessage id="example.modal.delete-title" />
          </Typography>

          <Typography variant="body1" color="text.secondary">
            <FormattedMessage
              id="example.modal.delete-desc"
              values={{
                name: (
                  <Typography component="span" variant="subtitle1" sx={{ color: 'text.primary', fontWeight: 600 }}>
                    {item?.name || ''}
                  </Typography>
                )
              }}
            />
          </Typography>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, justifyContent: 'center', gap: 1.5 }}>
        <Button color="secondary" variant="outlined" onClick={onClose} disabled={isLoading} sx={{ minWidth: 100 }}>
          <FormattedMessage id="example.modal.btn-cancel" />
        </Button>
        <AnimateButton>
          <Button
            color="error"
            variant="contained"
            onClick={handleConfirm}
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={16} color="inherit" /> : null}
            sx={{ minWidth: 100 }}
          >
            {isLoading ? <FormattedMessage id="example.modal.btn-deleting" /> : <FormattedMessage id="example.modal.btn-delete" />}
          </Button>
        </AnimateButton>
      </DialogActions>
    </Dialog>
  );
}
