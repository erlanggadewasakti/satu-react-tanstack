import { createContext } from 'react';
import { SubAppContextValue } from 'types/subApp';

export const SubAppContext = createContext<SubAppContextValue | undefined>(undefined);
export default SubAppContext;
