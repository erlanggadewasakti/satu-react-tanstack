import { useSearch } from '@tanstack/react-router';
import { useMemo } from 'react';

export function useSearchParams() {
  const rawSearch = useSearch({ strict: false });

  const params = useMemo(() => {
    const urlParams = new URLSearchParams();
    const searchObj = (rawSearch || {}) as Record<string, unknown>;
    Object.entries(searchObj).forEach(([key, val]) => {
      if (val !== undefined && val !== null) {
        urlParams.set(key, String(val));
      }
    });
    return urlParams;
  }, [rawSearch]);

  return [params] as const;
}

export default useSearchParams;
