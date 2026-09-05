import { createContext } from 'react';
import { ConfigContextValue } from 'types/config';

export const ConfigContext = createContext<ConfigContextValue | undefined>(undefined);
export default ConfigContext;
