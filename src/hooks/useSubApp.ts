import { useContext } from 'react';

// project-imports
import { SubAppContext } from 'contexts/SubAppContext';

// ==============================|| HOOKS - SUB-APP ||============================== //

export default function useSubApp() {
  const context = useContext(SubAppContext);

  if (!context) {
    throw new Error('useSubApp must be used inside SubAppProvider');
  }

  return context;
}

