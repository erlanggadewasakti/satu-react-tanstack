// material-ui
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';

// assets
import { SearchNormal1 } from 'iconsax-reactjs';

// project-imports
import useMenuSearch from 'hooks/useMenuSearch';

// ==============================|| HEADER CONTENT - SEARCH ||============================== //

export default function Search() {
  const { openSearch } = useMenuSearch();

  const isMac = typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.userAgent);
  const shortcutText = isMac ? '⌘ + K' : 'Ctrl + K';

  return (
    <Box sx={{ width: '100%', ml: { xs: 0, md: 2 } }}>
      <FormControl sx={{ width: { xs: '100%', md: 224 } }}>
        <OutlinedInput
          id="header-search"
          readOnly
          onClick={openSearch}
          onFocus={openSearch}
          startAdornment={
            <InputAdornment position="start" sx={{ mr: -0.5 }}>
              <SearchNormal1 size={16} />
            </InputAdornment>
          }
          aria-describedby="header-search-text"
          slotProps={{
            input: {
              sx: { p: 1.5, cursor: 'pointer' },
              'aria-label': 'search'
            }
          }}
          placeholder={shortcutText}
          sx={{
            cursor: 'pointer',
            '& .MuiOutlinedInput-input': { cursor: 'pointer' }
          }}
        />
      </FormControl>
    </Box>
  );
}
