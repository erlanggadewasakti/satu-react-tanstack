import { createContext } from 'react';
import { JWTContextType } from 'types/auth';

// ==============================|| JWT CONTEXT ||============================== //

export const JWTContext = createContext<JWTContextType | null>(null);
export default JWTContext;
