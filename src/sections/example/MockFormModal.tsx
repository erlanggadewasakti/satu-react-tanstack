import { ReactNode, useMemo } from 'react';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';
import { Add, CloseCircle, Edit } from 'iconsax-reactjs';
import { FormattedMessage, useIntl } from 'react-intl';
import { FormikProps, useFormik } from 'formik';
import * as Yup from 'yup';

// project-imports
import AnimateButton from 'components/@extended/AnimateButton';
import { CreateMockItemPayload, MockItem } from 'types/api/mock';

// ==============================|| FORM FIELD SUB-COMPONENT ||============================== //

interface FormFieldProps {
  id: string;
  name: keyof CreateMockItemPayload;
  label: ReactNode;
  placeholder?: string;
  type?: string;
  multiline?: boolean;
  rows?: number;
  formik: FormikProps<CreateMockItemPayload>;
  required?: boolean;
}

function FormField({ id, name, label, placeholder, type = 'text', multiline, rows, formik, required }: FormFieldProps) {
  const isError = Boolean(formik.touched[name] && formik.errors[name]);
  const errorText = isError ? formik.errors[name] : null;

  return (
    <Stack spacing={0.75}>
      <InputLabel htmlFor={id}>
        <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
          {label} {required ? '*' : ''}
        </Typography>
      </InputLabel>
      <OutlinedInput
        id={id}
        name={name}
        type={type}
        multiline={multiline}
        rows={rows}
        placeholder={placeholder}
        value={formik.values[name] ?? ''}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={isError}
        fullWidth
      />
      {errorText && (
        <FormHelperText error id={`${id}-error`}>
          {errorText}
        </FormHelperText>
      )}
    </Stack>
  );
}

// Helper to normalize birth date
function normalizeBirthDate(dateStr?: string | null): string {
  if (!dateStr) return '';
  return dateStr.split('T')[0].split(' ')[0];
}

// ==============================|| EXAMPLE - MOCK DATA FORM MODAL (CREATE / EDIT) ||============================== //

export interface MockFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: CreateMockItemPayload) => Promise<void>;
  initialData?: MockItem | null;
  isLoading?: boolean;
}

export default function MockFormModal({ open, onClose, onSubmit, initialData, isLoading = false }: MockFormModalProps) {
  const intl = useIntl();
  const isEditMode = Boolean(initialData);

  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        name: Yup.string()
          .trim()
          .max(255)
          .required(intl.formatMessage({ id: 'example.validation.name-required' })),
        job: Yup.string()
          .trim()
          .max(100)
          .required(intl.formatMessage({ id: 'example.validation.job-required' })),
        address: Yup.string()
          .trim()
          .max(255)
          .required(intl.formatMessage({ id: 'example.validation.address-required' })),
        birth_date: Yup.string().nullable(),
        phone_number: Yup.string().max(20).nullable()
      }),
    [intl]
  );

  const formik = useFormik<CreateMockItemPayload>({
    enableReinitialize: true,
    initialValues: {
      name: initialData?.name || '',
      job: initialData?.job || '',
      address: initialData?.address || '',
      birth_date: normalizeBirthDate(initialData?.birth_date),
      phone_number: initialData?.phone_number || ''
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await onSubmit({
          name: values.name.trim(),
          job: values.job.trim(),
          address: values.address.trim(),
          birth_date: values.birth_date ? values.birth_date : null,
          phone_number: values.phone_number ? values.phone_number.trim() : null
        });
        onClose();
      } finally {
        setSubmitting(false);
      }
    }
  });

  const isBusy = isLoading || formik.isSubmitting;

  const handleClose = () => {
    if (!isBusy) {
      formik.resetForm();
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" aria-labelledby="mock-form-dialog-title">
      <DialogTitle id="mock-form-dialog-title" sx={{ p: 2.5 }}>
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Stack direction="row" spacing={1.25} sx={{ alignItems: 'center' }}>
            {isEditMode ? <Edit size={22} /> : <Add size={22} />}
            <Typography variant="h5">
              {isEditMode ? (
                <FormattedMessage id="example.modal.edit-title" />
              ) : (
                <FormattedMessage id="example.modal.create-title" />
              )}
            </Typography>
          </Stack>
          <IconButton size="small" color="secondary" onClick={handleClose} disabled={isBusy} aria-label="close">
            <CloseCircle size={20} />
          </IconButton>
        </Stack>
      </DialogTitle>

      <form noValidate onSubmit={formik.handleSubmit}>
        <DialogContent dividers sx={{ p: 2.5 }}>
          <Grid container spacing={2.5}>
            {/* FULL NAME */}
            <Grid size={{ xs: 12 }}>
              <FormField
                id="mock-field-name"
                name="name"
                label={<FormattedMessage id="example.modal.field-name" />}
                placeholder={intl.formatMessage({ id: 'example.modal.field-name-placeholder' })}
                formik={formik}
                required
              />
            </Grid>

            {/* JOB */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormField
                id="mock-field-job"
                name="job"
                label={<FormattedMessage id="example.modal.field-job" />}
                placeholder={intl.formatMessage({ id: 'example.modal.field-job-placeholder' })}
                formik={formik}
                required
              />
            </Grid>

            {/* PHONE NUMBER */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormField
                id="mock-field-phone"
                name="phone_number"
                label={<FormattedMessage id="example.modal.field-phone" />}
                placeholder={intl.formatMessage({ id: 'example.modal.field-phone-placeholder' })}
                formik={formik}
              />
            </Grid>

            {/* BIRTH DATE */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormField
                id="mock-field-birth-date"
                name="birth_date"
                type="date"
                label={<FormattedMessage id="example.modal.field-birth-date" />}
                formik={formik}
              />
            </Grid>

            {/* ADDRESS */}
            <Grid size={{ xs: 12 }}>
              <FormField
                id="mock-field-address"
                name="address"
                multiline
                rows={3}
                label={<FormattedMessage id="example.modal.field-address" />}
                placeholder={intl.formatMessage({ id: 'example.modal.field-address-placeholder' })}
                formik={formik}
                required
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 2.5 }}>
          <Button color="secondary" onClick={handleClose} disabled={isBusy}>
            <FormattedMessage id="example.modal.btn-cancel" />
          </Button>
          <AnimateButton>
            <Button
              type="submit"
              variant="contained"
              disabled={isBusy}
              startIcon={isBusy ? <CircularProgress size={16} color="inherit" /> : null}
            >
              {isBusy ? <FormattedMessage id="example.modal.btn-saving" /> : <FormattedMessage id="example.modal.btn-save" />}
            </Button>
          </AnimateButton>
        </DialogActions>
      </form>
    </Dialog>
  );
}
