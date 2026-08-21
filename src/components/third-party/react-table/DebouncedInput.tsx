import { useEffect, useState, ChangeEvent } from 'react';

// material-ui
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput, { OutlinedInputProps } from '@mui/material/OutlinedInput';

// assets
import { CloseCircle, SearchNormal1 } from 'iconsax-reactjs';

// types
interface Props extends Omit<OutlinedInputProps, 'onChange'> {
  value: string | number;
  onFilterChange: (value: string | number) => void;
  debounce?: number;
}

// ==============================|| FILTER - DEBOUNCED INPUT ||============================== //

export default function DebouncedInput({
  value: initialValue,
  onFilterChange,
  debounce = 500,
  size = 'small',
  startAdornment = (
    <InputAdornment position="start">
      <SearchNormal1 size={18} />
    </InputAdornment>
  ),
  ...props
}: Props) {
  const [value, setValue] = useState<number | string>(initialValue);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value);

  const handleClear = () => {
    setValue('');
    onFilterChange('');
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onFilterChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <OutlinedInput
      value={value}
      onChange={handleInputChange}
      size={size}
      startAdornment={startAdornment}
      endAdornment={
        value ? (
          <InputAdornment position="end">
            <IconButton size="small" onClick={handleClear} edge="end" aria-label="clear filter">
              <CloseCircle size={16} />
            </IconButton>
          </InputAdornment>
        ) : null
      }
      {...props}
    />
  );
}
